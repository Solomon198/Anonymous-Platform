import { Request, Response } from "express";
import { User } from "../../models/user";
import { SendVerification } from "../../services/sendVerification";
import _ from "lodash";
import { UserUpdatedPublisher } from "../../events/publishers";
import { natsWrappper } from "../../nats-wrapper";
import mongoose from "mongoose";
import { RequestProcessingError } from "@crazy-devz/common";
import { IErrorCode } from "@crazy-devz/logger";

export const HandleUpdateUser = async (req: Request, res: Response) => {
  const userUpdate = req.body;
  const authFields = _.pick(userUpdate, ["email", "password"]);
  const otherFields = _.pick(userUpdate, ["firstName", "lastName", "email"]);
  const user = await User.findOne({ _id: req.currentUser!.id });
  const session = await mongoose.startSession();

  // should not be able to use email already in use by someone
  if (authFields.email) {
    const emailExist = await User.findOne({ email: authFields.email });
    if (emailExist) {
      throw new RequestProcessingError(IErrorCode.emailAlreadyExist);
    }
  }
  try {
    await session.startTransaction();
    const updateToApply = {
      ...(authFields.password ? { password: authFields.password } : {}),
      ...(authFields.email
        ? { email: authFields.email, emailVerified: false }
        : {}),
    };
    user?.set(updateToApply);
    await user?.save();

    if (Object.keys(otherFields).length > 0) {
      await new UserUpdatedPublisher(natsWrappper.client).publish({
        ...otherFields,
        ...(otherFields.email ? { emailVerified: false } : {}),
        userId: user!.id,
        version: user?.version!,
      });
    }
    await session.commitTransaction();
    await session.endSession();
    try {
      if (authFields.email) {
        await SendVerification({ email: authFields.email, userId: user?.id });
      }
    } catch (e: any) {
      req.log.error({
        code: IErrorCode.UnableToSendEmailOTP,
        customMessage: `Could not send email OTP with the data ${req.body} and error ${e.stack}`,
      });
    }
    res.status(200).send({});
  } catch (e: any) {
    await session.abortTransaction();
    await session.endSession();
    req.log.error({
      code: IErrorCode.CouldNotUpdateUser,
      customMessage: `Could update user with the data ${req.body} and error ${e.stack}`,
    });
    throw new RequestProcessingError(IErrorCode.UnableToUpdateAccount);
  }
};

import { Request, Response } from "express";
import { User } from "../../models/user";
import { BadRequestError, RequestProcessingError } from "@crazy-devz/common";
import { IErrorCode } from "@crazy-devz/logger";
import mongoose from "mongoose";
import { UserCreatedPublisher } from "../../events/publishers";
import { natsWrappper } from "../../nats-wrapper";
import { UserSignupPayload, UserVerificationStatus } from "../../utils/types";
import { SendVerification } from "../../services/sendVerification";
import { addSecondsToDate } from "../../utils/helpers";

const HandleSignUp = async (req: Request, res: Response) => {
  const { phoneNumber, password, gender, firstName, lastName, acceptedTerms } =
    req.body as UserSignupPayload;

  const existinguser = await User.findOne({ phoneNumber });

  if (existinguser) {
    const userStatus = existinguser.userIsVerified();
    if (userStatus === UserVerificationStatus.UserVerified) {
      throw new BadRequestError(IErrorCode.accountAlreadyExist);
    } else if (userStatus === UserVerificationStatus.UserAwaitingVerification) {
      throw new BadRequestError(IErrorCode.UserAwaitingVerification);
    }
  }

  if (!acceptedTerms) {
    throw new BadRequestError(IErrorCode.TermsNotAccepted);
  }

  const ttl = addSecondsToDate(process.env.VERIFICATION_WAITIME as any);

  const user = User.build({
    phoneNumber,
    password,
    status: {
      ttl: ttl.toISOString(),
      isVerified: false,
    },
  });

  const session = await mongoose.startSession();

  try {
    await session.startTransaction();
    await user.save();
    await new UserCreatedPublisher(natsWrappper.client).publish({
      userId: user.id,
      phoneNumber: user.phoneNumber,
      gender,
      firstName,
      lastName,
      accountVerified: false,
    });

    await session.commitTransaction();
    await session.endSession();

    try {
      // SEND SMS VERIFICATION
      await SendVerification({ phoneNumber, userId: user.id });
    } catch (e: any) {
      req.log.info({
        code: IErrorCode.CouldNotSendVerificationSMS,
        customMessage: `Could not send verification SMS with the data ${req.body} and error ${e.stack}`,
      });
    }
    res.status(201).send(user);
  } catch (e: any) {
    await session.abortTransaction();
    await session.endSession();
    req.log.error({
      code: IErrorCode.UnableToCreateAccount,
      customMessage: `Could not create Account with the data ${req.body} and error ${e.stack}`,
    });
    throw new RequestProcessingError(IErrorCode.UnableToCreateAccount);
  }
};

export default HandleSignUp;

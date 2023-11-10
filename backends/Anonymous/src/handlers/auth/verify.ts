import { Request, Response } from "express";
import { User } from "../../models/user";
import { SendVerification } from "../../services/sendVerification";
import { RequestProcessingError } from "@crazy-devz/common";
import { IErrorCode } from "@crazy-devz/logger";
import { Verification } from "../../models/verification";
import mongoose from "mongoose";
import { getJWT } from "../../utils/helpers";
import { MAXIMUM_RETRY_TIMES } from "../../const";
import { UserVerifiedPublisher } from "../../events/publishers";
import { natsWrappper } from "../../nats-wrapper";

export const HandleVerifySMS = async (req: Request, res: Response) => {
  const { phoneNumber } = req.body;
  const user = await User.findOne({ phoneNumber });
  if (user?.status.isVerified) {
    throw new RequestProcessingError(IErrorCode.phoneNumberAlreadyVerified);
  }
  await SendVerification({ phoneNumber, userId: user!.id });
  res.status(200).send({});
};

export const HandleVerifyEmail = async (req: Request, res: Response) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (user?.emailVerified) {
    throw new RequestProcessingError(IErrorCode.emailAlreadyVerified);
  }
  await SendVerification({ email, userId: user!.id });
  res.status(200).send({});
};

export const HandleVerifyCode = async (req: Request, res: Response) => {
  const { email, phoneNumber, otp } = req.body;
  const verification = await Verification.findOne({
    $or: [{ email: email || "" }, { phoneNumber: phoneNumber || "" }],
  });

  if (verification?.retryTimes! === MAXIMUM_RETRY_TIMES) {
    throw new RequestProcessingError(IErrorCode.ExceededOTPTRetries);
  }

  if (verification?.verificationCode !== otp) {
    await verification?.updateOne({ $inc: { retryTimes: 1 } });
    throw new RequestProcessingError(IErrorCode.IncorrectOTPCode);
  }

  const session = await mongoose.startSession();
  try {
    await session.startTransaction();
    const user = await User.findOne({
      $or: [{ email: email || "" }, { phoneNumber: phoneNumber || "" }],
    });
    user?.set({
      ...(email ? { emailVerified: true } : {}),
      ...(phoneNumber ? { status: { isVerified: true } } : {}),
    });
    verification?.set({ ttl: new Date().toISOString() });
    await user?.save();
    await verification?.save();
    if (phoneNumber) {
      req.session = {
        jwt: getJWT({ phoneNumber, userId: user?.id }),
      };
    }
    await new UserVerifiedPublisher(natsWrappper.client).publish({
      ...(email ? { emailVerified: true } : {}),
      ...(phoneNumber ? { accountVerified: true } : {}),
      userId: user!.id,
      version: user?.version!,
    });

    await session.commitTransaction();
    await session.endSession();

    res.status(200).send({});
  } catch (e: any) {
    await session.abortTransaction();
    await session.endSession();
    req.log.error({
      code: IErrorCode.CouldNotSendVerificationSMS,
      customMessage: `Could not send verification SMS with the data ${req.body} and error ${e.stack}`,
    });
  }
};

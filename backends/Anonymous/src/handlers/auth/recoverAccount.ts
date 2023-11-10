import { Request, Response } from "express";
import {
  addSecondsToDate,
  generateVerificationCode,
  getJWT,
} from "../../utils/helpers";
import mongoose from "mongoose";
import {
  SendVerificationEmailPublisher,
  UserUpdatedPublisher,
} from "../../events/publishers";
import { natsWrappper } from "../../nats-wrapper";
import { BadRequestError, RequestProcessingError } from "@crazy-devz/common";
import { IErrorCode } from "@crazy-devz/logger";
import { EMAIL_TEMPLATES } from "@crazy-devz/utils";
import { UserSignupPayload } from "../../utils/types";
import { User } from "../../models/user";
import { MAXIMUM_RETRY_TIMES } from "../../const";
import { AccountRecovery } from "../../models/accountRecovery";

export const HandleUpdateAccount = async (req: Request, res: Response) => {
  const { password, phoneNumber } = req.body;
  const { email } = req.currentUser as any as UserSignupPayload;
  const user = await User.findOne({ email });
  user?.set({ password, phoneNumber, status: { isVerified: false } });
  const session = await mongoose.startSession();
  try {
    await session.startTransaction();
    await user?.save();
    await new UserUpdatedPublisher(natsWrappper.client).publish({
      version: user?.version!,
      phoneNumber,
      userId: user?.id,
      phoneNumberVerified: false,
    });
    await session.commitTransaction();
    await session.endSession();

    res.status(200).send({});
  } catch (e: any) {
    await session.abortTransaction();
    await session.endSession();
    req.log.error({
      code: IErrorCode.CouldNotSendAccountRecoveryOTP,
      customMessage: `Could account update recovery credentials ${req.body} and error ${e.stack}`,
    });
    throw new RequestProcessingError(
      IErrorCode.CouldNotUpdateRecoveryCredentials
    );
  }
};

export const HandleSendRecoverAccountCode = async (
  req: Request,
  res: Response
) => {
  const { email } = req.body;
  const session = await mongoose.startSession();
  try {
    await session.startTransaction();
    const code = generateVerificationCode();
    const recoverAccount = AccountRecovery.build({
      email,
      verificationCode: code,
      ttl: addSecondsToDate(
        process.env.OTP_WAITIME! as any as number
      ).toISOString(),
    });
    await new SendVerificationEmailPublisher(natsWrappper.client).publish({
      email,
      verificationCode: code,
      templateId: EMAIL_TEMPLATES.RECOVER_ACCOUNT,
    });
    await session.commitTransaction();
    await session.endSession();
    await recoverAccount.save();
    res.status(200).send({});
  } catch (e: any) {
    await session.abortTransaction();
    await session.endSession();
    req.log.error({
      code: IErrorCode.CouldNotSendAccountRecoveryOTP,
      customMessage: `Could account recovery  OTP ${req.body} and error ${e.stack}`,
    });
    throw new RequestProcessingError(IErrorCode.CouldNotSendAccountRecoveryOTP);
  }
};

export const HandleVerifyVerifyAccountOTP = async (
  req: Request,
  res: Response
) => {
  const { email, otp } = req.body;
  const verification = await AccountRecovery.findOne({ email });
  if (verification?.retryTimes === MAXIMUM_RETRY_TIMES) {
    throw new RequestProcessingError(IErrorCode.ExceededOTPTRetries);
  }
  if (verification?.verificationCode !== otp) {
    await verification?.updateOne({ $inc: { retryTimes: 1 } });
    throw new BadRequestError(IErrorCode.InvalidOTPCredentials);
  }
  req.session = {
    jwt: getJWT({
      phoneNumber: "",
      email,
      expire: process.env.PASSWORD_RESSET_WAITIME! as any as number,
    }),
  };
  res.status(200).send({});
};

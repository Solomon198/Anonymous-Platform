import { Request, Response } from "express";
import { RessetPassword } from "../../models/ressetPassword";
import {
  addSecondsToDate,
  generateVerificationCode,
  getJWT,
} from "../../utils/helpers";
import mongoose from "mongoose";
import {
  SendVerificationSMSPublisher,
  UserUpdatedPublisher,
} from "../../events/publishers";
import { natsWrappper } from "../../nats-wrapper";
import { BadRequestError, RequestProcessingError } from "@crazy-devz/common";
import { IErrorCode } from "@crazy-devz/logger";
import { UserSignupPayload } from "../../utils/types";
import { User } from "../../models/user";
import { MAXIMUM_RETRY_TIMES } from "../../const";
import { EMAIL_TEMPLATES } from "@crazy-devz/utils";

export const HandleUpdatePassword = async (req: Request, res: Response) => {
  const { password } = req.body;
  const { phoneNumber } = req.currentUser as any as UserSignupPayload;
  const user = await User.findOne({ phoneNumber });
  try {
    // avoid calling user.save() so the version won't be incremented
    // since no event will be published increasing version will break concurrency control
    const hashedPassword = await user?.hashPassword(password);
    await user?.updateOne({ password: hashedPassword });
    const $user = await User.findOne({ phoneNumber });
  } catch (e: any) {
    req.log.error({
      code: IErrorCode.CouldNotUpdateUserPassword,
      customMessage: `Could resset user password with ${req.body} and error ${e.stack}`,
    });
    throw new RequestProcessingError(IErrorCode.CouldNotUpdateUserPassword);
  }
  res.status(200).send({});
};

const HandleSendResetPasswordVerificationCode = async (
  req: Request,
  res: Response
) => {
  const { phoneNumber } = req.body;
  const session = await mongoose.startSession();
  try {
    await session.startTransaction();
    const code = generateVerificationCode();
    const passwordResset = RessetPassword.build({
      phoneNumber,
      verificationCode: code,
      ttl: addSecondsToDate(
        process.env.OTP_WAITIME! as any as number
      ).toISOString(),
    });
    await new SendVerificationSMSPublisher(natsWrappper.client).publish({
      phoneNumber,
      verificationCode: code,
      templateId: EMAIL_TEMPLATES.RESSET_PASSWORD,
    });
    await session.commitTransaction();
    await session.endSession();
    await passwordResset.save();
    res.status(200).send({});
  } catch (e: any) {
    await session.abortTransaction();
    await session.endSession();
    req.log.error({
      code: IErrorCode.CouldNotSendResetpasswordOTP,
      customMessage: `Could not send password reset OTP ${req.body} and error ${e.stack}`,
    });
    throw new RequestProcessingError(IErrorCode.CouldNotSendResetpasswordOTP);
  }
};

const HandleVerifyResetPasswordOTP = async (req: Request, res: Response) => {
  const { phoneNumber, otp } = req.body;
  const verification = await RessetPassword.findOne({ phoneNumber });
  if (verification?.retryTimes === MAXIMUM_RETRY_TIMES) {
    throw new RequestProcessingError(IErrorCode.ExceededOTPTRetries);
  }
  if (verification?.verificationCode !== otp) {
    await verification?.updateOne({ $inc: { retryTimes: 1 } });
    throw new BadRequestError(IErrorCode.RessetPasswordInvalidOTP);
  }
  req.session = {
    jwt: getJWT({
      phoneNumber,
      expire: process.env.PASSWORD_RESSET_WAITIME! as any as number,
    }),
  };
  res.status(200).send({});
};

export {
  HandleSendResetPasswordVerificationCode,
  HandleVerifyResetPasswordOTP,
};

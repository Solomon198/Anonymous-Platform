import { EMAIL_TEMPLATES } from "@crazy-devz/utils";
import {
  SendVerificationEmailPublisher,
  SendVerificationSMSPublisher,
} from "../events/publishers";
import { Verification } from "../models/verification";
import { natsWrappper } from "../nats-wrapper";
import env from "../utils/env/env";
import { addSecondsToDate, generateVerificationCode } from "../utils/helpers";

interface SmsPayload {
  email?: string;
  phoneNumber?: string;
  userId: string;
}

const getVerificationDoc = ({ userId, email, phoneNumber }: SmsPayload) => {
  const code = generateVerificationCode();
  const ttl = addSecondsToDate(env.OTP_WAITIME);
  return Verification.build({
    ...(phoneNumber ? { phoneNumber } : { email }),
    ttl: ttl.toISOString(),
    userId,
    verificationCode: code,
  });
};

const sendSMSVerification = async (phoneNumber: string, userId: string) => {
  const verification = getVerificationDoc({
    userId,
    phoneNumber,
  });
  await verification.save();
  await new SendVerificationSMSPublisher(natsWrappper.client).publish({
    phoneNumber,
    verificationCode: verification.verificationCode,
    templateId: EMAIL_TEMPLATES.VERIFY_PHONE_NUMBER,
  });
};

const sendEmailVerification = async (email: string, userId: string) => {
  const verification = getVerificationDoc({ email, userId });
  await verification.save();
  await new SendVerificationEmailPublisher(natsWrappper.client).publish({
    email,
    verificationCode: verification.verificationCode,
    templateId: EMAIL_TEMPLATES.VERIFY_EMAIL,
  });
};

export const SendVerification = async ({
  phoneNumber,
  userId,
  email,
}: SmsPayload) => {
  if (phoneNumber) {
    await sendSMSVerification(phoneNumber, userId);
  } else if (email) {
    await sendEmailVerification(email, userId);
  }
};

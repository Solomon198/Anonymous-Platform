import { EMAIL_TEMPLATES } from "@crazy-devz/utils";
import {
  SendVerificationEmailPublisher,
  SendVerificationSMSPublisher,
} from "../../events/publishers";
import { Verification } from "../../models/verification";
import { natsWrappper } from "../../nats-wrapper";
import {
  addSecondsToDate,
  generateVerificationCode,
} from "../../utils/helpers";

export const SendVerification = jest
  .fn()
  .mockImplementation(async ({ phoneNumber, userId, email }: any) => {
    const code = generateVerificationCode();
    const ttl = addSecondsToDate(process.env.OTP_WAITIME as any);
    const verification = Verification.build({
      ...(phoneNumber ? { phoneNumber } : { email }),
      ttl: ttl.toISOString(),
      userId,
      verificationCode: code,
    });
    await verification.save();

    if (phoneNumber) {
      await new SendVerificationSMSPublisher(natsWrappper.client).publish({
        phoneNumber,
        verificationCode: "",
        templateId: EMAIL_TEMPLATES.VERIFY_PHONE_NUMBER,
      });
    }
    if (email) {
      await new SendVerificationEmailPublisher(natsWrappper.client).publish({
        email,
        verificationCode: "",
        templateId: EMAIL_TEMPLATES.VERIFY_EMAIL,
      });
    }
  });

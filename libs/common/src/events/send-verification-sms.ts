import { Subjects } from "./types/subjects";
import { EMAIL_TEMPLATES } from "@crazy-devz/utils";

export interface SendVerificationSMS {
  subject: Subjects.SendVerificationSMS;

  data: {
    phoneNumber: string;
    verificationCode: string;
    templateId: EMAIL_TEMPLATES;
  };
}

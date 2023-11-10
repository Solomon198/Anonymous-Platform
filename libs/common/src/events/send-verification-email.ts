import { Subjects } from "./types/subjects";
import { EMAIL_TEMPLATES } from "@crazy-devz/utils";

export interface SendVerificationEmail {
  subject: Subjects.SendVerificationEmail;

  data: {
    email: string;
    verificationCode: string;
    templateId: EMAIL_TEMPLATES;
  };
}

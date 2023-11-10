import { Publisher, SendVerificationSMS, Subjects } from "@crazy-devz/common";

export class SendVerificationSMSPublisher extends Publisher<SendVerificationSMS> {
  subject: Subjects.SendVerificationSMS = Subjects.SendVerificationSMS;
}

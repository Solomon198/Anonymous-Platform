import { Publisher, SendVerificationEmail, Subjects } from "@crazy-devz/common";

export class SendVerificationEmailPublisher extends Publisher<SendVerificationEmail> {
  subject: Subjects.SendVerificationEmail = Subjects.SendVerificationEmail;
}

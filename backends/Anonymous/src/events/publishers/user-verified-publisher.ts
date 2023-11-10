import {
  Publisher,
  VerificationCompleteEvent,
  Subjects,
} from "@crazy-devz/common";

export class UserVerifiedPublisher extends Publisher<VerificationCompleteEvent> {
  subject: Subjects.VerificationComplete = Subjects.VerificationComplete;
}

import { Publisher, UserUpdatedEvent, Subjects } from "@crazy-devz/common";

export class UserUpdatedPublisher extends Publisher<UserUpdatedEvent> {
  subject: Subjects.UserUpdated = Subjects.UserUpdated;
}

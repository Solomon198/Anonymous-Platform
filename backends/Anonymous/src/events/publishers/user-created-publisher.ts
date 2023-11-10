import { Publisher, UserCreatedEvent, Subjects } from "@crazy-devz/common";

export class UserCreatedPublisher extends Publisher<UserCreatedEvent> {
  subject: Subjects.UserCreated = Subjects.UserCreated;
}

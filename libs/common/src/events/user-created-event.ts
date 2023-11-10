import { Subjects } from "./types/subjects";

export interface UserCreatedEvent {
  subject: Subjects.UserCreated;

  data: {
    userId: string;
    phoneNumber: string;
    gender: string;
    lastName: string;
    firstName: string;
    accountVerified: boolean;
  };
}

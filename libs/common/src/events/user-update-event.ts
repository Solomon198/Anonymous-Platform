import { Subjects } from "./types/subjects";

export interface UserUpdatedEvent {
  subject: Subjects.UserUpdated;

  data: {
    userId: string;
    firstName?: string;
    lastName?: string;
    email?: string;
    emailVerified?: boolean;
    version: number;
    phoneNumber?: string;
    phoneNumberVerified?: boolean;
  };
}

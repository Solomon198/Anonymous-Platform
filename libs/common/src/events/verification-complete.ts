import { Subjects } from "./types/subjects";

export interface VerificationCompleteEvent {
  subject: Subjects.VerificationComplete;

  data: {
    userId: string;
    emailVerified?: boolean;
    accountVerified?: boolean;
    version: number;
  };
}

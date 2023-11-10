export enum Gender {
  MALE = "male",
  FEMALE = "female",
}

export interface UserSignupPayload {
  phoneNumber: string;
  gender: string;
  password: string;
  firstName: string;
  lastName: string;

  email?: string;
  acceptedTerms: boolean;
}

export enum UserVerificationStatus {
  UserVerified = "USER-VERIFIED",
  UserAwaitingVerification = "USER-AWAITING-VERIFICATION",
  UserNotVerified = "USER-NOT-VERIFIED",
}

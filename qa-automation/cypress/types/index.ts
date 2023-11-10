export interface IStore {
  loginCredentials: {
    phoneNumber: string;
    password: string;
  };

  cookie: {
    name: string;
    value: string;
    path: string;
    secure: boolean;
    hostOnly: boolean;
    httpOnly: boolean;
    domain: string;
  };

  signupCredentials: {
    firstName: string;
    lastName: string;
    gender: string;
    phoneNumber: string;
    password: string;
    acceptedTerms: boolean;
    email?: string;
  };

  verification: {
    email: string;
    phoneNumber: string;
    ressetPassword: string;
    recoverAccount: string;
  };
}

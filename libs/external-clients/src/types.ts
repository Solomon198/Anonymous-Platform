export type IGenericObject = Record<string, any>;

interface IEmailAddresses {
  name: string;
  address: string;
}
export interface IMail {
  to: IEmailAddresses;
  from: IEmailAddresses;
  subject: string;
  html: string;
}

export interface SMSConfig {
  accountSID: string;
  accountAuthToken: string;
}

export interface SMSPayload {
  from: string;
  to: string;
  body: string;
}

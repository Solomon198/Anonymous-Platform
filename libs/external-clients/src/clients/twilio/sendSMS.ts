import { SMSConfig, SMSPayload } from "../../types";
import twilio from "twilio";

export const twilioClient = ({ accountAuthToken, accountSID }: SMSConfig) => {
  const client = twilio(accountSID, accountAuthToken);
  return {
    sendSMS: (payload: SMSPayload) => {
      return client.messages.create(payload);
    },
  };
};

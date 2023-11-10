import { cleanEnv, str, num, testOnly } from "envalid";

export interface ENV {
  JWT_KEY: string;
  NATS_CLUSTER_ID: string;
  NATS_CLIENT_ID: string;
  NATS_URL: string;
  TWILLIO_AUTH_TOKEN: string;
  TWILLIO_SSID: string;

  MAIL_TRAP_TOKEN: string;

  SENDER_ADDRESS: string;

  TWILLIO_SENDER_PHONENUMBER: string;
}

const getEnv = (): ENV => {
  const env = cleanEnv(process.env, {
    JWT_KEY: str(),
    TWILLIO_AUTH_TOKEN: str(),
    TWILLIO_SSID: str(),
    NATS_CLUSTER_ID: str(),
    NATS_CLIENT_ID: str(),
    NATS_URL: str(),
    MAIL_TRAP_TOKEN: str(),
    SENDER_ADDRESS: str(),
    TWILLIO_SENDER_PHONENUMBER: str(),
  });

  return env as ENV;
};

const env = getEnv();
export default env;

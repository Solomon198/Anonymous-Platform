import { ENVIRONMENTS } from "@crazy-devz/utils";
import { cleanEnv, str, num, testOnly } from "envalid";

export interface ENV {
  JWT_KEY: string;

  MONGO_URI: string;

  NATS_CLUSTER_ID: string;
  NATS_CLIENT_ID: string;
  NATS_URL: string;
  VERIFICATION_WAITIME: number;
  OTP_WAITIME: number;
  PASSWORD_RESSET_WAITIME: number;

  NODE_ENV: ENVIRONMENTS;
}

const getEnv = (): ENV => {
  const env = cleanEnv(process.env, {
    JWT_KEY: str(),
    MONGO_URI: str(),
    NATS_CLUSTER_ID: str(),
    NATS_CLIENT_ID: str(),
    NATS_URL: str(),
    VERIFICATION_WAITIME: num({ devDefault: testOnly(60 * 60 * 24) }),
    OTP_WAITIME: num(),
    PASSWORD_RESSET_WAITIME: num(),
    NODE_ENV: str(),
  });

  return env as ENV;
};

const env = getEnv();
export default env;

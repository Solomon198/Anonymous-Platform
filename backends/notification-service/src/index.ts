import { natsWrappper } from "./nats-wrapper";
import {
  SendVerificationSMSListener,
  SendVerificationEmailListener,
} from "./events/listeners";

const startApplication = async () => {
  try {
    await natsWrappper.connect(
      process.env.NATS_CLUSTER_ID!,
      process.env.NATS_CLIENT_ID!,
      process.env.NATS_URL!
    );

    new SendVerificationEmailListener(natsWrappper.client).listen();
    new SendVerificationSMSListener(natsWrappper.client).listen();

    natsWrappper.client.on("close", () => {
      // TODO LOGGER
      console.log("This NAT listener have shutdown");
      process.exit();
    });

    process.on("SIGINT", () => {
      natsWrappper.client.close();
    });

    process.on("SIGTERM", () => {
      natsWrappper.client.close();
    });
  } catch (e) {
    console.log(e);
  }
};

startApplication();

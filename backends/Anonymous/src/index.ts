import mongoose from "mongoose";
import { app } from "./app";
import env from "./utils/env/env";
import { DatabaseConnectionError } from "@crazy-devz/common";
import { natsWrappper } from "./nats-wrapper";

const connectToNatStreamer = async () => {
  const { NATS_CLIENT_ID, NATS_CLUSTER_ID, NATS_URL } = env;
  await natsWrappper.connect(NATS_CLUSTER_ID, NATS_CLIENT_ID, NATS_URL);
  natsWrappper.client.on("close", () => {
    // log
    console.log("Nats connection shutdown!!!");
    natsWrappper.client.close();
  });
};

const startApplication = async () => {
  try {
    await connectToNatStreamer();
    await mongoose.connect(env.MONGO_URI);
  } catch (e) {
    throw new DatabaseConnectionError();
  }
  app.listen(3000, () => {});
};

// cleanup watchers

process.on("uncaughtException", (error) => {
  console.log("Unable to catch error here");
  console.log(error.message);
});

process.on("SIGINT", () => {
  natsWrappper.client.close();
});

process.on("SIGTERM", () => {
  natsWrappper.client.close();
});

startApplication();

import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";

jest.mock("../nats-wrapper.ts");
jest.mock("../services/sendVerification.ts");

let mongo: MongoMemoryServer;
beforeAll(async () => {
  process.env.JWT_KEY = "YXNkZg==";
  process.env.VERIFICATION_WAITIME = (60 * 60 * 24) as any;
  process.env.OTP_WAITIME = (60 * 5) as any;
  process.env.PASSWORD_RESSET_WAITIME = (60 * 60) as any;

  mongo = await MongoMemoryServer.create();
  const uri = mongo.getUri();
  await mongoose.connect(uri);
});

beforeEach(async () => {
  jest.clearAllMocks();
  const collections = await mongoose.connection.db.collections();
  for (let collection of collections) {
    await collection.deleteMany({});
  }
});

afterAll(async () => {
  await mongo.stop();
  await mongoose.connection.close();
});

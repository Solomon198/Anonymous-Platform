import request from "supertest";
import { app } from "../app";
import { UserSignupPayload } from "../utils/types";
import { Verification } from "../models/verification";

export const signup = async (signupCreds: UserSignupPayload) => {
  await request(app).post("/api/auth/signup").send(signupCreds).expect(201);
  const cookie = await verifyUser({ phoneNumber: signupCreds.phoneNumber });
  return cookie;
};

export const verifyUser = async (payload: {
  email?: string;
  phoneNumber?: string;
}) => {
  const { email, phoneNumber } = payload;
  const code = await Verification.findOne({
    $or: [{ email: email || "" }, { phoneNumber: phoneNumber || "" }],
  });
  const response = await request(app)
    .post("/api/auth/verify/code")
    .send({ ...payload, otp: code?.verificationCode })
    .expect(200);
  const cookie = response.get("Set-Cookie");
  return cookie;
};

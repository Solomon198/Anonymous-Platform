import request from "supertest";
import { app } from "../../app";
import { signUpCreds } from "./test-data";
import { IErrorCode } from "@crazy-devz/logger";
import { ENVIRONMENTS, getErrorResponse } from "@crazy-devz/utils";
import { Verification } from "../../models/verification";

it("should ensure we get auth code sent to number signed up with", async () => {
  await request(app).post("/api/auth/signup").send(signUpCreds).expect(201);
  const response = await request(app).get(
    `/api/auth/test/otps?phoneNumber=${signUpCreds.phoneNumber}`
  );
  const verification = await Verification.findOne({
    phoneNumber: signUpCreds.phoneNumber,
  });
  expect(response.body.phoneNumber).toEqual(verification?.verificationCode);
});

it("should ensure we cannot access test routes on PRODUCTION!", async () => {
  process.env.NODE_ENV = ENVIRONMENTS.PROD;
  await request(app).post("/api/auth/signup").send(signUpCreds).expect(201);
  const response = await request(app)
    .get(`/api/auth/test/otps?phoneNumber=${signUpCreds.phoneNumber}`)
    .send(signUpCreds)
    .expect(400);
  expect(getErrorResponse(response)).toEqual(IErrorCode.CannotAccessRoute);
});

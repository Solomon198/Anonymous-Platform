import request from "supertest";
import { app } from "../../app";
import { signup } from "../../test";
import { signUpCreds } from "./test-data";
import { IErrorCode } from "@crazy-devz/logger";
import { getErrorResponse } from "@crazy-devz/utils";
import { natsWrappper } from "../../nats-wrapper";
import { MAXIMUM_RETRY_TIMES } from "../../const";
import { Verification } from "../../models/verification";
import { AccountRecovery } from "../../models/accountRecovery";
import { User } from "../../models/user";

const email = "dixre@gmail.com";
const intialAccountSetUp = async () => {
  const cookie = await signup(signUpCreds);
  await request(app)
    .put("/api/auth/users/update")
    .set("Cookie", cookie)
    .send({
      email,
    })
    .expect(200);
};

const verifyEmailSetup = async () => {
  const emailCode = await Verification.findOne({ email });
  await request(app)
    .post("/api/auth/verify/code")
    .send({
      email,
      otp: emailCode?.verificationCode,
    })
    .expect(200);
};

const setUpAccountRecoveryIntials = async () => {
  await intialAccountSetUp();
  await verifyEmailSetup();
  await request(app)
    .post("/api/auth/recover-account")
    .send({
      email,
    })
    .expect(200);
};

it("Should throw error 400 when email is not valid", async () => {
  await intialAccountSetUp();
  const response = await request(app)
    .post("/api/auth/recover-account")
    .send({
      email: "dixre.com",
    })
    .expect(400);
  expect(getErrorResponse(response)).toEqual(
    IErrorCode.InvalidAccountRecoverRequestBody
  );
});

it("Should throw error if email is not verified or email doesn't exist", async () => {
  await intialAccountSetUp();
  let response = await request(app)
    .post("/api/auth/recover-account")
    .send({
      email,
    })
    .expect(400);
  expect(getErrorResponse(response)).toEqual(
    IErrorCode.AccountEmailNotVerified
  );

  response = await request(app)
    .post("/api/auth/recover-account")
    .send({
      email: "dixre2@gmail.com", // doesn't exist
    })
    .expect(400);
  expect(getErrorResponse(response)).toEqual(
    IErrorCode.InvalidAccountRecoveryCredential
  );
});

it("should be able to send otp for account recovery to email", async () => {
  await intialAccountSetUp();
  await verifyEmailSetup();
  await request(app)
    .post("/api/auth/recover-account")
    .send({
      email,
    })
    .expect(200);
  expect(natsWrappper.client.publish).toHaveBeenCalledTimes(7);
});

it("Should not be able to request another OTP when the last otp TTL for account recovery have not yet timeout", async () => {
  await intialAccountSetUp();
  await verifyEmailSetup();
  await request(app)
    .post("/api/auth/recover-account")
    .send({
      email,
    })
    .expect(200);
  const response = await request(app)
    .post("/api/auth/recover-account")
    .send({
      email,
    })
    .expect(400);
  expect(getErrorResponse(response)).toEqual(IErrorCode.LastOTPnotExpiredYet);
});

it("Should throw error if email and otp are invalid formats", async () => {
  await intialAccountSetUp();
  await verifyEmailSetup();
  await request(app)
    .post("/api/auth/recover-account")
    .send({
      email,
    })
    .expect(200);

  let response = await request(app)
    .post("/api/auth/recover-account/verify-otp")
    .send({
      email,
      otp: "949",
    })
    .expect(400);
  expect(getErrorResponse(response)).toEqual(
    IErrorCode.InvalidOTPRequestBodyCredentials
  );
  response = await request(app)
    .post("/api/auth/recover-account/verify-otp")
    .send({
      email: "dixre.com", // bad email
      otp: "9499",
    })
    .expect(400);
  expect(getErrorResponse(response)).toEqual(
    IErrorCode.InvalidOTPRequestBodyCredentials
  );
});
it("Should throw error if OTP TTL have elapsed or email is invalid", async () => {
  await setUpAccountRecoveryIntials();
  const recovery = await AccountRecovery.findOne({ email });
  recovery?.set({ ttl: new Date().toISOString() });
  await recovery?.save();
  const response = await request(app)
    .post("/api/auth/recover-account/verify-otp")
    .send({
      email,
      otp: "9494",
    })
    .expect(400);
  expect(getErrorResponse(response)).toEqual(
    IErrorCode.accountRecoveryOtpTimeout
  );
});
it("Should throw error if maximum retires for incorrect otp is exceeded", async () => {
  await setUpAccountRecoveryIntials();
  for (let i = 0; i < MAXIMUM_RETRY_TIMES; i++) {
    await request(app)
      .post("/api/auth/recover-account/verify-otp")
      .send({
        email,
        otp: "9494",
      })
      .expect(400);
  }
  const response = await request(app)
    .post("/api/auth/recover-account/verify-otp")
    .send({
      email,
      otp: "9494",
    })
    .expect(400);
  expect(getErrorResponse(response)).toEqual(IErrorCode.ExceededOTPTRetries);
});
it("should return an auth token in session header when otp is correct ", async () => {
  await setUpAccountRecoveryIntials();
  const recovery = await AccountRecovery.findOne({ email });
  const response = await request(app)
    .post("/api/auth/recover-account/verify-otp")
    .send({
      email,
      otp: recovery?.verificationCode,
    })
    .expect(200);
  expect(response.get("Set-Cookie")).toBeDefined();
});
it("should ensure phoneNumber and password to be updated have valid format", async () => {
  await setUpAccountRecoveryIntials();
  const recovery = await AccountRecovery.findOne({ email });
  const response1 = await request(app)
    .post("/api/auth/recover-account/verify-otp")
    .send({
      email,
      otp: recovery?.verificationCode,
    })
    .expect(200);
  let response = await request(app)
    .put("/api/auth/recover-account")
    .set("Cookie", response1.get("Set-Cookie"))
    .send({
      phoneNumber: "0905070988", //bad phoneNumber
      password: "welcometoDixre",
    })
    .expect(400);
  expect(getErrorResponse(response)).toEqual(
    IErrorCode.InvalidAccountRecoveryRessetBody
  );
  response = await request(app)
    .put("/api/auth/recover-account")
    .set("Cookie", response1.get("Set-Cookie"))
    .send({
      // no phonenumber
      password: "welcometoDixre",
    })
    .expect(400);
  expect(getErrorResponse(response)).toEqual(
    IErrorCode.InvalidAccountRecoveryRessetBody
  );
  response = await request(app)
    .put("/api/auth/recover-account")
    .set("Cookie", response1.get("Set-Cookie"))
    .send({
      phoneNumber: "09050709333",
    })
    .expect(400);
  expect(getErrorResponse(response)).toEqual(
    IErrorCode.InvalidAccountRecoveryRessetBody
  );

  response = await request(app)
    .put("/api/auth/recover-account")
    .set("Cookie", response1.get("Set-Cookie"))
    .send({
      phoneNumber: "09050709333",
      password: "welc",
    })
    .expect(400);
  expect(getErrorResponse(response)).toEqual(
    IErrorCode.InvalidAccountRecoveryRessetBody
  );
});
it("Should not allow user to update phonenumber and password if auth token is not on header or have expired", async () => {
  await setUpAccountRecoveryIntials();
  const recovery = await AccountRecovery.findOne({ email });
  await request(app)
    .post("/api/auth/recover-account/verify-otp")
    .send({
      email,
      otp: recovery?.verificationCode,
    })
    .expect(200);
  const response = await request(app)
    .put("/api/auth/recover-account")
    .send({
      phoneNumber: "09050709888",
      password: "welcometoDixre",
    })
    .expect(401);
  expect(getErrorResponse(response)).toEqual(
    IErrorCode.InvalidRecoverAccountAuthToken
  );
});
it("Should allow user to update phoneNumber and password with valid auth token and credentials", async () => {
  await setUpAccountRecoveryIntials();
  const recovery = await AccountRecovery.findOne({ email });
  const response1 = await request(app)
    .post("/api/auth/recover-account/verify-otp")
    .send({
      email,
      otp: recovery?.verificationCode,
    })
    .expect(200);
  await request(app)
    .put("/api/auth/recover-account")
    .set("Cookie", response1.get("Set-Cookie"))
    .send({
      phoneNumber: "09050709888",
      password: "welcometoDixre",
    })
    .expect(200);
  const user = await User.findOne({ phoneNumber: "09050709888" });
  expect(user).toBeDefined();
  expect(user?.status.isVerified).toEqual(false);
  expect(natsWrappper.client.publish).toHaveBeenCalledTimes(8);
});

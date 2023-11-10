import request from "supertest";
import { app } from "../../app";
import { signup } from "../../test";
import { signUpCreds } from "./test-data";
import { IErrorCode } from "@crazy-devz/logger";
import { RessetPassword } from "../../models/ressetPassword";
import { getErrorResponse } from "@crazy-devz/utils";
import { natsWrappper } from "../../nats-wrapper";
import { MAXIMUM_RETRY_TIMES } from "../../const";

const setUpVerifyPasswordResset = async () => {
  await signup(signUpCreds);

  await request(app)
    .post("/api/auth/password/reset")
    .send({ phoneNumber: signUpCreds.phoneNumber })
    .expect(200);

  const ressetPassword = await RessetPassword.findOne({
    phoneNumber: signUpCreds.phoneNumber,
  });
  return { verificationCode: ressetPassword?.verificationCode };
};

it("should return 400 if phone number is not correct or in a wrong format", async () => {
  const response = await request(app)
    .post("/api/auth/password/reset")
    .send({ phoneNumber: "0905070988" })
    .expect(400);
  expect(getErrorResponse(response)).toEqual(
    IErrorCode.InvalidPasswordRessetBody
  );
});

it("should throw 400 error if last OTP have not passed TTL this exist to handle successive requests", async () => {
  await setUpVerifyPasswordResset();

  const response = await request(app)
    .post("/api/auth/password/reset")
    .send({ phoneNumber: signUpCreds.phoneNumber })
    .expect(400);
  expect(getErrorResponse(response)).toEqual(
    IErrorCode.RessetPasswordLastOTPNotExpired
  );
});

it("should throw error if  phoneNumber does not exist or is not verified", async () => {
  await request(app).post("/api/auth/signup").send(signUpCreds).expect(201);

  let response = await request(app)
    .post("/api/auth/password/reset")
    .send({ phoneNumber: "09050709888" })
    .expect(400);
  expect(getErrorResponse(response)).toEqual(
    IErrorCode.InvalidRessetPasswordCredential
  );

  response = await request(app)
    .post("/api/auth/password/reset")
    .send({ phoneNumber: signUpCreds.phoneNumber })
    .expect(400);

  expect(getErrorResponse(response)).toEqual(
    IErrorCode.RessetPasswordUserNotVerified
  );
});

it("Should throw validation error if  OTP sent or phoneNumber is in an incorrect format", async () => {
  let response = await request(app)
    .post("/api/auth/password/reset/verify-otp")
    .send({ phoneNumber: "0905070988" })
    .expect(400);
  expect(getErrorResponse(response)).toEqual(
    IErrorCode.InvalidPasswordRessetOTPBody
  );

  response = await request(app)
    .post("/api/auth/password/reset/verify-otp")
    .send({ phoneNumber: signUpCreds.phoneNumber, otp: "848" })
    .expect(400);
  expect(getErrorResponse(response)).toEqual(
    IErrorCode.InvalidPasswordRessetOTPBody
  );
});

it("Should throw  error if  phoneNumber have not requested otp before", async () => {
  let response = await request(app)
    .post("/api/auth/password/reset/verify-otp")
    .send({ phoneNumber: "09050709888", otp: "8484" })
    .expect(400);
  expect(getErrorResponse(response)).toEqual(
    IErrorCode.InvalidRessetPasswordCredential
  );
});

it("Should throw error if TTL to verify password has elapsed", async () => {
  await setUpVerifyPasswordResset();

  const passwordResset = await RessetPassword.findOne({
    phoneNumber: signUpCreds.phoneNumber,
  });
  passwordResset?.set({ ttl: new Date().toISOString() });
  await passwordResset?.save();
  console.log(passwordResset);

  let response = await request(app)
    .post("/api/auth/password/reset/verify-otp")
    .send({ phoneNumber: signUpCreds.phoneNumber, otp: "8484" })
    .expect(400);
  expect(getErrorResponse(response)).toEqual(
    IErrorCode.RessetPasswordOTPExpired
  );
});

it("should throw error if OTP code supplied is incorrect", async () => {
  await setUpVerifyPasswordResset();

  let response = await request(app)
    .post("/api/auth/password/reset/verify-otp")
    .send({ phoneNumber: signUpCreds.phoneNumber, otp: "8484" })
    .expect(400);
  expect(getErrorResponse(response)).toEqual(
    IErrorCode.RessetPasswordInvalidOTP
  );
});

it("should ensure a jwt in session is return with a TTL for the jwt on successfully verifying phone number for password resset", async () => {
  const { verificationCode } = await setUpVerifyPasswordResset();
  let response = await request(app)
    .post("/api/auth/password/reset/verify-otp")
    .send({
      phoneNumber: signUpCreds.phoneNumber,
      otp: verificationCode,
    })
    .expect(200);

  expect(response.get("Set-Cookie")).toBeDefined();
});

it("should reset password succesfully", async () => {
  const { verificationCode } = await setUpVerifyPasswordResset();
  await request(app)
    .post("/api/auth/signin")
    .send({
      phoneNumber: signUpCreds.phoneNumber,
      password: signUpCreds.password,
    })
    .expect(200);
  let response = await request(app)
    .post("/api/auth/password/reset/verify-otp")
    .send({
      phoneNumber: signUpCreds.phoneNumber,
      otp: verificationCode,
    })
    .expect(200);

  const cookie = await response.get("Set-Cookie");

  await request(app)
    .put("/api/auth/password/reset")
    .set("Cookie", cookie)
    .send({
      password: "myNewPassword",
    })
    .expect(200);
});
it("Should not be able to resset password once jwt expired", async () => {
  const { verificationCode } = await setUpVerifyPasswordResset();
  process.env.PASSWORD_RESSET_WAITIME = 1 as any;
  let response = await request(app)
    .post("/api/auth/password/reset/verify-otp")
    .send({
      phoneNumber: signUpCreds.phoneNumber,
      otp: verificationCode,
    })
    .expect(200);

  const cookie = await response.get("Set-Cookie");
  response = await request(app)
    .put("/api/auth/password/reset")
    .set("Cookie", cookie)
    .send({
      password: "myNewPassword",
    })
    .expect(401);

  expect(getErrorResponse(response)).toEqual(
    IErrorCode.InvalidResetPasswordToken
  );
});

it("should throw error if password is not formated correctly", async () => {
  return request(app)
    .put("/api/auth/password/reset")
    .send({
      password: "myNew",
    })
    .expect(400);
});

it("should not be able to update password without JWT", async () => {
  const response = await request(app)
    .put("/api/auth/password/reset")
    .send({
      password: "myNewPassword",
    })
    .expect(401);
  expect(getErrorResponse(response)).toEqual(
    IErrorCode.InvalidResetPasswordToken
  );
});

it("Should call publish when reset route is called successfully", async () => {
  await setUpVerifyPasswordResset();
  expect(natsWrappper.client.publish).toHaveBeenCalledTimes(4);
});

it("Should return error when maximum retries have exceeded for OTP code verification", async () => {
  await setUpVerifyPasswordResset();
  // already one request have already been sent for password reset on the function above
  for (let i = 0; i < MAXIMUM_RETRY_TIMES; i++) {
    await request(app)
      .post("/api/auth/password/reset/verify-otp")
      .send({ phoneNumber: signUpCreds.phoneNumber, otp: "8485" })
      .expect(400);
  }
  const response = await request(app)
    .post("/api/auth/password/reset/verify-otp")
    .send({ phoneNumber: signUpCreds.phoneNumber, otp: "8485" })
    .expect(400);
  expect(getErrorResponse(response)).toEqual(IErrorCode.ExceededOTPTRetries);
});

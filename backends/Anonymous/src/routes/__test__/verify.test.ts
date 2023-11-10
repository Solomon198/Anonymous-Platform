import request from "supertest";
import { app } from "../../app";
import { signUpCreds } from "./test-data";
import { Verification } from "../../models/verification";
import { User } from "../../models/user";
import { signup } from "../../test";
import { IErrorCode } from "@crazy-devz/logger";
import { addSecondsToDate } from "../../utils/helpers";
import { getErrorResponse } from "@crazy-devz/utils";
import { MAXIMUM_RETRY_TIMES } from "../../const";

const signupAndUpdateSetup = async () => {
  const cookie = await signup(signUpCreds);
  await request(app)
    .put("/api/auth/users/update")
    .set("Cookie", cookie)
    .send({
      email: "dixre@gmail.com",
    })
    .expect(200);
  return cookie;
};

it("should not send verification SMS if phoneNumber does not exist", async () => {
  const response = await request(app)
    .post("/api/auth/verify/sms")
    .send(signUpCreds)
    .expect(400);
  expect(getErrorResponse(response)).toEqual(
    IErrorCode.InvalidVerifyAccountBody
  );
});

it("should not send verification email if email does not exist", async () => {
  const response = await request(app)
    .post("/api/auth/verify/email")
    .send({ email: "dixre@gmail.com" })
    .expect(400);
  expect(getErrorResponse(response)).toEqual(
    IErrorCode.InvalidVerifyAccountBody
  );
});

it("should not  send verification SMS since an OTP was sent on signup and have not timeout", async () => {
  await request(app).post("/api/auth/signup").send(signUpCreds).expect(201);
  const response = await request(app)
    .post("/api/auth/verify/sms")
    .send(signUpCreds)
    .expect(400);
  expect(getErrorResponse(response)).toEqual(IErrorCode.LastOTPnotExpiredYet);
});

it("should  send verification SMS since  OTP was sent and have timeout", async () => {
  await request(app).post("/api/auth/signup").send(signUpCreds).expect(201);
  const user = await Verification.findOne({
    phoneNumber: signUpCreds.phoneNumber,
  });
  user?.set({ ttl: new Date().toISOString() });
  await user?.save();
  return request(app)
    .post("/api/auth/verify/sms")
    .send(signUpCreds)
    .expect(200);
});

it("should not verify an already verified phoneNumber", async () => {
  await request(app).post("/api/auth/signup").send(signUpCreds).expect(201);
  const user = await User.findOne({ phoneNumber: signUpCreds.phoneNumber });
  user?.set({
    status: {
      isVerified: true,
    },
  });
  const verification = await Verification.findOne({
    phoneNumber: signUpCreds.phoneNumber,
  });
  verification?.set({ ttl: new Date().toISOString() });

  await verification?.save();
  await user?.save();
  const response = await request(app)
    .post("/api/auth/verify/sms")
    .send({ phoneNumber: signUpCreds.phoneNumber })
    .expect(400);

  expect(getErrorResponse(response)).toEqual(
    IErrorCode.phoneNumberAlreadyVerified
  );
});

it("should not verify an already verified email", async () => {
  await signupAndUpdateSetup();
  const user = await User.findOne({ phoneNumber: signUpCreds.phoneNumber });
  user?.set({
    emailVerified: true,
  });
  const verification = await Verification.findOne({
    email: "dixre@gmail.com",
  });
  verification?.set({ ttl: new Date().toISOString() });
  await verification?.save();
  await user?.save();

  const verify = await request(app)
    .post("/api/auth/verify/email")
    .send({ email: "dixre@gmail.com" })
    .expect(400);

  expect(verify.body.errors[0].message).toEqual(
    IErrorCode.emailAlreadyVerified
  );
});

it("should not attempt to update a users email with an already verified email", async () => {
  await signupAndUpdateSetup();
  const user = await User.findOne({ phoneNumber: signUpCreds.phoneNumber });
  user?.set({
    emailVerified: true,
  });
  const verification = await Verification.findOne({
    email: "dixre@gmail.com",
  });
  verification?.set({ ttl: new Date().toISOString() });
  await verification?.save();
  await user?.save();

  const anotherUser = await signup({
    ...signUpCreds,
    phoneNumber: "09050709455",
  });

  const response = await request(app)
    .put("/api/auth/users/update")
    .set("Cookie", anotherUser)
    .send({
      email: "dixre@gmail.com",
    })
    .expect(400);

  expect(getErrorResponse(response)).toEqual(IErrorCode.emailAlreadyExist);
});

it("should return 400 if verification payload does not include one of email or phoneNumber and otp on the payload ", async () => {
  await signupAndUpdateSetup();
  let response = await request(app)
    .post("/api/auth/verify/code")
    .send({
      email: "dixre@gmail.com",
    })
    .expect(400);
  expect(getErrorResponse(response)).toEqual(
    IErrorCode.InvalidOTPRequestBodyCredentials
  );

  response = await request(app)
    .post("/api/auth/verify/code")
    .send({
      email: "dixregmail.com", // bad email address
      otp: "1234",
    })
    .expect(400);
  expect(getErrorResponse(response)).toEqual(
    IErrorCode.InvalidOTPRequestBodyCredentials
  );

  response = await request(app)
    .post("/api/auth/verify/code")
    .send({
      email: "dixre@gmail.com",
      otp: "949", // bad otp should be upto 4
    })
    .expect(400);
  expect(getErrorResponse(response)).toEqual(
    IErrorCode.InvalidOTPRequestBodyCredentials
  );

  response = await request(app)
    .post("/api/auth/verify/code")
    .send({
      phoneNumber: "0905070944", //invalid phone
      otp: "8484",
    })
    .expect(400);
  expect(getErrorResponse(response)).toEqual(
    IErrorCode.InvalidOTPRequestBodyCredentials
  );
});

it("should return 400 since email that requested otp is different from the email verifying the code which doesn't exist ", async () => {
  await signupAndUpdateSetup();
  let response = await request(app)
    .post("/api/auth/verify/code")
    .send({
      email: "dixre2@gmail.com",
      otp: "4455",
    })
    .expect(400);
  expect(getErrorResponse(response)).toEqual(IErrorCode.InvalidOTPCredentials);
});

it("should check for timout expired for verification", async () => {
  await signupAndUpdateSetup();
  const verification = await Verification.findOne({ email: "dixre@gmail.com" });
  verification?.set({ ttl: new Date().toISOString() });
  const verification2 = await Verification.findOne({
    phoneNumber: signUpCreds.phoneNumber,
  });
  verification2?.set({ ttl: new Date().toISOString() });
  await verification?.save();
  await verification2?.save();

  let response = await request(app)
    .post("/api/auth/verify/code")
    .send({
      email: "dixre@gmail.com",
      otp: "4455",
    })
    .expect(400);
  expect(getErrorResponse(response)).toEqual(IErrorCode.OTPcodeExpired);
  response = await request(app)
    .post("/api/auth/verify/code")
    .send({
      phoneNumber: signUpCreds.phoneNumber,
      otp: "4455",
    })
    .expect(400);
  expect(getErrorResponse(response)).toEqual(IErrorCode.OTPcodeExpired);
});

it("should not verify email or phoneNumber since otp is incorrect", async () => {
  await signupAndUpdateSetup();
  const verification = await Verification.findOne({
    phoneNumber: signUpCreds.phoneNumber,
  });
  const user = await User.findOne({ phoneNumber: signUpCreds.phoneNumber });
  verification?.set({ ttl: addSecondsToDate(1080).toISOString() });
  user?.set({
    status: { ttl: addSecondsToDate(20000).toISOString(), isVerified: false },
  });
  await verification?.save();
  await user?.save();

  let response = await request(app)
    .post("/api/auth/verify/code")
    .send({
      email: "dixre@gmail.com",
      otp: "4455",
    })
    .expect(400);
  expect(getErrorResponse(response)).toEqual(IErrorCode.IncorrectOTPCode);
  response = await request(app)
    .post("/api/auth/verify/code")
    .send({
      phoneNumber: signUpCreds.phoneNumber,
      otp: "4455",
    })
    .expect(400);
  expect(getErrorResponse(response)).toEqual(IErrorCode.IncorrectOTPCode);
});

it("should verify email and phoneNumber given otp is correct", async () => {
  await signupAndUpdateSetup();

  const emailCode = await Verification.findOne({ email: "dixre@gmail.com" });

  await request(app)
    .post("/api/auth/verify/code")
    .send({
      email: "dixre@gmail.com",
      otp: emailCode?.verificationCode,
    })
    .expect(200);

  const user = await User.findOne({ phoneNumber: signUpCreds.phoneNumber });
  expect(user?.emailVerified).toEqual(true);
  expect(user?.status.isVerified).toEqual(true);
});

it("Should block users from retrying after exceeding maximum retries", async () => {
  await request(app).post("/api/auth/signup").send(signUpCreds).expect(201);
  let response: request.Response;
  for (let i = 0; i <= MAXIMUM_RETRY_TIMES; i++) {
    response = await request(app)
      .post("/api/auth/verify/code")
      .send({
        phoneNumber: signUpCreds.phoneNumber,
        otp: "9949",
      })
      .expect(400);
  }
  expect(response!.body.errors[0].message).toEqual(
    IErrorCode.ExceededOTPTRetries
  );
});

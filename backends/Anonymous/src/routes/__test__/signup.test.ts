import request from "supertest";
import { app } from "../../app";
import { signUpCreds } from "./test-data";
import { natsWrappper } from "../../nats-wrapper";
import { User } from "../../models/user";
import { IErrorCode } from "@crazy-devz/logger";
import { signup } from "../../test";
import { getErrorResponse } from "@crazy-devz/utils";

it("returns a 201 on successful signup", async () => {
  return request(app).post("/api/auth/signup").send(signUpCreds).expect(201);
});

it("should return 400 when trying to signup without accepting terms or setting terms to false", async () => {
  const response = await request(app)
    .post("/api/auth/signup")
    .send({ ...signUpCreds, acceptedTerms: false })
    .expect(400);
  expect(getErrorResponse(response)).toEqual(IErrorCode.TermsNotAccepted);
});

it("returns a 400 with an invalid Nigeria or invalid Phone number input", async () => {
  let response = await request(app)
    .post("/api/auth/signup")
    .send({
      ...signUpCreds,
      phoneNumber: "notValidatall",
      password: "validpassword",
    })
    .expect(400);
  expect(getErrorResponse(response)).toEqual(
    IErrorCode.InvalidAccountCreationBody
  );
  response = await request(app)
    .post("/api/auth/signup")
    .send({
      ...signUpCreds,
      phoneNumber: null,
      password: "validpassword",
    })
    .expect(400);
  expect(getErrorResponse(response)).toEqual(
    IErrorCode.InvalidAccountCreationBody
  );
  response = await request(app)
    .post("/api/auth/signup")
    .send({
      ...signUpCreds,
      phoneNumber: "89050709444",
      password: "validpassword",
    })
    .expect(400);
  expect(getErrorResponse(response)).toEqual(
    IErrorCode.InvalidAccountCreationBody
  );
});

it("returns a 400 when a password is not between 6 and 20", async () => {
  let response = await request(app)
    .post("/api/auth/signup")
    .send({
      ...signUpCreds,
      phoneNumber: "09050709555",
      password: "kdkkdkdkdkdkdkdkdkdkd",
    })
    .expect(400);
  expect(getErrorResponse(response)).toEqual(
    IErrorCode.InvalidAccountCreationBody
  );
  response = await request(app)
    .post("/api/auth/signup")
    .send({
      ...signUpCreds,
      phoneNumber: "09050709556",
      password: null,
    })
    .expect(400);
  expect(getErrorResponse(response)).toEqual(
    IErrorCode.InvalidAccountCreationBody
  );
  response = await request(app)
    .post("/api/auth/signup")
    .send({
      ...signUpCreds,
      phoneNumber: "09050709445",
      password: "wheff",
    })
    .expect(400);
  expect(getErrorResponse(response)).toEqual(
    IErrorCode.InvalidAccountCreationBody
  );
});

it("returns a 400 with missing signup informations", async () => {
  const response = await request(app)
    .post("/api/auth/signup")
    .send({})
    .expect(400);
  expect(getErrorResponse(response)).toEqual(
    IErrorCode.InvalidAccountCreationBody
  );
});

it("returns a 400 with incorrect or missing gender", async () => {
  let response = await request(app)
    .post("/api/auth/signup")
    .send({
      ...signUpCreds,
      gender: null,
    })
    .expect(400);
  expect(getErrorResponse(response)).toEqual(
    IErrorCode.InvalidAccountCreationBody
  );
  response = await request(app)
    .post("/api/auth/signup")
    .send({
      ...signUpCreds,
      gender: "lame",
    })
    .expect(400);
  expect(getErrorResponse(response)).toEqual(
    IErrorCode.InvalidAccountCreationBody
  );
});

it("returns a 400 with invalid firstName or lastName", async () => {
  let response = await request(app)
    .post("/api/auth/signup")
    .send({
      ...signUpCreds,
      firstName: null,
    })
    .expect(400);
  expect(getErrorResponse(response)).toEqual(
    IErrorCode.InvalidAccountCreationBody
  );
  response = await request(app)
    .post("/api/auth/signup")
    .send({
      ...signUpCreds,
      firstName: "klkdkdkdkdkdkdkdkdkdkddk",
    })
    .expect(400);
  expect(getErrorResponse(response)).toEqual(
    IErrorCode.InvalidAccountCreationBody
  );
  response = await request(app)
    .post("/api/auth/signup")
    .send({
      ...signUpCreds,
      firstName: "kl",
    })
    .expect(400);
  expect(getErrorResponse(response)).toEqual(
    IErrorCode.InvalidAccountCreationBody
  );
  response = await request(app)
    .post("/api/auth/signup")
    .send({
      ...signUpCreds,
      lastName: null,
    })
    .expect(400);
  expect(getErrorResponse(response)).toEqual(
    IErrorCode.InvalidAccountCreationBody
  );
  response = await request(app)
    .post("/api/auth/signup")
    .send({
      ...signUpCreds,
      lastName: "klkdkdkdkdkdkdkdkdkdkddk",
    })
    .expect(400);
  expect(getErrorResponse(response)).toEqual(
    IErrorCode.InvalidAccountCreationBody
  );
  response = await request(app)
    .post("/api/auth/signup")
    .send({
      ...signUpCreds,
      lastName: "kl",
    })
    .expect(400);
  expect(getErrorResponse(response)).toEqual(
    IErrorCode.InvalidAccountCreationBody
  );
});

it("disallow duplicate phoneNumber signup", async () => {
  await request(app).post("/api/auth/signup").send(signUpCreds).expect(201);
  const user = await User.findOne({ phoneNumber: signUpCreds.phoneNumber });
  user?.set({ status: { isVerified: true } });
  await user?.save();
  let response = await request(app)
    .post("/api/auth/signup")
    .send(signUpCreds)
    .expect(400);
  expect(getErrorResponse(response)).toEqual(IErrorCode.accountAlreadyExist);
});

it("sets a cookie after successful signup and verification", async () => {
  const cookies = await signup(signUpCreds);
  expect(cookies).toBeDefined();
});

it("ensure publish is called when user is created", async () => {
  await request(app).post("/api/auth/signup").send(signUpCreds).expect(201);
  expect(natsWrappper.client.publish).toHaveBeenCalledTimes(2);
});

it("should not create account with the same info after verification", async () => {
  await request(app).post("/api/auth/signup").send(signUpCreds).expect(201);
  const user = await User.findOne({ phoneNumber: signUpCreds.phoneNumber });

  user?.set({
    status: {
      isVerified: true,
      ttl: new Date().toISOString(),
    },
  });
  await user?.save();
  const response = await request(app)
    .post("/api/auth/signup")
    .send(signUpCreds)
    .expect(400);
  expect(getErrorResponse(response)).toEqual(IErrorCode.accountAlreadyExist);
});

it("should create account with the same info after ttl expires", async () => {
  await request(app).post("/api/auth/signup").send(signUpCreds).expect(201);
  const user = await User.findOne({ phoneNumber: signUpCreds.phoneNumber });

  user?.set({
    status: {
      ttl: new Date().toISOString(),
    },
  });
  await user?.save();
  await request(app).post("/api/auth/signup").send(signUpCreds).expect(201);
});

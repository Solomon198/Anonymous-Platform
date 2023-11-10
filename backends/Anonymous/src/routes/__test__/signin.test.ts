import request from "supertest";
import { app } from "../../app";
import { signUpCreds } from "./test-data";
import { IErrorCode } from "@crazy-devz/logger";
import { signup } from "../../test";
import { getErrorResponse } from "@crazy-devz/utils";

const { phoneNumber, password } = signUpCreds;
it("fails when  phoneNumber that does not exist is supplied", async () => {
  const response = await request(app)
    .post("/api/auth/signin")
    .send({
      phoneNumber,
      password,
    })
    .expect(400);
  expect(getErrorResponse(response)).toEqual(
    IErrorCode.invalidLoginCredentials
  );
});

it("fails when an incorrect password is supplied", async () => {
  await signup(signUpCreds);
  const response = await request(app)
    .post("/api/auth/signin")
    .send({
      phoneNumber,
      password: "validpasswor",
    })
    .expect(400);
  expect(getErrorResponse(response)).toEqual(
    IErrorCode.invalidLoginCredentials
  );
});

it("responds with a cookie when given valid credentials", async () => {
  await signup(signUpCreds);
  const response = await request(app)
    .post("/api/auth/signin")
    .send({
      phoneNumber,
      password,
    })
    .expect(200);
  expect(response.get("Set-Cookie")).toBeDefined();
});

it("Should not be able to signin without  verifying account", async () => {
  await request(app).post("/api/auth/signup").send(signUpCreds).expect(201);
  const response = await request(app)
    .post("/api/auth/signin")
    .send(signUpCreds)
    .expect(400);
  expect(getErrorResponse(response)).toEqual(IErrorCode.AccountNotVerified);
});

it("Should  be able to signin  after verifying account", async () => {
  await signup(signUpCreds);
  const response = await request(app)
    .post("/api/auth/signin")
    .send(signUpCreds)
    .expect(200);
  expect(response.get("Set-Cookie")).toBeDefined();
});

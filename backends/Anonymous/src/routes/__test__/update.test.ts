import request from "supertest";
import { app } from "../../app";
import { signUpCreds } from "./test-data";
import { signup } from "../../test";
import { natsWrappper } from "../../nats-wrapper";
import { User } from "../../models/user";
import { IErrorCode } from "@crazy-devz/logger";
import { getErrorResponse } from "@crazy-devz/utils";

it("should get 401 not authorized while trying to update profile without login in", async () => {
  const response = await request(app)
    .put("/api/auth/users/update")
    .send(signUpCreds)
    .expect(401);
  expect(getErrorResponse(response)).toEqual(IErrorCode.unauthorizedRequest);
});

it("should get 400 trying to update account with invalid Email, password, FirstName or LastName", async () => {
  const cookie = await signup(signUpCreds);
  let response = await request(app)
    .put("/api/auth/users/update")
    .set("Cookie", cookie)
    .send({
      email: "invalid.com",
    })
    .expect(400);
  expect(getErrorResponse(response)).toEqual(
    IErrorCode.invalidAccountUpdateBody
  );
  response = await request(app)
    .put("/api/auth/users/update")
    .set("Cookie", cookie)
    .send({
      firstName: "kd", // mininum is 3
    })
    .expect(400);
  expect(getErrorResponse(response)).toEqual(
    IErrorCode.invalidAccountUpdateBody
  );
  response = await request(app)
    .put("/api/auth/users/update")
    .set("Cookie", cookie)
    .send({
      lastName: "kd", // mininum is 3
    })
    .expect(400);
  expect(getErrorResponse(response)).toEqual(
    IErrorCode.invalidAccountUpdateBody
  );
  response = await request(app)
    .put("/api/auth/users/update")
    .set("Cookie", cookie)
    .send({
      firstName: "kddhdksjdhskdhsdjskdhd", // max is 20
    })
    .expect(400);
  expect(getErrorResponse(response)).toEqual(
    IErrorCode.invalidAccountUpdateBody
  );
  response = await request(app)
    .put("/api/auth/users/update")
    .set("Cookie", cookie)
    .send({
      lastName: "kdhdhdhdhdhdhdhdhdhdh", // max is 20
    })
    .expect(400);
  expect(getErrorResponse(response)).toEqual(
    IErrorCode.invalidAccountUpdateBody
  );
  response = await request(app)
    .put("/api/auth/users/update")
    .set("Cookie", cookie)
    .send({
      password: "kdhdhdhdhdhdhdhdhdhdh", // max is 20
    })
    .expect(400);
  expect(getErrorResponse(response)).toEqual(
    IErrorCode.invalidAccountUpdateBody
  );
  response = await request(app)
    .put("/api/auth/users/update")
    .set("Cookie", cookie)
    .send({
      password: "hjdhd", // min is 6
    })
    .expect(400);
  expect(getErrorResponse(response)).toEqual(
    IErrorCode.invalidAccountUpdateBody
  );
});

it("Should be able to update information with valid info while logged in", async () => {
  const cookie = await signup(signUpCreds);
  return request(app)
    .put("/api/auth/users/update")
    .set("Cookie", cookie)
    .send({
      email: "dixre@gmail.com",
      firstName: "dixre",
      lastName: "enterprise",
      password: "workingAll",
    })
    .expect(200);
});

it("Should call publish three times if updates don't involve one of firstName, email, or lastName", async () => {
  const cookie = await signup(signUpCreds);
  await request(app)
    .put("/api/auth/users/update")
    .set("Cookie", cookie)
    .send({
      password: "workingAll",
    })
    .expect(200);

  expect(natsWrappper.client.publish).toHaveBeenCalledTimes(3);
});

it("Should call publish five times if updates involves all fields", async () => {
  const cookie = await signup(signUpCreds);
  await request(app)
    .put("/api/auth/users/update")
    .set("Cookie", cookie)
    .send({
      password: "workingAll",
      email: "dixre@gmail.com",
      firstName: "dixre",
      lastName: "enterprise",
    })
    .expect(200);

  expect(natsWrappper.client.publish).toHaveBeenCalledTimes(5);
});

it("Should call publish four times if updates involves all fields except email", async () => {
  const cookie = await signup(signUpCreds);
  await request(app)
    .put("/api/auth/users/update")
    .set("Cookie", cookie)
    .send({
      password: "workingAll",
      firstName: "dixre",
      lastName: "enterprise",
    })
    .expect(200);

  expect(natsWrappper.client.publish).toHaveBeenCalledTimes(4);
});

it("Should reset email verification status to false when email is updated", async () => {
  const cookie = await signup(signUpCreds);
  await request(app)
    .put("/api/auth/users/update")
    .set("Cookie", cookie)
    .send({
      password: "workingAll",
      email: "dixre@gmail.com",
      firstName: "dixre",
      lastName: "enterprise",
    })
    .expect(200);
  const userData = await User.findOne({ email: "dixre@gmail.com" });
  userData?.set({
    emailVerified: true,
  });
  await userData?.save();
  await request(app)
    .put("/api/auth/users/update")
    .set("Cookie", cookie)
    .send({
      password: "workingAll",
      email: "dixre2@gmail.com",
      firstName: "dixre",
      lastName: "enterprise",
    })
    .expect(200);
  const user = await User.findOne({ email: "dixre2@gmail.com" });
  expect(user?.email).toEqual("dixre2@gmail.com");
  expect(user?.emailVerified).toBe(false);
});

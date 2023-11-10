import request from "supertest";
import { app } from "../../app";
import { signup } from "../../test";
import { signUpCreds } from "./test-data";

it("responds with detail about current user", async () => {
  const cookie = await signup(signUpCreds);
  const response = await request(app)
    .get("/api/auth/currentuser")
    .set("Cookie", cookie)
    .send()
    .expect(200);
  expect(response.body.currentUser.phoneNumber).toEqual(
    signUpCreds.phoneNumber
  );
});

it("responds with 401 if not authenticated", async () => {
  await request(app).get("/api/auth/currentuser").send().expect(401);
});

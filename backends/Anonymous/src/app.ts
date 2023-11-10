import express from "express";
import "express-async-errors";
import { json } from "body-parser";
import {
  ressetPasswordRouter,
  currentUserRouter,
  signinRouter,
  signoutRouter,
  signupRouter,
  verifyRouter,
  updateAccountRouter,
  recoverAccount,
  testRouter,
} from "./routes";
import { logger } from "@crazy-devz/middleware";
import { ErrorHandler, NotFoundError } from "@crazy-devz/common";
import cookieSession from "cookie-session";
import { IErrorCode } from "@crazy-devz/logger";
import { log } from "./utils";

const app = express();
app.set("trust proxy", true);
app.use(json());
app.use(
  cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== "test",
  })
);
app.use(logger(log));
app.use(currentUserRouter);
app.use(signupRouter);
app.use(signinRouter);
app.use(signoutRouter);
app.use(verifyRouter);
app.use(updateAccountRouter);
app.use(ressetPasswordRouter);
app.use(recoverAccount);
app.use(testRouter);

app.all("*", async () => {
  throw new NotFoundError(IErrorCode.RouteNotFound);
});
app.use(ErrorHandler(IErrorCode.AuthServiceInternalServerError, log));

export { app };

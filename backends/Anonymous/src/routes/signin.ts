import express from "express";
import { ValidateRequest } from "@crazy-devz/common";
import expressAsyncHandler from "express-async-handler";
import HandleSignIn from "../handlers/auth/signin";
import { validateAccountLoginBody } from "../utils/validations/requests/validators";

const router = express.Router();

router.post(
  "/api/auth/signin",
  validateAccountLoginBody,
  expressAsyncHandler(ValidateRequest),
  expressAsyncHandler(HandleSignIn)
);

export { router as signinRouter };

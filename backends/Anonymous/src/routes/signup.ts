import express from "express";
import { ValidateRequest } from "@crazy-devz/common";
import HandleSignUp from "../handlers/auth/signup";
import expressAsyncHandler from "express-async-handler";
import { validateAccountCreationBody } from "../utils/validations/requests/validators";

const router = express.Router();

router.post(
  "/api/auth/signup",
  validateAccountCreationBody,
  expressAsyncHandler(ValidateRequest),
  expressAsyncHandler(HandleSignUp)
);

export { router as signupRouter };

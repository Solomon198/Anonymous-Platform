import express from "express";
import { CurrentUser, RequireAuth, ValidateRequest } from "@crazy-devz/common";
import expressAsyncHandler from "express-async-handler";
import {
  validateRessetPasswordBody,
  validateVerifyRessetPasswordOTP,
  validateRessetAccountPasswordBody,
} from "../utils/validations/requests/validators";
import {
  UserExistAndVerified,
  canRequestPasswordRequest,
  RessetPasswordCheckTimeout,
} from "../middlewares";
import {
  HandleSendResetPasswordVerificationCode,
  HandleVerifyResetPasswordOTP,
  HandleUpdatePassword,
} from "../handlers/auth/ressetPassword";
import { IErrorCode } from "@crazy-devz/logger";

const router = express.Router();

router.post(
  "/api/auth/password/reset/verify-otp",
  validateVerifyRessetPasswordOTP,
  expressAsyncHandler(ValidateRequest),
  expressAsyncHandler(RessetPasswordCheckTimeout),
  expressAsyncHandler(HandleVerifyResetPasswordOTP)
);

router.post(
  "/api/auth/password/reset",
  validateRessetPasswordBody,
  expressAsyncHandler(ValidateRequest),
  expressAsyncHandler(UserExistAndVerified),
  expressAsyncHandler(canRequestPasswordRequest),
  expressAsyncHandler(HandleSendResetPasswordVerificationCode)
);

router.put(
  "/api/auth/password/reset",
  validateRessetAccountPasswordBody,
  expressAsyncHandler(ValidateRequest),
  expressAsyncHandler(CurrentUser),
  expressAsyncHandler(RequireAuth(IErrorCode.InvalidResetPasswordToken)),
  expressAsyncHandler(HandleUpdatePassword)
);

export { router as ressetPasswordRouter };

import express from "express";
import expressAsyncHandler from "express-async-handler";
import { IErrorCode } from "@crazy-devz/logger";
import { CurrentUser, RequireAuth, ValidateRequest } from "@crazy-devz/common";
import {
  validateRecoverAccountBody,
  validateRecoverAccountVerificationBody,
  validateAccountRessetBody,
} from "../utils/validations/requests/validators";
import {
  AccountRecoveryCheckTimeout,
  CanRequestAccountRecoveryOTP,
  EmailExistAndVerified,
} from "../middlewares";
import {
  HandleSendRecoverAccountCode,
  HandleUpdateAccount,
  HandleVerifyVerifyAccountOTP,
} from "../handlers/auth/recoverAccount";

const router = express.Router();

router.post(
  "/api/auth/recover-account/verify-otp",
  validateRecoverAccountVerificationBody,
  expressAsyncHandler(ValidateRequest),
  expressAsyncHandler(AccountRecoveryCheckTimeout),
  expressAsyncHandler(HandleVerifyVerifyAccountOTP)
);

router.post(
  "/api/auth/recover-account",
  validateRecoverAccountBody,
  expressAsyncHandler(ValidateRequest),
  expressAsyncHandler(EmailExistAndVerified),
  expressAsyncHandler(CanRequestAccountRecoveryOTP),
  expressAsyncHandler(HandleSendRecoverAccountCode)
);

router.put(
  "/api/auth/recover-account",
  validateAccountRessetBody,
  expressAsyncHandler(ValidateRequest),
  expressAsyncHandler(CurrentUser),
  expressAsyncHandler(RequireAuth(IErrorCode.InvalidRecoverAccountAuthToken)),
  expressAsyncHandler(HandleUpdateAccount)
);

export { router as recoverAccount };

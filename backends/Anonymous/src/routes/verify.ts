import express from "express";
import expressAsyncHandler from "express-async-handler";
import { ValidateRequest } from "@crazy-devz/common";
import {
  HandleVerifyEmail,
  HandleVerifySMS,
  HandleVerifyCode,
} from "../handlers/auth/verify";
import {
  validatePhoneNumberVerifyBody,
  validateEmailVerifyBody,
  validateAccountVerificationBody,
} from "../utils/validations/requests/validators";
import {
  PhoneNumberExist,
  EmailExist,
  VerificationTimeout,
} from "../middlewares/index";
import { CanRequestOTP } from "../middlewares/canRequestOTP";

const router = express.Router();

router.post(
  "/api/auth/verify/sms",
  validatePhoneNumberVerifyBody,
  expressAsyncHandler(ValidateRequest),
  expressAsyncHandler(PhoneNumberExist),
  expressAsyncHandler(CanRequestOTP),
  expressAsyncHandler(HandleVerifySMS)
);
router.post(
  "/api/auth/verify/email",
  validateEmailVerifyBody,
  expressAsyncHandler(ValidateRequest),
  expressAsyncHandler(EmailExist),
  expressAsyncHandler(CanRequestOTP),
  expressAsyncHandler(HandleVerifyEmail)
);

router.post(
  "/api/auth/verify/code",
  validateAccountVerificationBody,
  expressAsyncHandler(ValidateRequest),
  expressAsyncHandler(VerificationTimeout),
  expressAsyncHandler(HandleVerifyCode)
);

export { router as verifyRouter };

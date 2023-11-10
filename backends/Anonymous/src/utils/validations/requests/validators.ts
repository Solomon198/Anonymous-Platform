import { IErrorCode } from "@crazy-devz/logger";
import { body } from "express-validator";
import { Gender } from "../../types";

export const validateAccountCreationBody = [
  body("firstName")
    .isLength({ min: 3, max: 20 })
    .withMessage(IErrorCode.InvalidAccountCreationBody),
  body("lastName")
    .isLength({ min: 3, max: 20 })
    .withMessage(IErrorCode.InvalidAccountCreationBody),
  body("acceptedTerms")
    .isBoolean()
    .withMessage(IErrorCode.InvalidAccountCreationBody),
  body("gender").custom(async (value) => {
    if (!Object.values(Gender).includes(value)) {
      throw new Error(IErrorCode.InvalidAccountCreationBody);
    }
  }),
  body("phoneNumber")
    .isMobilePhone("en-NG")
    .withMessage(IErrorCode.InvalidAccountCreationBody),
  body("password")
    .trim()
    .isLength({ min: 6, max: 20 })
    .withMessage(IErrorCode.InvalidAccountCreationBody),
];

export const validateAccountLoginBody = [
  body("phoneNumber")
    .isMobilePhone("en-NG")
    .withMessage(IErrorCode.InvalidAccountLoginBody),
  body("password")
    .trim()
    .exists({ checkNull: true, checkFalsy: true })
    .withMessage(IErrorCode.InvalidAccountLoginBody),
];

export const validateEmailVerifyBody = [
  body("email").isEmail().withMessage(IErrorCode.InvalidVerifyAccountBody),
];

export const validatePhoneNumberVerifyBody = [
  body("phoneNumber")
    .isMobilePhone("en-NG")
    .withMessage(IErrorCode.InvalidVerifyAccountBody),
];

export const validateRessetPasswordBody = [
  body("phoneNumber")
    .isMobilePhone("en-NG")
    .withMessage(IErrorCode.InvalidPasswordRessetBody),
];

export const validateVerifyRessetPasswordOTP = [
  body("phoneNumber")
    .isMobilePhone("en-NG")
    .withMessage(IErrorCode.InvalidPasswordRessetOTPBody),
  body("otp")
    .isLength({ max: 4, min: 4 })
    .withMessage(IErrorCode.InvalidPasswordRessetOTPBody),
];

export const validateAccountUpdateBody = [
  body(["firstName", "lastName"])
    .isString()
    .isLength({ min: 3, max: 20 })
    .optional()
    .withMessage(IErrorCode.invalidAccountUpdateBody),
  body("email")
    .isEmail()
    .optional()
    .withMessage(IErrorCode.invalidAccountUpdateBody),
  body("password")
    .trim()
    .optional()
    .isLength({ min: 6, max: 20 })
    .withMessage(IErrorCode.invalidAccountUpdateBody),
];

export const validateAccountVerificationBody = [
  body("email")
    .isEmail()
    .optional()
    .withMessage(IErrorCode.InvalidOTPRequestBodyCredentials),
  body("phoneNumber")
    .isMobilePhone("en-NG")
    .optional()
    .withMessage(IErrorCode.InvalidOTPRequestBodyCredentials),
  body("otp")
    .trim()
    .isLength({ min: 4, max: 4 })
    .withMessage(IErrorCode.InvalidOTPRequestBodyCredentials),
];

export const validateRecoverAccountVerificationBody = [
  body("email")
    .isEmail()
    .withMessage(IErrorCode.InvalidOTPRequestBodyCredentials),
  body("otp")
    .trim()
    .isLength({ min: 4, max: 4 })
    .withMessage(IErrorCode.InvalidOTPRequestBodyCredentials),
];

export const validateRessetAccountPasswordBody = [
  body("password")
    .trim()
    .isLength({ min: 6, max: 20 })
    .withMessage(IErrorCode.InvalidAccountCreationBody),
];

export const validateRecoverAccountBody = [
  body("email")
    .isEmail()
    .withMessage(IErrorCode.InvalidAccountRecoverRequestBody),
];

export const validateAccountRessetBody = [
  body("phoneNumber")
    .isMobilePhone("en-NG")
    .withMessage(IErrorCode.InvalidAccountRecoveryRessetBody),
  body("password")
    .trim()
    .isLength({ min: 6, max: 20 })
    .withMessage(IErrorCode.InvalidAccountRecoveryRessetBody),
];

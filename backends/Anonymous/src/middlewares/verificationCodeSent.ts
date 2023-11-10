import { Request, Response, NextFunction } from "express";
import { BadRequestError } from "@crazy-devz/common";
import { IErrorCode } from "@crazy-devz/logger";
import { Verification } from "../models/verification";
import { hasTimeElapsed } from "../utils/helpers";

export const VerificationTimeout = async (
  req: Request,
  _: Response,
  next: NextFunction
) => {
  const { email, phoneNumber } = req.body;
  const user = await Verification.findOne({
    $or: [{ email: email || "" }, { phoneNumber: phoneNumber || "" }],
  });

  if (user) {
    if (hasTimeElapsed(user.ttl)) {
      throw new BadRequestError(IErrorCode.OTPcodeExpired);
    }
  } else {
    throw new BadRequestError(IErrorCode.InvalidOTPCredentials);
  }
  next();
};

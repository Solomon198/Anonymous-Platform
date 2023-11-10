import { Request, Response, NextFunction } from "express";
import { BadRequestError } from "@crazy-devz/common";
import { IErrorCode } from "@crazy-devz/logger";
import { hasTimeElapsed } from "../utils/helpers";
import { RessetPassword } from "../models/ressetPassword";

export const RessetPasswordCheckTimeout = async (
  req: Request,
  _: Response,
  next: NextFunction
) => {
  const { phoneNumber } = req.body;
  const user = await RessetPassword.findOne({ phoneNumber });

  if (user) {
    if (hasTimeElapsed(user.ttl)) {
      throw new BadRequestError(IErrorCode.RessetPasswordOTPExpired);
    }
  } else {
    throw new BadRequestError(IErrorCode.InvalidRessetPasswordCredential);
  }
  next();
};

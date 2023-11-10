import { Request, Response, NextFunction } from "express";
import { BadRequestError } from "@crazy-devz/common";
import { IErrorCode } from "@crazy-devz/logger";
import { hasTimeElapsed } from "../utils/helpers";
import { RessetPassword } from "../models/ressetPassword";

export const canRequestPasswordRequest = async (
  req: Request,
  _: Response,
  next: NextFunction
) => {
  const { phoneNumber } = req.body;
  const ressetPassword = await RessetPassword.findOne({ phoneNumber });
  if (ressetPassword) {
    if (!hasTimeElapsed(ressetPassword.ttl)) {
      throw new BadRequestError(IErrorCode.RessetPasswordLastOTPNotExpired);
    } else {
      await ressetPassword.deleteOne();
    }
  }
  next();
};

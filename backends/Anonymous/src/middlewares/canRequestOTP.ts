import { Request, Response, NextFunction } from "express";
import { BadRequestError } from "@crazy-devz/common";
import { IErrorCode } from "@crazy-devz/logger";
import { Verification } from "../models/verification";
import { hasTimeElapsed } from "../utils/helpers";

export const CanRequestOTP = async (
  req: Request,
  _: Response,
  next: NextFunction
) => {
  const { email, phoneNumber } = req.body;
  const user = await Verification.findOne({
    $or: [{ email: email || "" }, { phoneNumber: phoneNumber || "" }],
  });
  if (user) {
    if (!hasTimeElapsed(user.ttl)) {
      throw new BadRequestError(IErrorCode.LastOTPnotExpiredYet);
    } else {
      await user.deleteOne();
    }
  }
  next();
};

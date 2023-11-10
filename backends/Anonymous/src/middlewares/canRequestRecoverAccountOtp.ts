import { Request, Response, NextFunction } from "express";
import { BadRequestError } from "@crazy-devz/common";
import { IErrorCode } from "@crazy-devz/logger";
import { hasTimeElapsed } from "../utils/helpers";
import { AccountRecovery } from "../models/accountRecovery";

export const CanRequestAccountRecoveryOTP = async (
  req: Request,
  _: Response,
  next: NextFunction
) => {
  const { email } = req.body;
  const account = await AccountRecovery.findOne({ email });
  if (account) {
    if (!hasTimeElapsed(account.ttl)) {
      throw new BadRequestError(IErrorCode.LastOTPnotExpiredYet);
    } else {
      await account.deleteOne();
    }
  }
  next();
};

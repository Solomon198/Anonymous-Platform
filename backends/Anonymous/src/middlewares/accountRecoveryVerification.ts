import { Request, Response, NextFunction } from "express";
import { BadRequestError } from "@crazy-devz/common";
import { IErrorCode } from "@crazy-devz/logger";
import { hasTimeElapsed } from "../utils/helpers";
import { AccountRecovery } from "../models/accountRecovery";

export const AccountRecoveryCheckTimeout = async (
  req: Request,
  _: Response,
  next: NextFunction
) => {
  const { email } = req.body;
  const user = await AccountRecovery.findOne({ email });

  if (user) {
    if (hasTimeElapsed(user.ttl)) {
      throw new BadRequestError(IErrorCode.accountRecoveryOtpTimeout);
    }
  } else {
    throw new BadRequestError(IErrorCode.InvalidAccountRecoveryCredential);
  }
  next();
};

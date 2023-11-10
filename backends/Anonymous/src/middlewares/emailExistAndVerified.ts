import { Request, Response, NextFunction } from "express";
import { User } from "../models/user";
import { BadRequestError } from "@crazy-devz/common";
import { IErrorCode } from "@crazy-devz/logger";

export const EmailExistAndVerified = async (
  req: Request,
  _: Response,
  next: NextFunction
) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw new BadRequestError(IErrorCode.InvalidAccountRecoveryCredential);
  }
  if (!user.emailVerified) {
    throw new BadRequestError(IErrorCode.AccountEmailNotVerified);
  }
  next();
};

import { Request, Response, NextFunction } from "express";
import { User } from "../models/user";
import { BadRequestError } from "@crazy-devz/common";
import { IErrorCode } from "@crazy-devz/logger";

export const PhoneNumberExist = async (
  req: Request,
  _: Response,
  next: NextFunction
) => {
  const { phoneNumber } = req.body;
  const user = await User.findOne({ phoneNumber });
  if (!user) {
    throw new BadRequestError(IErrorCode.InvalidVerifyAccountBody);
  }
  next();
};

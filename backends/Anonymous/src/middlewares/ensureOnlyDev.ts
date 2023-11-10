import { Request, Response, NextFunction } from "express";
import { BadRequestError } from "@crazy-devz/common";
import { IErrorCode } from "@crazy-devz/logger";
import { ENVIRONMENTS } from "@crazy-devz/utils";

export const EnsureOnlyDev = async (
  req: Request,
  _: Response,
  next: NextFunction
) => {
  if (ENVIRONMENTS.PROD === process.env.NODE_ENV) {
    throw new BadRequestError(IErrorCode.CannotAccessRoute);
  }
  next();
};

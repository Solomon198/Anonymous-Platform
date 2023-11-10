import { Request, Response, NextFunction } from "express";
import { CustomError } from "../errors/custom-error";
import { IErrorCode, LoggerInterface } from "@crazy-devz/logger";

export const ErrorHandler =
  (serviceErrorCode: IErrorCode, log: LoggerInterface) =>
  (err: Error, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof CustomError) {
      return res.status(err.statusCode).send({ errors: err.serializeErrors() });
    }
    log.crit({ code: serviceErrorCode, customMessage: err.message });
    return res.status(500).send({ errors: [{ message: serviceErrorCode }] });
  };

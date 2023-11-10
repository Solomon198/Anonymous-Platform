import { LoggerInterface } from "@crazy-devz/logger";
import { Request, Response, NextFunction } from "express";

export const logger = (log: LoggerInterface) => {
  return (req: Request, _: Response, next: NextFunction) => {
    req.log = log;
    next();
  };
};

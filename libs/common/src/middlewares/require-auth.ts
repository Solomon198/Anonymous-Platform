import { Request, Response, NextFunction } from "express";
import { NotAuthorized } from "../errors/not-authorized";

export const RequireAuth =
  (serviceErrorCode: string) =>
  (req: Request, res: Response, next: NextFunction) => {
    if (!req.currentUser) {
      throw new NotAuthorized(serviceErrorCode);
    }
    next();
  };

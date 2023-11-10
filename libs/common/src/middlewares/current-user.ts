import { decodeBase64String } from "@crazy-devz/utils";
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface UserPayload {
  phoneNumber: string;
  id: string;
}

declare global {
  namespace Express {
    interface Request {
      currentUser?: UserPayload;
    }
  }
}

export const CurrentUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.session?.jwt) {
    return next();
  }
  try {
    const payload = jwt.verify(
      req.session.jwt,
      decodeBase64String(process.env.JWT_KEY!)
    ) as UserPayload;
    req.currentUser = payload;
  } catch {}
  next();
};

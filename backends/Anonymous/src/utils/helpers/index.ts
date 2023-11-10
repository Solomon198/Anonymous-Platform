import { decodeBase64String } from "@crazy-devz/utils";
import jwt from "jsonwebtoken";

export const generateVerificationCode = (): string => {
  const numbers = [];
  for (let i = 0; i < 4; i++) {
    numbers.push(Math.floor(Math.random() * 10));
  }
  return numbers.join("");
};

export const hasTimeElapsed = (date: string): boolean => {
  return new Date(date).getTime() - new Date().getTime() < 1;
};

export const addSecondsToDate = (seconds: number): Date => {
  const date = new Date();
  date.setSeconds(date.getSeconds() + seconds);
  return date;
};

export const getJWT = ({
  userId,
  phoneNumber,
  expire,
  email,
}: {
  userId?: string;
  phoneNumber: string;
  expire?: number;
  email?: string;
}) => {
  const token = jwt.sign(
    {
      id: userId,
      phoneNumber,
      ...(email ? { email } : {}),
    },
    decodeBase64String(process.env.JWT_KEY!),
    {
      ...(expire ? { expiresIn: expire } : {}),
    }
  );
  return token;
};

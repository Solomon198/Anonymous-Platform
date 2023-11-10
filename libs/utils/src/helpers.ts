import jwt from "jsonwebtoken";
import type request from "supertest";

export const decodeBase64String = (value: string): string => {
  const buff = Buffer.from(value, "base64");
  return buff.toString("utf-8");
};

export const encodeBase64String = (value: string): string => {
  const buff = Buffer.from(value, "utf-8");
  return buff.toString("base64");
};

export const getErrorResponse = (response: request.Response) => {
  return response.body.errors[0].message;
};

export const getCookie = (
  phoneNumber: string,
  userId: string,
  expires = 60 * 60
) => {
  const token = jwt.sign(
    {
      id: userId,
      phoneNumber,
    },
    decodeBase64String(process.env.JWT_KEY!),
    {
      ...{ expiresIn: expires },
    }
  );
  const base64String = encodeBase64String(JSON.stringify({ jwt: token }));
  const cookie = [`session=${base64String}; path=/; httponly`];
  return cookie;
};

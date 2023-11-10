import nodemailer from "nodemailer";
import { MailtrapTransport } from "mailtrap";

export const createMailTransport = (token: string) => {
  const transport = nodemailer.createTransport(MailtrapTransport({ token }));
  return transport;
};

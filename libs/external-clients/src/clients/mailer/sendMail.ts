import { createMailTransport } from "./transport";
import { IMail } from "../../types";

export const mailTrapClient = (mailTrapToken: string) => {
  const transport = createMailTransport(mailTrapToken);
  return {
    sendMail: async (mail: IMail) => {
      const message = await transport.sendMail(mail);
      return message;
    },
  };
};

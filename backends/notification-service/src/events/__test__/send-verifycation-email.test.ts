import { natsWrappper } from "../../nats-wrapper";
import { SendVerificationEmailListener } from "../listeners";
import { EMAIL_TEMPLATES, decodeBase64String } from "@crazy-devz/utils";
import { Message } from "node-nats-streaming";
import { mailTrapClient } from "@crazy-devz/external-clients";

it("Should ensure that it recieves an event when an Email Event is published with a template", async () => {
  const listener = await new SendVerificationEmailListener(natsWrappper.client);
  const msg: Message = {
    ack: jest.fn(),
  } as any;
  const sendMail = jest.fn().mockImplementation((mail: any) => {
    console.log(mail);
  });
  await listener.onMessage(
    {
      email: "dixre@gmail.com",
      verificationCode: "1727",
      templateId: EMAIL_TEMPLATES.VERIFY_EMAIL,
    },
    msg
  );

  expect(mailTrapClient).toHaveBeenCalled();
  expect(mailTrapClient).toHaveBeenCalledWith(
    decodeBase64String(process.env.MAIL_TRAP_TOKEN!)
  );
});

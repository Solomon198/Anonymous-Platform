import { natsWrappper } from "../../nats-wrapper";
import { SendVerificationSMSListener } from "../listeners";
import { EMAIL_TEMPLATES, decodeBase64String } from "@crazy-devz/utils";
import { Message } from "node-nats-streaming";
import { twilioClient } from "@crazy-devz/external-clients";

it("Should ensure that it recieves an event when an Email Event is published with a template", async () => {
  const listener = await new SendVerificationSMSListener(natsWrappper.client);
  const msg: Message = {
    ack: jest.fn(),
  } as any;
  await listener.onMessage(
    {
      phoneNumber: "09050709444",
      verificationCode: "1727",
      templateId: EMAIL_TEMPLATES.VERIFY_PHONE_NUMBER,
    },
    msg
  );

  expect(twilioClient).toHaveBeenCalled();
  expect(twilioClient).toHaveBeenCalledWith({
    accountAuthToken: decodeBase64String(process.env.TWILLIO_AUTH_TOKEN!),
    accountSID: decodeBase64String(process.env.TWILLIO_SSID!),
  });
});

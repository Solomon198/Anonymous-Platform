import { Listener, SendVerificationSMS, Subjects } from "@crazy-devz/common";
import { queueGroupName } from "./queue-group-name";
import { Message } from "node-nats-streaming";
import { twilioClient } from "@crazy-devz/external-clients";
import { getSMSCompiledTemplate, log } from "../../utils";
import { IErrorCode } from "@crazy-devz/logger";
import { decodeBase64String } from "@crazy-devz/utils";

export class SendVerificationSMSListener extends Listener<SendVerificationSMS> {
  queueGroupName: string = queueGroupName;
  subject: Subjects.SendVerificationSMS = Subjects.SendVerificationSMS;

  async onMessage(
    data: { phoneNumber: string; verificationCode: string; templateId: string },
    msg: Message
  ) {
    try {
      const { TWILLIO_SSID, TWILLIO_AUTH_TOKEN, TWILLIO_SENDER_PHONENUMBER } =
        process.env;
      const client = twilioClient({
        accountAuthToken: decodeBase64String(TWILLIO_AUTH_TOKEN as string),
        accountSID: decodeBase64String(TWILLIO_SSID as string),
      });
      console.log(data.verificationCode, " Verification Code ");
      const smsText = getSMSCompiledTemplate(data.templateId, data);
      await client.sendSMS({
        to: data.phoneNumber,
        from: decodeBase64String(TWILLIO_SENDER_PHONENUMBER as string),
        body: smsText,
      });
    } catch (e: any) {
      log.error({
        code: IErrorCode.UnableToSendSMSOTP,
        customMessage: `Could not send SMS with the following info ${JSON.stringify(
          data
        )} with the error ${e!.stack}`,
      });
    }
    msg.ack();
  }
}

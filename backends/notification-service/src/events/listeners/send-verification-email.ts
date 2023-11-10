import { Listener, SendVerificationEmail, Subjects } from "@crazy-devz/common";
import { queueGroupName } from "./queue-group-name";
import { Message } from "node-nats-streaming";
import { mailTrapClient } from "@crazy-devz/external-clients";
import { getEmailCompiledTemplate, log } from "../../utils";
import { IErrorCode } from "@crazy-devz/logger";
import { decodeBase64String } from "@crazy-devz/utils";

export class SendVerificationEmailListener extends Listener<SendVerificationEmail> {
  queueGroupName: string = queueGroupName;
  subject: Subjects.SendVerificationEmail = Subjects.SendVerificationEmail;

  async onMessage(
    data: { email: string; verificationCode: string; templateId: string },
    msg: Message
  ) {
    try {
      const { MAIL_TRAP_TOKEN, SENDER_ADDRESS } = process.env;
      const client = mailTrapClient(
        decodeBase64String(MAIL_TRAP_TOKEN as string)
      );
      const { html, subject } = getEmailCompiledTemplate(data.templateId, data);
      await client.sendMail({
        subject,
        from: {
          name: "",
          address: decodeBase64String(SENDER_ADDRESS as string),
        },
        to: { name: "", address: data.email },
        html,
      });
      msg.ack();
    } catch (e: any) {
      log.error({
        code: IErrorCode.UnableToSendEmailOTP,
        customMessage: `Could not send email with the following info ${JSON.stringify(
          data
        )} with the error ${e!.stack}`,
      });
    }
    msg.ack();
  }
}

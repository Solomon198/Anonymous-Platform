import { Request, Response } from "express";
import { Verification } from "../../models/verification";
import { RessetPassword } from "../../models/ressetPassword";
import { AccountRecovery } from "../../models/accountRecovery";

const HandleGetUserOtp = async (req: Request, res: Response) => {
  const { email, phoneNumber } = req.query;
  const $phone = await Verification.findOne({
    phoneNumber,
  });
  const $email = await Verification.findOne({
    email,
  });
  const $ressetOtp = await RessetPassword.findOne({
    phoneNumber,
  });
  const $recoveryOtp = await AccountRecovery.findOne({
    email,
  });
  res.status(200).send({
    email: $email ? $email.verificationCode : undefined,
    phoneNumber: $phone ? $phone.verificationCode : undefined,
    ressetPassword: $ressetOtp ? $ressetOtp.verificationCode : undefined,
    recoverAccount: $recoveryOtp ? $recoveryOtp.verificationCode : undefined,
  });
};

export default HandleGetUserOtp;

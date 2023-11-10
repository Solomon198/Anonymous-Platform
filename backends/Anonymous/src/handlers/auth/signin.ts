import { User } from "../../models/user";
import { Password } from "../../services/password";
import jwt from "jsonwebtoken";
import { Request, Response } from "express";
import { BadRequestError } from "@crazy-devz/common";
import { IErrorCode } from "@crazy-devz/logger";
import { decodeBase64String } from "@crazy-devz/utils";

const HandleSignIn = async (req: Request, res: Response) => {
  const { phoneNumber, password } = req.body;
  const existinguser = await User.findOne({ phoneNumber });
  if (!existinguser) {
    throw new BadRequestError(IErrorCode.invalidLoginCredentials);
  }
  if (!existinguser.status.isVerified) {
    throw new BadRequestError(IErrorCode.AccountNotVerified);
  }
  const passwordMatch = await Password.compare(existinguser.password, password);
  if (!passwordMatch) {
    throw new BadRequestError(IErrorCode.invalidLoginCredentials);
  }

  const token = jwt.sign(
    {
      id: existinguser._id,
      phoneNumber: existinguser.phoneNumber,
    },
    decodeBase64String(process.env.JWT_KEY!)
  );

  req.session = {
    jwt: token,
  };

  res.status(200).send(existinguser);
};

export default HandleSignIn;

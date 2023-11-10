import mongoose from "mongoose";

interface AccountRecoveryAttrs {
  email?: string;
  ttl: string;
  verificationCode: string;
  retryTimes?: number;
}

interface AccountRecoveryModel extends mongoose.Model<IAccountRecoveryDoc> {
  build(attr: AccountRecoveryAttrs): IAccountRecoveryDoc;
}

interface IAccountRecoveryDoc extends mongoose.Document {
  email?: string;
  ttl: string;
  verificationCode: string;
  retryTimes?: number;
}

const AccountRecoverySchema = new mongoose.Schema(
  {
    email: {
      type: String,
    },
    ttl: {
      type: String,
      required: true,
    },
    verificationCode: {
      type: String,
      required: true,
    },
    retryTimes: {
      type: Number,
      default: 0,
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
      },
    },
  }
);

AccountRecoverySchema.statics.build = (
  VerificationAttrs: AccountRecoveryAttrs
) => {
  return new AccountRecovery(VerificationAttrs);
};

const AccountRecovery = mongoose.model<
  IAccountRecoveryDoc,
  AccountRecoveryModel
>("AccountRecovery", AccountRecoverySchema);

export { AccountRecovery };

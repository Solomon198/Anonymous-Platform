import mongoose from "mongoose";

interface RessetPasswordAttrs {
  phoneNumber?: string;
  ttl: string;
  verificationCode: string;
  retryTimes?: number;
}

interface RessetPasswordModel extends mongoose.Model<IRessetPasswordDoc> {
  build(attr: RessetPasswordAttrs): IRessetPasswordDoc;
}

interface IRessetPasswordDoc extends mongoose.Document {
  phoneNumber?: string;
  ttl: string;
  verificationCode: string;
  retryTimes?: number;
}

const RessetPasswordSchema = new mongoose.Schema(
  {
    phoneNumber: {
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

RessetPasswordSchema.statics.build = (
  VerificationAttrs: RessetPasswordAttrs
) => {
  return new RessetPassword(VerificationAttrs);
};

const RessetPassword = mongoose.model<IRessetPasswordDoc, RessetPasswordModel>(
  "RessetPassword",
  RessetPasswordSchema
);

export { RessetPassword };

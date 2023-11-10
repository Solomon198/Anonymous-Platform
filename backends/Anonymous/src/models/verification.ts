import mongoose from "mongoose";

interface IVerificationAttrs {
  phoneNumber?: string;

  email?: string;
  ttl: string;
  userId: string;
  verificationCode: string;
  retryTimes?: number;
}

interface IVerificationModel extends mongoose.Model<IVerificationDoc> {
  build(attr: IVerificationAttrs): IVerificationDoc;
}

interface IVerificationDoc extends mongoose.Document {
  phoneNumber: string;
  email?: string;
  ttl: string;
  userId: string;
  verificationCode: string;
  retryTimes?: number;
}

const VerificationSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
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
    email: {
      type: String,
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

VerificationSchema.statics.build = (VerificationAttrs: IVerificationAttrs) => {
  return new Verification(VerificationAttrs);
};

const Verification = mongoose.model<IVerificationDoc, IVerificationModel>(
  "Verification",
  VerificationSchema
);

export { Verification };

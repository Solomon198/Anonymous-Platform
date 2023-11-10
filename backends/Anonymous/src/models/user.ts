import mongoose from "mongoose";
import { Password } from "../services/password";
import { updateIfCurrentPlugin } from "mongoose-update-if-current";
import { UserVerificationStatus } from "../utils/types";
import { hasTimeElapsed } from "../utils/helpers";

interface IUserAttrs {
  phoneNumber: string;
  password: string;
  email?: string;
  status: {
    ttl: string;
    isVerified: boolean;
  };
  emailVerified?: boolean;
}

interface IUserModel extends mongoose.Model<IUserDoc> {
  build(attr: IUserAttrs): IUserDoc;
}

interface IUserDoc extends mongoose.Document {
  phoneNumber: string;
  password: string;
  email?: string;
  version: number;
  emailVerified?: boolean;
  userIsVerified: () => UserVerificationStatus;
  hashPassword: (password: string) => Promise<string>;
  status: {
    ttl: string;
    isVerified: boolean;
  };
}

const verification = new mongoose.Schema({
  ttl: {
    type: String,
  },
  isVerified: {
    type: mongoose.Schema.Types.Boolean,
    default: false,
  },
});

const UserSchema = new mongoose.Schema(
  {
    phoneNumber: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    email: {
      type: String,
    },
    emailVerified: {
      type: Boolean,
      default: false,
    },
    status: { type: verification },
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.password;
        delete ret.__v;
      },
    },
  }
);

UserSchema.statics.build = (userAttrs: IUserAttrs) => {
  return new User(userAttrs);
};

UserSchema.methods.userIsVerified = function (): UserVerificationStatus {
  // Two things can happen here
  // 1. either account is awaiting user to verify
  // 2. or the account is not verified after ttl
  const user = this as IUserDoc;

  const expired = hasTimeElapsed(user.status.ttl);
  const { isVerified } = user.status;
  if (isVerified) {
    return UserVerificationStatus.UserVerified;
  } else if (expired) {
    return UserVerificationStatus.UserNotVerified;
  } else {
    return UserVerificationStatus.UserAwaitingVerification;
  }
};

UserSchema.methods.hashPassword = async function (
  password: string
): Promise<string> {
  const hashed = await Password.toHash(password);
  return hashed;
};

UserSchema.set("versionKey", "version");

UserSchema.pre("save", async function (done) {
  if (this.isModified("password")) {
    const hashed = await Password.toHash(this.get("password"));
    this.set("password", hashed);
  }
  done();
});

UserSchema.plugin(updateIfCurrentPlugin);

const User = mongoose.model<IUserDoc, IUserModel>("User", UserSchema);

export { User };

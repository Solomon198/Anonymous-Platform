import { CustomError } from "./custom-error";

export class NotAuthorized extends CustomError {
  constructor(public message: string) {
    super("Not authorized");
    Object.setPrototypeOf(this, NotAuthorized.prototype);
  }
  statusCode = 401;
  serializeErrors() {
    return [
      {
        message: this.message,
      },
    ];
  }
}

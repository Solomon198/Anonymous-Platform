import { CustomError } from "./custom-error";

export class NotFoundError extends CustomError {
  constructor(public message: string) {
    super("Not found");
    Object.setPrototypeOf(this, NotFoundError.prototype);
  }
  statusCode = 404;
  serializeErrors() {
    return [
      {
        message: this.message,
      },
    ];
  }
}

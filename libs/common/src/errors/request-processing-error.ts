import { CustomError } from "./custom-error";

export class RequestProcessingError extends CustomError {
  statusCode = 400;
  constructor(public message: string) {
    super(message);
    Object.setPrototypeOf(this, RequestProcessingError.prototype);
  }

  serializeErrors() {
    return [{ message: this.message }];
  }
}

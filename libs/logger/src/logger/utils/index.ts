import { ILogLevel } from "../../types";
import { createLogger } from "../index";

export const loggerInstance = () =>
  createLogger({
    level: ILogLevel.INFO,
    console: {
      enabled: true,
      level: ILogLevel.INFO,
    },
  });

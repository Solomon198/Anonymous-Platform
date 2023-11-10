import { ILogLevel } from "../../types";
import winston from "winston";

export interface Options {
  level?: ILogLevel;
  enabled?: boolean;
}

const defaultValue = {
  level: ILogLevel.INFO,
  enabled: false,
};

export const createConsoleTransport = (options: Options = defaultValue) => {
  const { level, enabled } = options;
  const { splat, timestamp, json } = winston.format;
  const format = winston.format.combine(splat(), timestamp(), json());
  return new winston.transports.Console({ level, silent: !enabled, format });
};

import Transport from "winston-transport";
import {
  Options as ConsoleOptions,
  createConsoleTransport,
} from "./transports/console";
import { ILogLevel, LoggerInterface } from "../types";
import winston from "winston";

export interface Options {
  level: ILogLevel;
  console?: ConsoleOptions;
}

const createLoggerTransport = (options: Options) => {
  const Transports: Transport[] = [];
  if (options.console?.enabled) {
    const transport = createConsoleTransport(options.console);
    Transports.push(transport);
  }
  return Transports;
};

export const createLogger = (options: Options): LoggerInterface => {
  const transports = createLoggerTransport(options);
  return winston.createLogger({ transports });
};

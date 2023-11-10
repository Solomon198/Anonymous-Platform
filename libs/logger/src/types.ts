import { Request, Response } from "express";
import { IErrorCode } from "./common/errors";

export type IGenericObject = Record<string, any>;

export type ILogRequest = Request<any> & { [key: string]: any };
export type ILogResponse = Response<any> & { [key: string]: any };

export enum ILogLevel {
  DEBUG = "debug",
  INFO = "info",
  WARN = "warn",
  ERROR = "error",
  CRITICAL = "crit",
}

type ILogError = {
  customMessage: string;
  code: IErrorCode;
};

export type LoggerInterface = {
  [key in ILogLevel]: ILogMethod;
};

interface ILogMethod {
  (log: ILogError): void;
}

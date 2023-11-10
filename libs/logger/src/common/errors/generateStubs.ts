import baseJSON from "./errors.json";
import { type IGenericObject } from "../../types";
import { writeFileSync } from "fs";

const generateStubs = (): void => {
  const typeBaseJSON: IGenericObject = baseJSON;
  const codeList: any[] = [];
  const keys = Object.keys(typeBaseJSON);
  const duplicatedKeys: any[] = [];
  const errorNameStub: IGenericObject = {};
  const errorCodeStub: IGenericObject = {};
  const orderedBaseJSON: any[] = [];

  keys.forEach((key) => {
    const hasDuplicate = codeList.some((i) => i === typeBaseJSON[key].code);
    if (hasDuplicate) {
      duplicatedKeys.push(typeBaseJSON[key].code);
    } else {
      codeList.push(typeBaseJSON[key].code);
    }

    errorCodeStub[key] = typeBaseJSON[key].code;
    errorNameStub[typeBaseJSON[key].code] = key;
    orderedBaseJSON.push({ name: key, ...typeBaseJSON[key] });
  });
  const orderedJSON: any = {};
  orderedBaseJSON
    .sort((a, b) => (a.code > b.code ? 1 : -1))
    .forEach((item) => {
      orderedJSON[item.name] = item;
      delete orderedJSON[item.name].name;
    });

  writeFileSync(
    `${__dirname}/errors.json`,
    JSON.stringify(orderedJSON, null, 2)
  );
  if (duplicatedKeys.length) {
    console.log(
      "Duplicate keys found at libs/logger/src/common/errors/errors.json: \n",
      JSON.stringify(duplicatedKeys, null, 2)
    );
    process.exit(1);
  }

  const myStubEnum = `export enum IErrorName ${JSON.stringify(
    errorNameStub,
    null,
    2
  )}\n\n export enum IErrorCode ${JSON.stringify(
    errorCodeStub,
    null,
    2
  )}`.replace(/:/g, "=");

  writeFileSync(`${__dirname}/stub.ts`, myStubEnum);
};

enum RUN_FUNCTION {
  EXECUTE = "execute",
}

if (process?.argv[2] && process?.argv[2] === RUN_FUNCTION.EXECUTE) {
  generateStubs();
}

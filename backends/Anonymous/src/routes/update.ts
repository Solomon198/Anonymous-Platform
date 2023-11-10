import express from "express";
import { CurrentUser, RequireAuth, ValidateRequest } from "@crazy-devz/common";
import { HandleUpdateUser } from "../handlers/auth/update";
import expressAsyncHandler from "express-async-handler";
import { validateAccountUpdateBody } from "../utils/validations/requests/validators";
import { IErrorCode } from "@crazy-devz/logger";

const router = express.Router();

router.put(
  "/api/auth/users/update",
  validateAccountUpdateBody,
  expressAsyncHandler(ValidateRequest),
  expressAsyncHandler(CurrentUser),
  expressAsyncHandler(RequireAuth(IErrorCode.unauthorizedRequest)),
  expressAsyncHandler(HandleUpdateUser)
);

export { router as updateAccountRouter };

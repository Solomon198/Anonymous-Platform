import express from "express";
import { CurrentUser, RequireAuth } from "@crazy-devz/common";
import HandleGetCurrentUser from "../handlers/auth/current-user";
import expressAsyncHandler from "express-async-handler";
import { IErrorCode } from "@crazy-devz/logger";

const router = express.Router();

router.get(
  "/api/auth/currentuser",
  expressAsyncHandler(CurrentUser),
  expressAsyncHandler(RequireAuth(IErrorCode.unauthorizedRequest)),
  expressAsyncHandler(HandleGetCurrentUser)
);

export { router as currentUserRouter };

import express from "express";
import expressAsyncHandler from "express-async-handler";
import { EnsureOnlyDev } from "../middlewares/ensureOnlyDev";
import HandleGetUserOtp from "../handlers/auth/get-test-otp";

const router = express.Router();

router.get(
  "/api/auth/test/otps",
  expressAsyncHandler(EnsureOnlyDev),
  expressAsyncHandler(HandleGetUserOtp)
);

export { router as testRouter };

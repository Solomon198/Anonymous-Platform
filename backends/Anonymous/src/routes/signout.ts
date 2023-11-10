import express from "express";
import expressAsyncHandler from "express-async-handler";
import HandleSignOut from "../handlers/auth/signout";

const router = express.Router();

router.post("/api/auth/signout", expressAsyncHandler(HandleSignOut));

export { router as signoutRouter };

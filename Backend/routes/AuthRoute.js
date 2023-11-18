import express from "express";
import { google, signIn, signUp } from "../controllers/User.js";

const authRouter = express.Router();

authRouter.route("/sign-up").post(signUp);
authRouter.route("/sign-in").post(signIn);
authRouter.route("/google").post(google);

export default authRouter;

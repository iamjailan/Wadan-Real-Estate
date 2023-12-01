import express from "express";
import { google, signIn, signOut, signUp } from "../controllers/User.js";

const authRouter = express.Router();

authRouter.route("/sign-up").post(signUp);
authRouter.route("/sign-in").post(signIn);
authRouter.route("/google").post(google);
authRouter.route("/signOut").post(signOut);

export default authRouter;

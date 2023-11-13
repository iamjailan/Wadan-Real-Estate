import express from "express";
import { signIn, signUp } from "../controllers/User.js";

const authRouter = express.Router();

authRouter.route("/sign-up").post(signUp);
authRouter.route("/sign-in").post(signIn);

export default authRouter;

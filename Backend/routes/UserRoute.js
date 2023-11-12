import express from "express";
import { signIn } from "../controllers/User.js";

const userRouter = express.Router();

userRouter.route("/sign-in").post(signIn);

export default userRouter;

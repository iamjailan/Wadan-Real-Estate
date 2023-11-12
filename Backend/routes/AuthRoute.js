import express from "express";
import { signUp } from "../controllers/User.js";

const authRouter = express.Router();

authRouter.route("/sign-up").post(signUp);

export default authRouter;

import express from "express";
import { test, updateUser } from "../controllers/UserInfo.js";
import { verifyToken } from "../utils/VerifyUser.js";

const userRouter = express.Router();

userRouter.route("/test").post(test);
userRouter.post("/update/:id", verifyToken, updateUser);

export default userRouter;

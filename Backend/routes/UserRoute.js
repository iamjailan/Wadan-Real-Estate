import express from "express";
import { test, updateUser } from "../controllers/UserInfo.js";

const userRouter = express.Router();

userRouter.route("/test").post(test);
userRouter.post("/update/:id", updateUser);

export default userRouter;

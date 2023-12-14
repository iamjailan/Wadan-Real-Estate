import express from "express";
import {
  test,
  updateUser,
  deleteUser,
  getUserListing,
  getUser,
} from "../controllers/UserInfo.js";
import { verifyToken } from "../utils/VerifyUser.js";

const userRouter = express.Router();

userRouter.route("/test").post(test);
userRouter.post("/update/:id", verifyToken, updateUser);
userRouter.delete("/delete/:id", verifyToken, deleteUser);
userRouter.get("/listings/:id", verifyToken, getUserListing);
userRouter.get("/:id", verifyToken, getUser);

export default userRouter;

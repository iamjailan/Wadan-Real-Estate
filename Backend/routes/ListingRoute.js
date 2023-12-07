import express from "express";
import { createList, deleteList } from "../controllers/ListingCont.js";
import { verifyToken } from "../utils/VerifyUser.js";

const listingRouter = express.Router();

listingRouter.route("/create").post(verifyToken, createList);
listingRouter.route("/delete/:id").delete(verifyToken, deleteList);

export default listingRouter;

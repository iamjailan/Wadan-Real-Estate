import express from "express";
import { createList } from "../controllers/ListingCont.js";
import { verifyToken } from "../utils/VerifyUser.js";

const listingRouter = express.Router();

listingRouter.route("/create").post(verifyToken, createList);

export default listingRouter;

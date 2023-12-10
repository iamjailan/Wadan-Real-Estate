import express from "express";
import {
  createList,
  deleteList,
  updateListing,
  getListing,
} from "../controllers/ListingCont.js";
import { verifyToken } from "../utils/VerifyUser.js";

const listingRouter = express.Router();

listingRouter.route("/create").post(verifyToken, createList);
listingRouter.route("/delete/:id").delete(verifyToken, deleteList);
listingRouter.route("/update/:id").post(verifyToken, updateListing);
listingRouter.route("/get/:id").get(getListing);

export default listingRouter;

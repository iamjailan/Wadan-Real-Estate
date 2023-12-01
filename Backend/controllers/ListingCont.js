import Listing from "../models/ListingModel.js";

export const createList = async (req, res, next) => {
  try {
    const listing = await Listing.create(req.body);
    return res
      .status(201)
      .json({ success: true, message: "List Created successfully", listing });
  } catch (error) {
    next(error);
  }
};

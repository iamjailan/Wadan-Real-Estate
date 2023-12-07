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

export const deleteList = async (req, res, next) => {
  const listId = await Listing.findById(req.params.id);

  if (!listId) {
    return next(404, "Listing Not found");
  }

  if (req.user.id !== listId.userRef) {
    return next(401, "You are not allowed for this action");
  }

  try {
    await Listing.findByIdAndDelete(req.params.id);
  } catch (error) {
    next(error);
  }
};

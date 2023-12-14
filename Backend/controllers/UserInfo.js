import Listing from "../models/ListingModel.js";
import User from "../models/UserModel.js";
import { errorHandler } from "../utils/error.js";
import bcryptjs from "bcryptjs";

export const updateUser = async (req, res, next) => {
  if (req.user.id !== req.params.id)
    return next(errorHandler(401, "You can only update your account!"));

  try {
    if (req.body.password) {
      req.body.password = bcryptjs.hashSync(req.body.password, 10);
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          username: req.body.username,
          email: req.body.email,
          password: req.body.password,
          avatar: req.body.avatar,
        },
      },
      { new: true }
    );

    const { password, ...rest } = updatedUser._doc;
    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};
export const test = (req, res, next) => {
  res.send("Test");
};

export const deleteUser = async (req, res, next) => {
  if (req.user.id !== req.params.id)
    return next(errorHandler(401, "You not allowed for this action"));
  try {
    await User.findByIdAndDelete(req.params.id);
    res.clearCookie("access_token");

    res.status(200).json({ message: "User Deleted", data: req.body });
  } catch (error) {
    next(error);
  }
};

export const getUserListing = async (req, res, next) => {
  if (req.user.id === req.params.id) {
    try {
      const listing = await Listing.find({ userRef: req.params.id });
      res.status(201).json(listing);
    } catch (error) {
      next(error);
    }
  } else {
    return next(errorHandler(401, "You can only see your own listing!"));
  }
};

export const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return next(errorHandler(401, "user not found!"));
    }

    const { password: pass, ...rest } = user._doc;
    res.status(201).json(rest);
  } catch (error) {
    next(error);
  }
};

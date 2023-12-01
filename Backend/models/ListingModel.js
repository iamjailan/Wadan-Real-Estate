import mongoose from "mongoose";

const ListSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please Provide the list name!"],
    },
    description: {
      type: String,
      required: [true, "Please provide list description"],
    },
    address: {
      type: String,
      required: [true, "Please provide list Address"],
    },
    regularPrice: {
      type: Number,
      required: [true, "Please provide list Prices"],
    },
    discountPrice: {
      type: Number,
      required: [true, "Please provide list Discount Price"],
    },
    bathrooms: {
      type: Number,
      required: [true, "Please provide Numbers of Bathrooms"],
    },
    bedrooms: {
      type: Number,
      required: [true, "Please provide Numbers of Bedrooms"],
    },
    furnished: {
      type: Boolean,
      required: [true, "Please specify that is furnished"],
    },
    parking: {
      type: Boolean,
      required: true,
    },
    type: {
      type: Boolean,
      required: true,
    },
    offer: {
      type: Boolean,
      required: true,
    },
    imageUrl: {
      type: Array,
      required: true,
    },
    userRef: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Listing = mongoose.model("Listing", ListSchema);

export default Listing;

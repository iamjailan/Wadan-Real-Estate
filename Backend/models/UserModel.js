import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Please provide a name!"],
      unique: true,
    },
    email: {
      type: String,
      required: [true, "Please provide e-mail!"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Please provide a password"],
    },
    avatar: {
      type: String,
      default:
        "https://static-00.iconduck.com/assets.00/profile-circle-icon-2048x2048-cqe5466q.png",
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", UserSchema);

export default User;

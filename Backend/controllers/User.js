import User from "../models/UserModel.js";
import bcryptjs from "bcryptjs";

const signUp = async (req, res, next) => {
  const { email, password, username } = req.body;
  const hashedPassword = await bcryptjs.hashSync(password, 10);
  const newUser = new User({ username, email, password: hashedPassword });
  try {
    await newUser.save();
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    next(error);
  }
};

const signIn = (req, res) => {
  res.json({ msg: "login User Routes" });
};

export { signIn, signUp };

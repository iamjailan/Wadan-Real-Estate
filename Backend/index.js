import express from "express";
import connectDB from "./db/connect.js";
// import dotenv from "dotenv";
// dotenv.config();
import authRouter from "./routes/User.js";

const app = express();
app.use(express.json());
const PORT = 3579;

// middleware of app
app.use("/api/auth", authRouter);

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(PORT, console.log(`Server is running on ${PORT}`));
  } catch (error) {
    console.log(error);
  }
};

start();

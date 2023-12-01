import express from "express";
import connectDB from "./db/connect.js";
import dotenv from "dotenv";
dotenv.config();
import authRouter from "./routes/AuthRoute.js";
import userRouter from "./routes/UserRoute.js";
import cookieParser from "cookie-parser";
import listingRouter from "./routes/ListingRoute.js";

const app = express();
app.use(express.json());
app.use(cookieParser());
const PORT = 3579;

// middleware of app
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/listing", listingRouter);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal server error";
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(
      PORT,
      console.log(`Server is running on ${PORT}, and connected to DB.`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();

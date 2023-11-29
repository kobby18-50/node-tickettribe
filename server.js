import express from "express";
import dotenv from "dotenv";
import cors from "cors";

// other packages
import morgan from "morgan";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import { v2 as cloudinary } from "cloudinary";

dotenv.config();
import "express-async-errors";
import connectDB from "./db/connect.js";

// cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

const app = express();

// middleware imports
import notFoundMiddleWare from "./middleware/not-found.js";
import errorHandlerMiddleWare from "./middleware/error-handler.js";

// routes imports
import authRouter from "./routes/authRoutes.js";
import userRouter from "./routes/userRoutes.js";
import eventRouter from "./routes/eventRoutes.js";
import ticketRouter from "./routes/ticketRoutes.js";
import attendantsRouter from "./routes/attendantsRoutes.js";

//Enable CORS
app.use(cors());

app.use(morgan("tiny"));

// static file
app.use(express.static("./public"));

// express.json
app.use(express.json());

// express file upload
app.use(fileUpload({ useTempFiles: true }));

// cookie parser
app.use(cookieParser(process.env.JWT_SECRET));

// routes

// auth route
app.use("/api/v1/auth", authRouter);

// user route
app.use("/api/v1/user", userRouter);

// event route
app.use("/api/v1/events", eventRouter);

// ticket route
app.use("/api/v1/tickets", ticketRouter);

// attendant route
app.use("/api/v1/attendants", attendantsRouter);

// middleware
app.use(notFoundMiddleWare);
app.use(errorHandlerMiddleWare);

const port = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => {
      console.log(`Server listening on port ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();

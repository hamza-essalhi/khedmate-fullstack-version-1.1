import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from 'cors'; // Import the CORS middleware
//imported routes
import authRoute from "./routes/authRoute.js";
import userRoute from "./routes/userRoute.js";
import jobRoute from "./routes/jobRoute.js";
import jobApplicationRoute from "./routes/jobApplicationRoute.js";
import conversationRoute from "./routes/conversationRoute.js";
import messageRoute from "./routes/messageRoute.js";
import employeeRoute from "./routes/employeeRoute.js";
import { error } from "./controllers/errorController.js";

dotenv.config();//Configs
const app = express();
const port = 9000;
mongoose.set("strictQuery", true);// Db connection
try {
  await mongoose.connect(process.env.DBCONNECTION);
  console.log("Yes DB is connected");
} catch (error) {
  console.error(error);
}

const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true, // Allow credentials
};

app.use(cors(corsOptions));// Use the CORS middleware to allow requests from all origins
//Middleware
app.use(express.json());
app.use(cookieParser());

//Routes
app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/employee", employeeRoute);
app.use("/api/conversation", conversationRoute);
app.use("/api/message", messageRoute);
app.use("/api/job", jobRoute);
app.use("/api/jobApplication", jobApplicationRoute);
//Errors
app.use(error);

app.listen(port, () => {
  console.log(`The server is runing on  http://localhost:${port}`);
});

import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoute from "./routes/user.route.js";
import gigRoute from "./routes/gig.route.js";
import orderRoute from "./routes/order.route.js";
import conversationRoute from "./routes/conversation.route.js";
import messageRoute from "./routes/message.route.js";
import reviewRoute from "./routes/review.route.js";
import courseRoute from "./routes/course.route.js";
import enrollmentRoute from "./routes/enrollment.route.js";

import authRoute from "./routes/auth.route.js";
import cookieParser from "cookie-parser";
import cors from "cors";

dotenv.config();
const app = express();
mongoose.set("strictQuery", true);

// Comma separated list, e.g. CLIENT_URL=http://localhost:5173,https://uraan-pink.vercel.app
const allowedOrigins = (process.env.CLIENT_URL || "http://localhost:5173")
   .split(",")
   .map((origin) => origin.trim().replace(/\/$/, ""))
   .filter(Boolean);

app.use(cors({ origin: allowedOrigins, credentials: true }));
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/gigs", gigRoute);
app.use("/api/orders", orderRoute);
app.use("/api/messages", messageRoute);
app.use("/api/conversations", conversationRoute);
app.use("/api/reviews", reviewRoute);
app.use("/api/courses", courseRoute);
app.use("/api/enrollments", enrollmentRoute);

app.use("/api", (req, res) => {
   res.status(404).send({ success: false, status: 404, message: "Route not found!" });
});

app.use((err, req, res, next) => {
   let status = err.status || 500;
   let message = err.message || "Something went wrong!!";

   // Turn common database errors into readable messages
   if (err.name === "ValidationError") {
      status = 400;
      message = Object.values(err.errors)
         .map((e) =>
            e.kind === "required" ? `${e.path} is required` : e.message
         )
         .join(", ");
   } else if (err.name === "CastError") {
      status = 400;
      message = `Invalid value for ${err.path}`;
   } else if (err.code === 11000) {
      status = 409;
      message = `${Object.keys(err.keyValue || {}).join(", ") || "Value"} already exists!`;
   }

   if (status >= 500) console.error(err);
   return res.status(status).send({ success: false, status, message });
});

const PORT = process.env.PORT || 8800;

const start = async () => {
   if (!process.env.MONGO || !process.env.JWT_KEY) {
      console.error("MONGO and JWT_KEY must be set in api/.env");
      process.exit(1);
   }
   try {
      await mongoose.connect(process.env.MONGO);
      console.log("Database connected!");
   } catch (error) {
      console.error("Database connection failed:", error.message);
      process.exit(1);
   }
   app.listen(PORT, () => {
      console.log(`Backend running on port ${PORT}!`);
   });
};

start();

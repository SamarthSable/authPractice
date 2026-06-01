import express from "express";
import dotenv from "dotenv";
import connectDB from "./db/db.js";
import loginRouter from "./routes/authRoutes.js";
import cookieParser from "cookie-parser";
import cors from "cors";
dotenv.config();

const app = express();
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);
connectDB();
app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("Welcome to Auth Project");
});
app.use("/api/auth", loginRouter);
app.listen(process.env.PORT, () => {
  console.log("app is Running on Port " + process.env.PORT);
});

import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./db/connectDB.js";
import authRoutes from "./routes/auth.route.js";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();

app.listen(process.env.PORT, () => {
  connectDB();
  console.log("Server listening on port 5000");
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use(express.json()); //allow us to parse incoming requests:req.body

app.use(express.static("public")); // serve static files from public folder

app.use(cookieParser()); // allow us to parse incoming cookies

app.use("/api/auth", authRoutes);

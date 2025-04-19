import "./db/index.js";
import express, { json } from "express";
import cors from "cors";
import { errorHandler } from "./utils/errorHandler.js";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/userRoutes.js";
import leaderboardRoutes from "./routes/leaderboardRoutes.js"
import { config } from "dotenv";
config();

const app = express();
const PORT = process.env.PORT;

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
  json({ limit: "50mb" }),
  cookieParser()
);



// Routes
app.use("/users", userRoutes);
app.use("/leaderboard", leaderboardRoutes);


app.get("/", (req, res) => {
  res.send("Server is running!");
});

app.use(/.*/, (req, res, next) => {
  res.status(404).json({ message: "Not Found" });
  next();
});

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

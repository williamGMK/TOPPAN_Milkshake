import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import drinkRouter from "./routes/drinkRoute.js";
import userRouter from "./routes/userRoute.js";
import "dotenv/config";

const app = express();
const port = 4000;

app.use(express.json());
app.use(cors());

// Serve uploaded images
app.use("/images", express.static("uploads"));
app.use("/api/user", userRouter);

// DB
connectDB();

// Routes
app.use("/api/drink", drinkRouter);

app.get("/", (req, res) => {
  res.send("API Working");
});

app.listen(port, () => {
  console.log(`Server Started on http://localhost:${port}`);
});

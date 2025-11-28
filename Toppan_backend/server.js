import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import drinkRouter from "./routes/drinkRoute.js";

const app = express();
const port = 4000;

// middleware
app.use(express.json());
app.use(cors());

// database
connectDB();

// routes
app.use("/api/drink", drinkRouter);

app.get("/", (req, res) => {
  res.send("API Working");
});

app.listen(port, () => {
  console.log(`Server Started on http://localhost:${port}`);
});

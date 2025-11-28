import express from "express";
import { addDrink } from "../controllers/drinkControllers.js";
import multer from "multer";

const drinkRouter = express.Router();

// Multer storage
const storage = multer.diskStorage({
  destination: "uploads",
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

// Route: POST /api/drink/add
drinkRouter.post("/add", upload.single("image"), addDrink);

export default drinkRouter;

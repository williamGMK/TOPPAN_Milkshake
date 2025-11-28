import mongoose from "mongoose";

const drinkSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: true },
  category: { type: String, required: true },
});

const drinkModel =
  mongoose.models.drink || mongoose.model("drink", drinkSchema);

export default drinkModel;

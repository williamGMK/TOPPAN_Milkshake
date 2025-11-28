import drinkModel from "../models/drinkModel.js";
import fs from "fs";

// add drink
const addDrink = async (req, res) => {
  try {
    const image_filename = req.file.filename;

    const drink = new drinkModel({
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      category: req.body.category,
      image: image_filename,
    });

    await drink.save();

    res.json({ success: true, message: "Drink Added" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error adding drink" });
  }
};

export { addDrink };

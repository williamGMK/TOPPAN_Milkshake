import drinkModel from "../models/drinkModel.js";
import fs from "fs";

// add drink item
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

// all drink list
const listDrink = async (req, res) => {
  try {
    const drinks = await drinkModel.find({});
    res.json({ success: true, data: drinks });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error Accured" });
  }
};

/* remove drink item
const removeDrink = async (req, res) => {
  try {
    const drink = await drinkModel.findById(req.body.id);
    fs.unlink(`uploads/${drink.image}`, () => {});

    await drinkModel.findByIdAndDelete(req.body.id);
    res.json({ success: true, message: "Drink Removed" });
  } catch (error) {
    console.log(error);
    res.json({ success: "false", message: "Error Accured" });
  }
};*/

const removeDrink = async (req, res) => {
  try {
    const drink = await drinkModel.findById(req.body.id);

    // Check if drink exists
    if (!drink) {
      return res.status(404).json({
        success: false,
        message: "Drink not found",
      });
    }

    // Delete image if it exists
    const imagePath = `uploads/${drink.image}`;
    if (fs.existsSync(imagePath)) {
      fs.unlinkSync(imagePath);
    }

    // Delete drink from database
    await drinkModel.findByIdAndDelete(req.body.id);

    res.json({
      success: true,
      message: "Drink Removed",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error occurred",
    });
  }
};

export { addDrink, listDrink, removeDrink };

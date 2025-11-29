import bodyParser from "body-parser";
const { json } = bodyParser;
import userModel from "../models/userModel.js";

// add items to user cart
const addToCart = async (req, res) => {
  try {
    // req.body.userId now contains ONLY the ObjectId string thanks to the fix in middleware
    let userData = await userModel.findById(req.body.userId);

    if (!userData) {
      return res.json({ success: false, message: "User not found" });
    }

    let cartData = userData.cartData; // no need for await

    if (!cartData[req.body.itemId]) {
      cartData[req.body.itemId] = 1;
    } else {
      cartData[req.body.itemId] += 1;
    }

    await userModel.findByIdAndUpdate(req.body.userId, { cartData });

    res.json({ success: true, message: "Added To Cart" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error Occurred" });
  }
};

// remove items from user cart
const removeFromCart = async (req, res) => {
  try {
    let userData = await userModel.findById(req.body.userId);

    if (!userData) {
      return res.json({ success: false, message: "User not found" });
    }

    let cartData = userData.cartData;

    if (cartData[req.body.itemId] > 0) {
      cartData[req.body.itemId] -= 1;
      if (cartData[req.body.itemId] === 0) {
        delete cartData[req.body.itemId];
      }
    }

    await userModel.findByIdAndUpdate(req.body.userId, { cartData });

    res.json({ success: true, message: "Removed From Cart" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error Occurred" });
  }
};

// fetch user cart data
const getCart = async (req, res) => {
  try {
    let userData = await userModel.findById(req.body.userId);

    if (!userData) {
      return res.json({ success: false, message: "User not found" });
    }

    res.json({ success: true, data: userData.cartData });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error Occurred" });
  }
};

export { addToCart, removeFromCart, getCart };

/*import userModel from "../models/userModel.js";

// ADD item to user cart
const addToCart = async (req, res) => {
  try {
    // Get user ID from token (auth middleware)
    const userId = req.user.id; // FIXED

    const { itemId } = req.body;

    if (!itemId) {
      return res
        .status(400)
        .json({ success: false, message: "itemId missing" });
    }

    // Find user
    const user = await userModel.findById(userId);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    let cartData = user.cartData;

    // Add or increment item
    if (!cartData[itemId]) {
      cartData[itemId] = 1;
    } else {
      cartData[itemId] += 1;
    }

    await userModel.findByIdAndUpdate(userId, { cartData });

    res.json({ success: true, message: "Added To Cart" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error Occurred", error });
  }
};

// REMOVE item from user cart
const removeFromCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const { itemId } = req.body;

    const user = await userModel.findById(userId);
    let cartData = user.cartData;

    if (cartData[itemId] > 0) {
      cartData[itemId] -= 1;
    }

    await userModel.findByIdAndUpdate(userId, { cartData });

    res.json({ success: true, message: "Removed from cart" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error Occurred" });
  }
};

// GET Cart Data
const getCart = async (req, res) => {
  try {
    const userId = req.user.id;

    const user = await userModel.findById(userId);

    res.json({ success: true, cartData: user.cartData });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error Occurred" });
  }
};

export { addToCart, removeFromCart, getCart };*/

import mongoose from "mongoose";

export const connectDB = async () => {
  await mongoose
    .connect(
      "mongodb+srv://toppanstack:77889944@cluster0.65y2v6a.mongodb.net/toppan_test"
    )
    .then(() => console.log("Database Connected"));
};

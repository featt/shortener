import mongoose from "mongoose";
import "dotenv/config";

const connectDB = async () => {
  const dbUrl = process.env.DB_URL;
  try {
    await mongoose.connect(dbUrl, {
      useNewURLParser: true,
    });
    console.log("Connected to DB");
  } catch (err) {
    console.error(err.message);
  }
};

export default connectDB;

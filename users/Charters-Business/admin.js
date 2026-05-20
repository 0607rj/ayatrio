import mongoose from "mongoose";
import User from "./models/User.js"; // Adjust path and extension
import dotenv from "dotenv";

dotenv.config();

const createAdmin = async () => {
  try {
    // 1. Connect to Atlas
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB...");

    // 2. Create the Admin
    const admin = await User.create({
      name: "Mirza Jabir",
      email: "mirzajabir129@gmail.com",
      password: "142200",
      role: "admin",
      isFirstLogin: false,
      status: "active"
    });

    console.log("Admin created successfully ID:", admin._id);
    process.exit(0);
  } catch (error) {
    console.error("Error:", error.message);
    process.exit(1);
  }
};

createAdmin();
import mongoose from "mongoose";
import "./src/config/loadEnv.js";
import connectDB from "./src/config/database.js";
import User from "./src/models/User.model.js";

const run = async () => {
  await connectDB();
  
  const adminPhone = "+911234567890";
  const adminEmail = "admin@chartersbusiness.com";
  const adminPassword = "SecureAdmin123!";

  console.log("Cleaning up old admin records if any...");
  // Delete any existing user with this phone or email to start fresh
  await User.deleteMany({
    $or: [
      { phoneNumber: adminPhone },
      { email: adminEmail }
    ]
  });

  console.log(`Seeding Admin user: Phone: ${adminPhone}, Email: ${adminEmail}...`);
  const admin = await User.create({
    name: "System Admin",
    email: adminEmail,
    phoneNumber: adminPhone,
    password: adminPassword,
    role: "admin",
    isFirstLogin: false,
    status: "active"
  });

  console.log("Admin seeded successfully!");

  const users = await User.find({});
  console.log("CURRENT USERS IN DATABASE:");
  users.forEach(u => {
    console.log(`- ID: ${u._id}, Phone: ${u.phoneNumber}, Role: ${u.role}, Email: ${u.email}`);
  });
  
  mongoose.disconnect();
};

run().catch(console.error);

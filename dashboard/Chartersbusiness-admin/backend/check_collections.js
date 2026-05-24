const mongoose = require('mongoose');
require('dotenv').config();
const connectDB = require('./config/database');
const Admin = require('./models/Admin');
const UserModelRaw = require('./models/User.model');
const UserModel = UserModelRaw.default || UserModelRaw;

const run = async () => {
  await connectDB();
  const email = "admin@chartersbusiness.com";

  console.log("Checking Admin collection...");
  const adminDocs = await Admin.find({ email });
  console.log(`Found ${adminDocs.length} in Admin collection:`);
  adminDocs.forEach(d => {
    console.log(`- ID: ${d._id}, Email: ${d.email}, Role: ${d.role}, Name: ${d.firstName} ${d.lastName}, IsActive: ${d.isActive}`);
  });

  console.log("Checking User collection...");
  const userDocs = await UserModel.find({ email });
  console.log(`Found ${userDocs.length} in User collection:`);
  userDocs.forEach(d => {
    console.log(`- ID: ${d._id}, Email: ${d.email}, Role: ${d.role}, Name: ${d.name}, IsActive: ${d.isActive}, Status: ${d.status}`);
  });

  mongoose.disconnect();
};

run().catch(console.error);

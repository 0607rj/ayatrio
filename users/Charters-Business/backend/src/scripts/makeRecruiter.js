import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../models/User.model.js';
import connectDB from '../config/database.js';

dotenv.config();

const makeRecruiter = async () => {
  try {
    await connectDB();

    // Change this email to the user you want to make recruiter
    const userEmail = 'shedule@gmail.com';

    const user = await User.findOne({ email: userEmail });

    if (!user) {
      console.log('❌ User not found with email:', userEmail);
      process.exit(1);
    }

    user.role = 'recruiter';
    await user.save();

    console.log('✅ User updated to recruiter!');
    console.log('📧 Email:', user.email);
    console.log('👤 Name:', user.name);
    console.log('🎭 Role:', user.role);

    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
};

makeRecruiter();

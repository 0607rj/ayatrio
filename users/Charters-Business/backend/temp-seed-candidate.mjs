import connectDB from './src/config/database.js';
import User from './src/models/User.model.js';

await connectDB();
let user = await User.findOne({ email: 'candidate.flow@test.com' });
if (!user) {
  user = await User.create({
    name: 'Candidate Flow',
    email: 'candidate.flow@test.com',
    password: 'Candidate@123',
    role: 'user',
    isFirstLogin: false,
    status: 'active',
  });
}
console.log(String(user._id));
process.exit(0);

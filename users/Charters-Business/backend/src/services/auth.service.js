import User from '../models/User.model.js';
import ApiError from '../utils/ApiError.js';
import jwt from 'jsonwebtoken';

class AuthService {
  // Generate JWT token
  generateToken(id) {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRE,
    });
  }

  // Register user
  async register(userData) {
    const { name, email, password } = userData;

    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new ApiError(400, 'User already exists');
    }

    // Create user
    const user = await User.create({ name, email, password });

    // Generate token
    const token = this.generateToken(user._id);

    return {
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      token,
    };
  }

  // Login user
  async login(email, password) {
    // Check if user exists
    const user = await User.findOne({ email }).select('+password');

    if (!user || !(await user.comparePassword(password))) {
      throw new ApiError(401, 'Invalid credentials');
    }

    // Check if user is active
    if ((user.status && user.status !== 'active') || (!user.status && !user.isActive)) {
      throw new ApiError(401, 'Your account has been deactivated');
    }

    // Generate token
    const token = this.generateToken(user._id);

    return {
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      token,
    };
  }

  // Get user profile
  async getProfile(userId) {
    const user = await User.findById(userId).select('-password');

    if (!user) {
      throw new ApiError(404, 'User not found');
    }

    return user;
  }
}

export default new AuthService();

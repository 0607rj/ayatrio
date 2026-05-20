import User from '../models/User.model.js';
import ApiError from '../utils/ApiError.js';

class UserService {
  // Get all users
  async getAllUsers(filters = {}) {
    const users = await User.find(filters).select('-password');
    return users;
  }

  // Get user by ID
  async getUserById(userId) {
    const user = await User.findById(userId).select('-password');
    
    if (!user) {
      throw new ApiError(404, 'User not found');
    }
    
    return user;
  }

  // Update user
  async updateUser(userId, updateData) {
    const user = await User.findByIdAndUpdate(
      userId,
      updateData,
      { new: true, runValidators: true }
    ).select('-password');
    
    if (!user) {
      throw new ApiError(404, 'User not found');
    }
    
    return user;
  }

  // Delete user
  async deleteUser(userId) {
    const user = await User.findByIdAndDelete(userId);
    
    if (!user) {
      throw new ApiError(404, 'User not found');
    }
    
    return user;
  }
}

export default new UserService();

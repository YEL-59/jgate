/**
 * User Controller
 * Business logic for user management
 */

import { userService } from '@/services/user.service';

export const userController = {
  /**
   * Get all users
   */
  async getAllUsers() {
    try {
      return await userService.getAllUsers();
    } catch (error) {
      console.error('Error fetching users:', error);
      throw error;
    }
  },

  /**
   * Get pending director approvals
   */
  async getPendingDirectorApprovals() {
    try {
      return await userService.getPendingDirectorApprovals();
    } catch (error) {
      console.error('Error fetching pending approvals:', error);
      throw error;
    }
  },
};


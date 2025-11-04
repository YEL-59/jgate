/**
 * Sub-Admin Controller
 * Business logic for sub-admin management
 */

import { subAdminService } from '@/services/subadmin.service';

export const subAdminController = {
  /**
   * Get all sub-admins
   */
  async getAllSubAdmins() {
    try {
      return await subAdminService.getAllSubAdmins();
    } catch (error) {
      console.error('Error fetching sub-admins:', error);
      throw error;
    }
  },

  /**
   * Get available permissions
   */
  getAvailablePermissions() {
    return subAdminService.getAvailablePermissions();
  },
};


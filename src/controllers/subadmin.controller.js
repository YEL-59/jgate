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
  async getAvailablePermissions() {
    try {
      return await subAdminService.getAvailablePermissions();
    } catch (error) {
      console.error('Error fetching permissions:', error);
      throw error;
    }
  },

  /**
   * Get available roles
   */
  getAvailableRoles() {
    return subAdminService.getAvailableRoles();
  },

  /**
   * Create a sub-admin
   */
  async createSubAdmin(data) {
    try {
      return await subAdminService.createSubAdmin(data);
    } catch (error) {
      console.error('Error creating sub-admin:', error);
      throw error;
    }
  },

  /**
   * Toggle sub-admin status
   */
  async toggleStatus(id) {
    try {
      return await subAdminService.toggleStatus(id);
    } catch (error) {
      console.error('Error toggling status:', error);
      throw error;
    }
  },

  /**
   * Update sub-admin name, status, and permissions
   */
  async updateSubAdmin(id, data) {
    try {
      return await subAdminService.updateSubAdmin(id, data);
    } catch (error) {
      console.error('Error updating sub-admin:', error);
      throw error;
    }
  },

  /**
   * Delete sub-admin
   */
  async deleteSubAdmin(id) {
    try {
      return await subAdminService.deleteSubAdmin(id);
    } catch (error) {
      console.error('Error deleting sub-admin:', error);
      throw error;
    }
  },

  /**
   * Get single sub-admin details
   */
  async getSubAdminDetails(id) {
    try {
      return await subAdminService.getSubAdminDetails(id);
    } catch (error) {
      console.error('Error fetching sub-admin details:', error);
      throw error;
    }
  },
};


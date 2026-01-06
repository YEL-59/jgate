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
   * Update sub-admin permissions
   */
  async updatePermissions(id, permissions) {
    try {
      return await subAdminService.updatePermissions(id, permissions);
    } catch (error) {
      console.error('Error updating permissions:', error);
      throw error;
    }
  },

  /**
   * Update sub-admin roles
   */
  async updateRoles(id, roles) {
    try {
      return await subAdminService.updateRoles(id, roles);
    } catch (error) {
      console.error('Error updating roles:', error);
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
};


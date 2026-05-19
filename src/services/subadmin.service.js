/**
 * Sub-Admin Service
 * Handles data fetching for sub-admin management
 */

import {
  getSubAdmins,
  createSubAdmin,
  updateSubAdminStatus,
  deleteSubAdmin,
  getSubAdminDetails,
  getAvailablePermissions,
  updateSubAdmin
} from "./dashboard/subadmin";

export const subAdminService = {
  /**
   * Get all sub-admins
   */
  async getAllSubAdmins() {
    const token = localStorage.getItem("token");
    const response = await getSubAdmins(token);
    if (response && response.success) {
      return response.data;
    }
    return [];
  },

  /**
   * Create a new sub-admin
   */
  async createSubAdmin(data) {
    const token = localStorage.getItem("token");
    return await createSubAdmin(token, data);
  },

  /**
   * Toggle sub-admin status
   */
  async toggleStatus(id) {
    const token = localStorage.getItem("token");
    return await updateSubAdminStatus(token, id);
  },

  /**
   * Update sub-admin name, status, and permissions
   */
  async updateSubAdmin(id, data) {
    const token = localStorage.getItem("token");
    return await updateSubAdmin(token, id, data);
  },

  /**
   * Delete sub-admin
   */
  async deleteSubAdmin(id) {
    const token = localStorage.getItem("token");
    return await deleteSubAdmin(token, id);
  },

  /**
   * Get single sub-admin details
   */
  async getSubAdminDetails(id) {
    const token = localStorage.getItem("token");
    const response = await getSubAdminDetails(token, id);
    if (response && response.success) {
      return response.data;
    }
    return null;
  },

  /**
   * Get all available permissions from database
   */
  async getAvailablePermissions() {
    const token = localStorage.getItem("token");
    const response = await getAvailablePermissions(token);
    if (response && response.success) {
      return response.data;
    }
    return [];
  },

  /**
   * Get all available roles (Mock since no API was provided for fetching roles specifically)
   */
  getAvailableRoles() {
    return [
      { id: 4, name: "manager" },
      { id: 6, name: "content maneger" },
      { id: 7, name: "writer" }
    ];
  }
};


/**
 * Sub-Admin Service
 * Handles data fetching for sub-admin management
 */

import {
  getSubAdmins,
  createSubAdmin,
  updateSubAdminStatus,
  updateSubAdminPermissions,
  updateSubAdminRoles,
  deleteSubAdmin
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
   * Update sub-admin permissions
   */
  async updatePermissions(id, permissions) {
    const token = localStorage.getItem("token");
    return await updateSubAdminPermissions(token, id, permissions);
  },

  /**
   * Update sub-admin roles
   */
  async updateRoles(id, roles) {
    const token = localStorage.getItem("token");
    return await updateSubAdminRoles(token, id, roles);
  },

  /**
   * Delete sub-admin
   */
  async deleteSubAdmin(id) {
    const token = localStorage.getItem("token");
    return await deleteSubAdmin(token, id);
  },

  /**
   * Get all available permissions
   */
  getAvailablePermissions() {
    return [
      'Total.User.View',
      'Total.Project.View',
      'Total.Scenes.View',
      'Total.Audition.View',
      'User.View',
      'Project.View',
      'Project.Edit',
      'Project.Delete',
      'Scene.View',
      'Scene.Delete',
      'Send.Notification',
      'Static.Content.Management',
      'Category.View',
      'Category.Edit',
      'Category.Delete',
      'Category.Create',
      'Movie.Library.View',
      'Movie.Library.Edit',
      'Movie.Library.Delete',
      'Movie.Library.Create',
    ].map(p => ({ id: p, label: p }));
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


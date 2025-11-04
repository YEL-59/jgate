/**
 * Sub-Admin Service
 * Handles data fetching for sub-admin management
 */

export const subAdminService = {
  /**
   * Get all sub-admins
   */
  async getAllSubAdmins() {
    // Simulate API call
    return [
      {
        id: 'SA001',
        name: 'Alice Johnson',
        email: 'alice@admin.com',
        role: 'Content Moderator',
        permissions: ['view_users', 'manage_content'],
        lastLogin: '2024-10-05 09:30',
        status: 'Active',
      },
      {
        id: 'SA002',
        name: 'Bob Miller',
        email: 'bob@admin.com',
        role: 'Finance Manager',
        permissions: ['view_analytics', 'manage_billing'],
        lastLogin: '2024-10-04 14:15',
        status: 'Active',
      },
      {
        id: 'SA003',
        name: 'Carol White',
        email: 'carol@admin.com',
        role: 'User Support',
        permissions: ['view_users', 'manage_users'],
        lastLogin: '2024-09-28 11:20',
        status: 'Inactive',
      },
    ];
  },

  /**
   * Get all available permissions
   */
  getAvailablePermissions() {
    return [
      { id: 'view_users', label: 'View Users' },
      { id: 'manage_users', label: 'Manage Users' },
      { id: 'view_content', label: 'View Content' },
      { id: 'manage_content', label: 'Manage Content' },
      { id: 'view_analytics', label: 'View Analytics' },
      { id: 'manage_billing', label: 'Manage Billing' },
      { id: 'view_reports', label: 'View Reports' },
      { id: 'send_notifications', label: 'Send Notifications' },
    ];
  },
};


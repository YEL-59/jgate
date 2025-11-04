/**
 * User Service
 * Handles data fetching for user management
 */

export const userService = {
  /**
   * Get all users
   */
  async getAllUsers() {
    // Simulate API call
    return [
      { id: 'USER1', name: 'John Smith', email: 'john@example.com', role: 'Actor', status: 'Active', created: '2024-01-15' },
      { id: 'USER2', name: 'Emma Wilson', email: 'emma@example.com', role: 'Creator', status: 'Active', created: '2024-02-20' },
      { id: 'USER3', name: 'Michael Brown', email: 'michael@example.com', role: 'Admin', status: 'Active', created: '2024-03-10' },
      { id: 'USER4', name: 'Sarah Davis', email: 'sarah@example.com', role: 'Director', status: 'Pending', created: '2024-09-25' },
      { id: 'USER5', name: 'David Lee', email: 'david@example.com', role: 'Actor', status: 'Inactive', created: '2024-10-01' },
      { id: 'USER6', name: 'Lisa Anderson', email: 'lisa@example.com', role: 'Creator', status: 'Active', created: '2024-08-12' },
    ];
  },

  /**
   * Get pending director approvals
   */
  async getPendingDirectorApprovals() {
    // Simulate API call
    return [
      { id: 'U004', name: 'Sarah Davis', email: 'sarah@example.com', created: '2024-09-26' },
      { id: 'U005', name: 'David Lee', email: 'david@example.com', created: '2024-10-01' },
    ];
  },
};


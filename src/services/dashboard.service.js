/**
 * Dashboard Service
 * Handles data fetching for dashboard metrics and charts
 */

import { useDashboard } from "./dashboard/dashboard";

/**
 * Mock data service - Replace with actual API calls here i call the api useDashboard
 * and pass the token to it
 */


export const dashboardService = {
  /**
   * Get dashboard metrics
   */
  async getMetrics() {
    // Simulate API call

    const token = localStorage.getItem("token")
    const res = await useDashboard(token)
    console.log(res)
    return res
  },

  /**
   * Get user and project growth data
   */
  async getUserProjectGrowth() {
    return {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
      datasets: [
        {
          label: 'Users',
          data: [1200, 1300, 1400, 1500, 1450, 1600],
          color: '#6D28D9',
        },
        {
          label: 'Projects',
          data: [180, 190, 200, 210, 205, 220],
          color: '#9333EA',
        },
      ],
    };
  },

  /**
   * Get project status distribution
   */
  async getProjectStatusDistribution() {
    return {
      total: 100,
      published: 50,
      draft: 20,
      closed: 15,
      percentages: {
        published: 50,
        draft: 20,
        closed: 15,
      },
    };
  },
};


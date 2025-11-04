/**
 * Dashboard Service
 * Handles data fetching for dashboard metrics and charts
 */

/**
 * Mock data service - Replace with actual API calls
 */
export const dashboardService = {
  /**
   * Get dashboard metrics
   */
  async getMetrics() {
    // Simulate API call
    return {
      totalUsers: {
        value: 1247,
        change: 12.5,
        isPositive: true,
      },
      totalProjects: {
        value: 216,
        change: 8.3,
        isPositive: true,
      },
      totalScenes: {
        value: 3482,
        change: 15.7,
        isPositive: true,
      },
      totalAuditions: {
        value: 8921,
        change: -2.4,
        isPositive: false,
      },
    };
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


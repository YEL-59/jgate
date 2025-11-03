/**
 * Dashboard Controller
 * Business logic for dashboard data processing
 */

import { dashboardService } from '@/services/dashboard.service';

export const dashboardController = {
  /**
   * Get formatted dashboard data
   */
  async getDashboardData() {
    try {
      const [metrics, growthData, statusData] = await Promise.all([
        dashboardService.getMetrics(),
        dashboardService.getUserProjectGrowth(),
        dashboardService.getProjectStatusDistribution(),
      ]);

      return {
        metrics,
        growthData,
        statusData,
      };
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      throw error;
    }
  },

  /**
   * Format metric value for display
   */
  formatMetricValue(value) {
    return new Intl.NumberFormat('en-US').format(value);
  },

  /**
   * Format percentage change
   */
  formatPercentageChange(value) {
    const sign = value >= 0 ? '+' : '';
    return `${sign}${value.toFixed(1)}%`;
  },
};


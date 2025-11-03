/**
 * Theme Configuration
 * Centralized theme and color configuration matching the design
 */

export const theme = {
  colors: {
    sidebar: {
      background: '#282870', // Dark purple/indigo (matching design)
      foreground: '#FFFFFF',
      active: '#FFC107', // Yellow for active state (matching design)
      border: 'rgba(255, 255, 255, 0.1)',
    },
    dashboard: {
      background: '#F8F8F8',
      card: {
        background: '#301960',
        foreground: '#FFFFFF',
      },
    },
    chart: {
      positive: '#10B981', // Green for positive trends
      negative: '#EF4444', // Red for negative trends
      purple: '#8B5CF6',
      yellow: '#FBBF24',
      blue: '#3B82F6',
    },
  },
  brand: {
    name: 'Theakktricks',
    logo: 'T',
  },
};


/**
 * Notification Service
 * Handles data fetching for notifications
 */

export const notificationService = {
  /**
   * Get recipient groups
   */
  getRecipientGroups() {
    return [
      { id: 'all_users', label: 'All Users', count: 1247 },
      { id: 'actors', label: 'Actors', count: 856 },
      { id: 'directors', label: 'Directors', count: 234 },
      { id: 'subscribers', label: 'Subscribers', count: 157 },
    ];
  },

  /**
   * Get notification templates
   */
  getTemplates() {
    return [
      {
        id: 'weekly_challenge',
        title: 'Weekly Challenge Alert',
        type: 'push',
        description: 'A new acting challenge is now live. Show us your skills and compete for top ratings!',
      },
      {
        id: 'new_project',
        title: 'New Project Notification',
        type: 'email',
        description: 'We found a new casting opportunity that matches your interests. Check it out now!',
      },
      {
        id: 'director_verification',
        title: 'Director Verification',
        type: 'email',
        description: 'Congratulations! Your director account is now verified. You can start creating projects.',
      },
    ];
  },
};


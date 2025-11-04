/**
 * Notification Controller
 * Business logic for notification management
 */

import { notificationService } from '@/services/notification.service';

export const notificationController = {
  /**
   * Get recipient groups
   */
  getRecipientGroups() {
    return notificationService.getRecipientGroups();
  },

  /**
   * Get templates
   */
  getTemplates() {
    return notificationService.getTemplates();
  },

  /**
   * Send notification
   */
  async sendNotification(notificationData) {
    // In a real app, this would call an API
    console.log('Sending notification:', notificationData);
    return { success: true, messageId: `msg_${Date.now()}` };
  },
};


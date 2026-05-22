/**
 * Notification Service
 * Handles data fetching and API calls for notifications
 */

import { apiConfig } from "@/config/api";

export const notificationService = {
  /**
   * Send notification
   */
  async sendNotification(data, token) {
    const formData = new FormData();

    formData.append("type", data.type);
    formData.append("title", data.title);
    formData.append("body", data.body);

    // Append channels array dynamically
    if (data.channels && Array.isArray(data.channels)) {
      data.channels.forEach((channel, index) => {
        formData.append(`channels[${index}]`, channel);
      });
    }

    try {
      const res = await fetch(
        `${apiConfig.baseURL}${apiConfig.endpoints.sendNotification}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
          body: formData,
        },
      );

      const result = await res.json();
      return result;
    } catch (error) {
      console.log(error);
      return { success: false, message: error.message };
    }
  },
};

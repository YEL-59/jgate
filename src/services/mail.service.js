import { apiConfig } from "@/config/api";

export const mailService = {
  /**
   * Get mail settings
   */
  async getMailSettings(token) {
    try {
      const res = await fetch(
        `${apiConfig.baseURL}${apiConfig.endpoints.mailSettings}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        },
      );

      const result = await res.json();
      return result;
    } catch (error) {
      console.log(error);
      return { success: false, message: error.message };
    }
  },

  /**
   * Update mail settings
   */
  async updateMailSettings(data, token) {
    const formData = new FormData();

    formData.append("mail_mailer", data.mail_mailer || "");
    formData.append("mail_host", data.mail_host || "");
    formData.append("mail_port", data.mail_port || "");
    formData.append("mail_username", data.mail_username || "");
    formData.append("mail_password", data.mail_password || "");
    formData.append("mail_encryption", data.mail_encryption || "");
    formData.append("mail_from_address", data.mail_from_address || "");

    try {
      const res = await fetch(
        `${apiConfig.baseURL}${apiConfig.endpoints.mailSettings}`,
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

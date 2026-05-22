"use server";

import { apiConfig } from "@/config/api";

export const getContactUsData = async (token) => {
  try {
    const res = await fetch(
      `${apiConfig.baseURL}${apiConfig.endpoints.contactUs}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return await res.json();
  } catch (error) {
    console.error(`Failed to fetch contact us data:`, error);
    return { success: false, message: error.message };
  }
};

export const updateContactUsData = async (token, data) => {
  try {
    const formData = new FormData();
    formData.append("email", data.email);
    formData.append("phone", data.phone);

    const res = await fetch(
      `${apiConfig.baseURL}${apiConfig.endpoints.contactUs}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      },
    );
    return await res.json();
  } catch (error) {
    console.error(`Failed to update contact us data:`, error);
    return { success: false, message: error.message };
  }
};

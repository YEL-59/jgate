"use server";

import { apiConfig } from "@/config/api";

export const useDashboard = async (token) => {
  try {
    const res = await fetch(
      `${apiConfig.baseURL}${apiConfig.endpoints.dashboardUser}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      },
    );
    const result = await res.json();
    console.log(result);
    return result;
  } catch (error) {
    console.log(error);
  }
};

export const getAdminProfile = async (token) => {
  try {
    const res = await fetch(
      `${apiConfig.baseURL}${apiConfig.endpoints.adminProfile}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      },
    );
    const result = await res.json();
    return result;
  } catch (error) {
    console.error("Error fetching admin profile:", error);
  }
};

export const updateAdminProfile = async (token, formData) => {
  try {
    const res = await fetch(
      `${apiConfig.baseURL}${apiConfig.endpoints.adminProfileUpdate}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      },
    );
    const result = await res.json();
    return result;
  } catch (error) {
    console.error("Error updating admin profile:", error);
  }
};

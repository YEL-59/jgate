"use server";

import { apiConfig } from "@/config/api";

export const getProjectCategories = async (token) => {
  try {
    const res = await fetch(
      `${apiConfig.baseURL}${apiConfig.endpoints.projectCategories}`,
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
    console.log("getProjectCategories error:", error);
    return { success: false, message: error.message };
  }
};

export const createProjectCategory = async (token, data) => {
  try {
    const formData = new FormData();
    formData.append("name", data.name);

    const res = await fetch(
      `${apiConfig.baseURL}${apiConfig.endpoints.projectCategoryCreate}`,
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
    console.log("createProjectCategory error:", error);
    return { success: false, message: error.message };
  }
};

export const updateProjectCategory = async (token, id, data) => {
  try {
    const formData = new FormData();
    formData.append("name", data.name);

    const res = await fetch(
      `${apiConfig.baseURL}${apiConfig.endpoints.projectCategoryUpdate(id)}`,
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
    console.log("updateProjectCategory error:", error);
    return { success: false, message: error.message };
  }
};

export const deleteProjectCategory = async (token, id) => {
  try {
    const res = await fetch(
      `${apiConfig.baseURL}${apiConfig.endpoints.projectCategoryDelete(id)}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      },
    );
    const result = await res.json();
    return result;
  } catch (error) {
    console.log("deleteProjectCategory error:", error);
    return { success: false, message: error.message };
  }
};

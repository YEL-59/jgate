"use server";

import { apiConfig } from "@/config/api";

export const useStaticContent = async (token) => {
  try {
    const res = await fetch(`${apiConfig.baseURL}/admin/static-page`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const result = await res.json();
    console.log(result);

    return result;
  } catch (error) {
    console.log(error);
  }
};

export const getStaticContentByType = async (token, type) => {
  try {
    const res = await fetch(
      `${apiConfig.baseURL}${apiConfig.endpoints.staticContent(type)}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
      },
    );
    const result = await res.json();
    return result;
  } catch (error) {
    console.error("Failed to fetch static content by type:", error);
    return { success: false, message: error.message };
  }
};

export const updateStaticContent = async (token, type, data) => {
  try {
    const res = await fetch(
      `${apiConfig.baseURL}${apiConfig.endpoints.staticContent(type)}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
        cache: "no-store",
        body: JSON.stringify({
          type: type,
          title: data.title,
          content: data.content,
        }),
      },
    );

    const contentType = res.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      const result = await res.json();
      return result;
    } else {
      const text = await res.text();
      console.error("Non-JSON response received:", text);
      return {
        success: false,
        message: `Server returned an unexpected response (Status: ${res.status}). Please check the URL or your authentication.`,
      };
    }
  } catch (error) {
    console.error("Update static content error:", error);
    return { success: false, message: error.message };
  }
};

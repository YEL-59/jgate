// Removed "use server" to allow direct client-side uploads and bypass Vercel's payload limits

import { apiConfig } from "@/config/api";

export const getAdminAllMovies = async (token, page = 1) => {
  try {
    const res = await fetch(
      `${apiConfig.baseURL}${apiConfig.endpoints.adminAllMovies}?page=${page}`,
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
    console.log("getAdminAllMovies error:", error);
    return { success: false, message: error.message };
  }
};

export const createMovie = async (formData) => {
  const token = formData.get("token");
  formData.delete("token");

  try {
    const res = await fetch(
      `${apiConfig.baseURL}${apiConfig.endpoints.createMovie}`,
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
    console.log("createMovie error:", error);
    return { success: false, message: error.message };
  }
};

export const updateMovie = async (formData) => {
  const token = formData.get("token");
  const id = formData.get("id");
  formData.delete("token");
  formData.delete("id");

  try {
    const res = await fetch(
      `${apiConfig.baseURL}${apiConfig.endpoints.updateMovie(id)}`,
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
    console.log("updateMovie error:", error);
    return { success: false, message: error.message };
  }
};

export const deleteMovie = async (token, id) => {
  try {
    const res = await fetch(
      `${apiConfig.baseURL}${apiConfig.endpoints.deleteMovie(id)}`,
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
    console.log("deleteMovie error:", error);
    return { success: false, message: error.message };
  }
};

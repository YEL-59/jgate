"use server";

import { apiConfig } from "@/config/api";

export const useUser = async (token, page = 1) => {
  try {
    const res = await fetch(
      `${apiConfig.baseURL}${apiConfig.endpoints.users}?page=${page}`,
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

export const updateUserStatus = async (token, id, status) => {
  try {
    const res = await fetch(
      `${apiConfig.baseURL}${apiConfig.endpoints.userUpdateStatus(id)}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status }),
      },
    );
    const result = await res.json();
    return result;
  } catch (error) {
    console.log(error);
  }
};

export const getPendingDirectors = async (token) => {
  try {
    const res = await fetch(
      `${apiConfig.baseURL}${apiConfig.endpoints.pendingDirectors}`,
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
    console.log(error);
  }
};

export const approveDirector = async (token, id) => {
  try {
    const res = await fetch(
      `${apiConfig.baseURL}${apiConfig.endpoints.approveDirector(id)}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      },
    );
    const result = await res.json();
    return result;
  } catch (error) {
    console.log(error);
  }
};

export const rejectDirector = async (token, id) => {
  try {
    const res = await fetch(
      `${apiConfig.baseURL}${apiConfig.endpoints.rejectDirector(id)}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      },
    );
    const result = await res.json();
    return result;
  } catch (error) {
    console.log(error);
  }
};

export const getUserDetails = async (token, id) => {
  try {
    const res = await fetch(
      `${apiConfig.baseURL}${apiConfig.endpoints.userDetails(id)}`,
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
    console.log(error);
  }
};

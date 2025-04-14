import apiClient from "../apiClient.js";

export const getProfile = async (accessToken) => {
  try {
    const response = await apiClient.get("/profile", {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });
    return response.data;
  } catch (error) {
    console.error("Profile Error:", error.response?.data || error.message);
    throw error;
  }
};
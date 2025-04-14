// services/business.js

import apiClient from "../apiClient.js";

/**
 * Create a business for the authenticated user.
 */
export async function createBusiness(token, businessDetails) {
  try {
    const response = await apiClient.post(
      "/auth/create-business",
      businessDetails,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
}

/**
 * Get list of business categories
 */
export async function getBusinessCategories(token) {
  try {
    const response = await apiClient.get("/auth/business-categories", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
}

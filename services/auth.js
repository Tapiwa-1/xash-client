// services/auth.js

import apiClient from "../apiClient.js";

export const registerUser = async (firstName, lastName, dob, phone, email = "", idNumber = "") => {
  try {
    const response = await apiClient.post("/auth/register", {
      phone,
      first_name: firstName,
      last_name: lastName,
      email,
      dob: dob,              // Ensure the date is in the correct format (YYYY-MM-DD)
      email: email,          // Optional, but must be a valid email format
      id_number: idNumber    // ID number field if required
    });
    return response.data;
  } catch (error) {
    console.error("Registration Error:", error.response?.data || error.message);
    throw error;
  }
};

export const setPassword = async (userNumber, password, passwordConfirmation) => {
    try {
      const response = await apiClient.post("/auth/set-password", {
        user_number: userNumber,          // user_number should be passed here
        password: password,               // new password
        password_confirmation: passwordConfirmation // confirm password
      });
      return response.data;
    } catch (error) {
      console.error("Set Password Error:", error.response?.data || error.message);
      throw error;
    }
  };

  export const loginUser = async (userNumber, password) => {
    try {
      const response = await apiClient.post("/auth/login", {
        user_number: userNumber,
        password
      });
      return response.data;  // Save the access token here
    } catch (error) {
      console.error("Login Error:", error.response?.data || error.message);
      throw error;
    }
  };


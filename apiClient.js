// apiClient.js
import axios from "axios";
import { API_BASE_URL, API_KEY } from "./config.js";
import { createBusiness } from "./services/business.js";

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${API_KEY}`
  }
});

apiClient.interceptors.response.use(
  res => res,
  err => {
    console.error("API Error:", err.response?.data || err.message);
    return Promise.reject(err);
  }
);

export default apiClient;


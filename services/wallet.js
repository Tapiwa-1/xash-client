// services/wallet.js
import apiClient from "../apiClient.js";

export const getBalance = async () => {
  const res = await apiClient.get("/");
  return res.data;
};

export const sendMoney = async (payload) => {
  const res = await apiClient.post("/wallet/send", payload);
  return res.data;
};

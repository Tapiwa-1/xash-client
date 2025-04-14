// services/wallet.js
import apiClient from "../apiClient.js";

export async function getWallet(token) {
  try {
    const response = await apiClient.get('/wallet', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    return response.data;
  } catch (err) {
    throw new Error(err.response?.data?.message || 'Failed to fetch wallet');
  }
}

export async function getWalletByCurrency(token, currency) {
  try {
    const response = await apiClient.get(`/wallet/${currency}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    return response.data;
  } catch (err) {
    throw new Error(err.response?.data?.message || `Failed to fetch ${currency} wallet`);
  }
}

export async function innbucksPay(token, amount, phone) {
  try {
    const response = await apiClient.post('/innbucks/pay', 
      { amount, phone },
      {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }
    );
    return response.data;
  } catch (err) {
    throw new Error(err.response?.data?.message || 'InnBucks payment failed');
  }
}

export async function pollInnbucksPayment(token, paymentId) {
  try {
    const response = await apiClient.get(`/innbucks/poll/${paymentId}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    return response.data;
  } catch (err) {
    throw new Error(err.response?.data?.message || 'Failed to poll InnBucks payment');
  }
}

export async function ecocashPay(token, amount, phone) {
  try {
    const response = await apiClient.post('/ecocash/pay', 
      { amount,
        ecocash_phone: phone
       },
      {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }
    );
    return response.data;
  } catch (err) {
    throw new Error(err.response?.data?.message || 'EcoCash payment failed');
  }
}

export async function pollEcocashPayment(token, paymentId) {
  try {
    const response = await apiClient.get(`/ecocash/poll/${paymentId}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    return response.data;
  } catch (err) {
    throw new Error(err.response?.data?.message || 'Failed to poll EcoCash payment');
  }
}
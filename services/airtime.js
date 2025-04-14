// services/airtime.js
import apiClient from "../apiClient.js";

export async function getAirtimeCarriers(token) {
  try {
    const response = await apiClient.get('/airtime/carriers', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    return response.data;
  } catch (err) {
    throw new Error(err.response?.data?.message || 'Failed to fetch airtime carriers');
  }
}
export async function buyDirectAirtime(token, phone, amount, carrierId, currency = 'USD') {
    try {
      const payload = {
        mobile_phone: phone,
        amount: amount.toString(), // Ensure amount is sent as string if API expects it
        carrier_id: carrierId.toString(), // Ensure carrier_id is string if needed
        currency: currency.toUpperCase() // Ensure uppercase
      };
  
      console.log('Sending payload:', payload); // Debug log
  
      const response = await apiClient.post('/airtime/direct', 
        payload,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );
      return response.data;
    } catch (err) {
      console.error('API Error Details:', err.response?.data); // More detailed error logging
      throw new Error(err.response?.data?.message || 'Failed to purchase direct airtime');
    }
  }

export async function getVoucherValues(token, carrier) {
  try {
    const response = await apiClient.get(`/airtime/voucher/${carrier}/values`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    return response.data;
  } catch (err) {
    throw new Error(err.response?.data?.message || 'Failed to fetch voucher values');
  }
}

export async function buyAirtimeVoucher(token, carrier, valueId, quantity = 1) {
  try {
    const response = await apiClient.post(`/airtime/voucher/${carrier}/buy`, 
      { value_id: valueId, quantity },
      {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }
    );
    return response.data;
  } catch (err) {
    throw new Error(err.response?.data?.message || 'Failed to purchase airtime voucher');
  }
}
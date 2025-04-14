// services/electricity.js
import apiClient from '../apiClient.js';

export async function checkMeterAccount(token, meterNumber) {
    console.log('Checking meter account:', meterNumber);
  try {
    const response = await apiClient.post('/electricity/check-account', 
      { meter_number: meterNumber },
      {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      }
    );
    return response.data;
  } catch (err) {
    throw new Error(err.response?.data?.message || 'Failed to validate meter');
  }
}

export async function buyElectricityTokens(token, meterNumber, amount,  currency = 'USD') {
  try {
    const response = await apiClient.post('/electricity/buy-tokens',
      {
        meter_number: meterNumber,
        amount: parseFloat(amount),
        currency: currency.toUpperCase() // Ensure uppercase
      },
      {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      }
    );
    return response.data;
  } catch (err) {
    throw new Error(err.response?.data?.message || 'Failed to purchase electricity tokens');
  }
}

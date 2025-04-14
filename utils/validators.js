// utils/validators.js
export function validateMeterNumber(meterNumber) {
    // Basic validation - adjust according to your requirements
    return /^\d{8,15}$/.test(meterNumber);
  }
  
  export function validateElectricityAmount(amount) {
    return !isNaN(amount) && amount >= 1; // Minimum $1 purchase
  }

  export function validateAmount(amount) {
    const num = parseFloat(amount);
    return !isNaN(num) && num > 0;
  }
  
  export function validateCurrency(currency) {
    return ['USD', 'ZWL'].includes(currency.toUpperCase());
  }
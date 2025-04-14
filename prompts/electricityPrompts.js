// prompts/electricityPrompts.js
import { checkMeterAccount, buyElectricityTokens } from "../services/electricity.js";

export async function promptCheckMeterAccount(rl, token) {
  try {
    const meterNumber = await rl.question("Enter meter number: ");
    const accountInfo = await checkMeterAccount(token, meterNumber);
    
    console.log("\n✅ Meter Account Details:");
    console.log(`Customer: ${accountInfo.data.customer_name}`);
    console.log(`Address: ${accountInfo.data.address}`);
    console.log(`Meter Type: ${accountInfo.data.meter_type}`);
    console.log(`Valid: ${accountInfo.data.is_valid ? 'Yes' : 'No'}`);
    
    return accountInfo.data;
  } catch (err) {
    console.error("❌ Validation Error:", err.message);
    return null;
  }
}

export async function promptBuyElectricityTokens(rl, token) {
  try {
    const meterNumber = await rl.question("Enter meter number: ");
    const amount = parseFloat(await rl.question("Amount (USD): "));
    
    // Validate amount
    if (isNaN(amount)) {
      throw new Error("Invalid amount entered");
    }
    
      // Get currency selection
      let currency;
      while (true) {
        currency = (await rl.question("Currency (USD/ZWL): ")).toUpperCase();
        if (['USD', 'ZWL'].includes(currency)) break;
        console.log("❌ Please enter either USD or ZWL");
      }
  
      // Make purchase
      const result = await buyElectricityTokens(token, meterNumber, amount, currency);
      
    console.log("\n✅ Electricity Tokens Purchased:");
    console.log(`Token: ${result.data.token}`);
    console.log(`Units: ${result.data.units}`);
    console.log(`Amount: ${result.data.amount} ${result.data.currency}`);
    console.log(`Transaction ID: ${result.data.transaction_id}`);
    
    return result.data;
  } catch (err) {
    console.error("❌ Purchase Error:", err.message);
    return null;
  }
}
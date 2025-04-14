import { 
    getAirtimeCarriers,
    buyDirectAirtime,
    getVoucherValues,
    buyAirtimeVoucher
  } from "../services/airtime.js";
  
  export async function promptViewAirtimeCarriers(rl, token) {
    console.log("\n📱 Available Airtime Carriers");
  
  try {
    const carriersData = await getAirtimeCarriers(token);
    console.log("✅ Available Carriers:");
    carriersData.data.forEach(carrier => {
      console.log(`${carrier.id}. ${carrier.name} (${carrier.code})`);
    });
  } catch (err) {
    console.error("❌ Failed to fetch carriers:", err.message || err);
  }
  }
  
  export async function promptBuyDirectAirtime(rl, token) {
    console.log("\n📱 Buy Direct Airtime");
       
       try {
         // Show available carriers first
         const carriersData = await getAirtimeCarriers(token);
         console.log("Available Carriers:");
         carriersData.data.forEach(carrier => {
           console.log(`${carrier.id}. ${carrier.name}`);
         });
     
         const carrierId = parseInt(await rl.question("Select carrier ID: "));
         
         // Validate phone number format
         let phone;
         while (true) {
           phone = await rl.question("Recipient phone number (2637XXXXXXX): ");
           if (/^2637\d{8}$/.test(phone)) {
             break;
           }
           console.log("❌ Invalid format. Must be 2637 followed by 8 digits (e.g., 263772306122)");
         }
     
         const amount = parseFloat(await rl.question("Amount: "));
         
         // Validate currency
         let currency;
         while (true) {
           currency = (await rl.question("Currency (USD/ZWL): ")).toUpperCase();
           if (['USD', 'ZWL'].includes(currency)) {
             break;
           }
           console.log("❌ Only USD or ZWL accepted");
         }
     
         const result = await buyDirectAirtime(token, phone, amount, carrierId, currency);
         console.log("✅ Airtime purchased successfully:", result.data);
       } catch (err) {
         console.error("❌ Failed to purchase airtime:", err.message);
       }
  }
  
  export async function promptBuyAirtimeVoucher(rl, token) {
    console.log("\n🎫 Buy Airtime Voucher");
  
  try {
    // Show available carriers first
    const carriersData = await getAirtimeCarriers(token);
    console.log("Available Carriers:");
    carriersData.data.forEach(carrier => {
      console.log(`${carrier.id}. ${carrier.name} (${carrier.code})`);
    });

    const carrierCode = await rl.question("Enter carrier code: ");
    
    // Get available voucher values
    const valuesData = await getVoucherValues(token, carrierCode);
    console.log("Available Voucher Values:");
    valuesData.data.forEach(value => {
      console.log(`${value.id}. ${value.value} ${value.currency}`);
    });

    const valueId = parseInt(await rl.question("Select value ID: "));
    const quantity = parseInt(await rl.question("Quantity (default 1): ") || "1");

    const result = await buyAirtimeVoucher(token, carrierCode, valueId, quantity);
    console.log("✅ Vouchers purchased successfully:");
    result.data.vouchers.forEach(voucher => {
      console.log(`- Code: ${voucher.code} (${voucher.value} ${voucher.currency})`);
    });
  } catch (err) {
    console.error("❌ Failed to purchase voucher:", err.message || err);
  }
  }
import { 
    getWallet,
    innbucksPay,
    pollInnbucksPayment,
    ecocashPay,
    pollEcocashPayment
  } from "../services/wallet.js";
  
  export async function promptViewWallet(rl, token) {
    console.log("\n💰 Wallet Balance");
  
    try {
      const walletData = await getWallet(token);
      console.log("✅ Wallet Balances:");
      walletData.data.forEach(currency => {
        console.log(`- ${currency.currency}: ${currency.balance}`);
      });
    } catch (err) {
      console.error("❌ Failed to fetch wallet:", err.message || err);
    }
  }
  
  export async function promptMakePayment(rl, token) {
     console.log("\n💸 Make a Payment");
      console.log("1. InnBucks Payment");
      console.log("2. EcoCash Payment");
      
      const paymentMethod = await rl.question("Select payment method (1-2): ");
      const amount = parseFloat(await rl.question("Amount: "));
      
      // Validate phone number format
      let phone;
      while (true) {
        phone = await rl.question("Phone number (2637XXXXXXX): ");
        if (/^2637\d{8}$/.test(phone)) {
          break;
        }
        console.log("❌ Invalid phone number format. Must start with 2637 followed by 8 digits");
      }
    
      try {
        let paymentData;
        if (paymentMethod === "1") {
          paymentData = await innbucksPay(token, amount, phone);
          console.log("✅ InnBucks payment initiated:", paymentData);
        } else if (paymentMethod === "2") {
          paymentData = await ecocashPay(token, amount, phone);
          console.log("✅ EcoCash payment initiated:", paymentData);
        } else {
          console.log("❌ Invalid payment method");
          return;
        }
    
        // Poll payment status
        console.log("⏳ Checking payment status...");
        await pollPaymentStatus(token, paymentMethod === "1" ? "innbucks" : "ecocash", paymentData.data.payment_id);
      } catch (err) {
        console.error("❌ Payment Error:", err.message || err);
      }
  }
  
  export async function pollPaymentStatus(rl, token, paymentType, paymentId) {
    try {
        let pollResponse;
        let attempts = 0;
        const maxAttempts = 10;
        const delay = 2000; // 2 seconds
        
        while (attempts < maxAttempts) {
          attempts++;
          await new Promise(resolve => setTimeout(resolve, delay));
          
          if (paymentType === "innbucks") {
            pollResponse = await pollInnbucksPayment(token, paymentId);
          } else {
            pollResponse = await pollEcocashPayment(token, paymentId);
          }
          
          console.log(`Payment status: ${pollResponse.data.status}`);
          
          if (pollResponse.data.status === "completed") {
            console.log("✅ Payment completed successfully!");
            return;
          } else if (pollResponse.data.status === "failed") {
            console.log("❌ Payment failed:", pollResponse.data.message);
            return;
          }
        }
        
        console.log("⚠️ Payment status check timed out. Please check later.");
      } catch (err) {
        console.error("❌ Error polling payment status:", err.message || err);
      }
  }
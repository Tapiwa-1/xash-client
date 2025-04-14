import { 
    promptViewAirtimeCarriers,
    promptBuyDirectAirtime,
    promptBuyAirtimeVoucher
  } from "../prompts/airtimePrompts.js";
  
  export async function airtimeMenu(rl, token) {
    console.log("\n=== 📱 Airtime Menu ===");
  console.log("1. Buy direct airtime");
  console.log("2. Buy airtime voucher");
  console.log("3. View available carriers");
  console.log("4. Back to main menu\n");


  while (true) {
    const choice = await rl.question("Select an option (1-4): ");

    switch (choice.trim()) {
      case "1":
        await promptBuyDirectAirtime(rl,token);
        break;
      case "2":
        await promptBuyAirtimeVoucher(rl,token);
        break;
      case "3":
        await promptViewAirtimeCarriers(rl,token);
        break;
      case "4":
        return;
      default:
        console.log("❓ Invalid choice. Please select a valid option (1-4).");
    }
  }
  }
import { promptViewWallet, promptMakePayment } from "../prompts/walletPrompts.js";

export async function walletMenu(rl, token) {
    console.log("\n=== 💰 Wallet Menu ===");
    console.log("1. View wallet balance");
    console.log("2. Make a payment");
    console.log("3. Back to main menu\n");
  
 
    while (true) {
      const choice = await rl.question("Select an option (1-3): ");
  
      switch (choice.trim()) {
        case "1":
          await promptViewWallet(rl,token);
          break;
        case "2":
          await promptMakePayment(rl,token);
          break;
        case "3":
          return;
        default:
          console.log("❓ Invalid choice. Please select a valid option (1-3).");
      }
    }
}
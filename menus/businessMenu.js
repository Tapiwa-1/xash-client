import { promptCreateBusiness, promptGetCategories } from "../prompts/businessPrompts.js";

export async function businessMenu(rl, token) {
    console.log("\n=== 🏢 Business Menu ===");
    console.log("1. Create a new business");
    console.log("2. View business categories");
    console.log("3. Back to main menu\n");
  
    while (true) {
      const choice = await rl.question("Select an option (1-3): ");
  
      switch (choice.trim()) {
        case "1":
          await promptCreateBusiness(rl,token);
          break;
        case "2":
          await promptGetCategories(rl,token);
          break;
        case "3":
          return;
        default:
          console.log("❓ Invalid choice. Please select a valid option (1-3).");
      }
    }
  }
  
  async function walletMenu(token) {
    console.log("\n=== 💰 Wallet Menu ===");
    console.log("1. View wallet balance");
    console.log("2. Make a payment");
    console.log("3. Back to main menu\n");
  
 
    while (true) {
      const choice = await rl.question("Select an option (1-3): ");
  
      switch (choice.trim()) {
        case "1":
          await promptViewWallet(token);
          break;
        case "2":
          await promptMakePayment(token);
          break;
        case "3":
          return;
        default:
          console.log("❓ Invalid choice. Please select a valid option (1-3).");
      }
    }
}
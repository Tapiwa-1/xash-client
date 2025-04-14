// menus/electricityMenu.js
import { 
    promptCheckMeterAccount,
    promptBuyElectricityTokens
  } from "../prompts/electricityPrompts.js";
  
  export async function electricityMenu(rl, token) {
    while (true) {
      console.log("\n=== ⚡ Electricity Menu ===");
      console.log("1. Check Meter Account");
      console.log("2. Buy Electricity Tokens");
      console.log("3. Back to Main Menu\n");
      
      const choice = await rl.question("Select an option (1-3): ");
      
      switch (choice.trim()) {
        case "1":
            console.log("You selected: Check Meter Account");
          await promptCheckMeterAccount(rl, token);
          break;
        case "2":
          await promptBuyElectricityTokens(rl, token);
          break;
        case "3":
          return;
        default:
          console.log("❌ Invalid choice. Please select 1-3.");
      }
    }
  }
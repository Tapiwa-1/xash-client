import { businessMenu } from "./businessMenu.js";
import { walletMenu } from "./walletMenu.js";
import { airtimeMenu } from "./airtimeMenu.js";
import { electricityMenu } from "./electricityMenu.js";

export async function afterLoginMenu(rl, token) {
  console.log("\n=== 📋 Main Menu ===");
  console.log("1. Business Services");
  console.log("2. Wallet Services");
  console.log("3. Airtime Services");
  console.log("4. Electricity Services");
  console.log("5. Logout\n");
  

  while (true) {
    const choice = await rl.question("Select an option (1-4): ");

    switch (choice.trim()) {
      case "1":

        await businessMenu(rl, token);
        break;
      case "2":
        await walletMenu(rl, token);
        break;
      case "3":
        await airtimeMenu(rl, token);
        break;
      case "4":
        await electricityMenu(rl, token);
        break;      
      case "5":
        console.log("🔒 Logged out.\n");
        return;
      default:
        console.log("❓ Invalid choice. Please select a valid option (1-4).");
    }
  }
}
import { promptRegister, promptSetPassword, promptLoginAndProfile } from "../prompts/authPrompts.js";
import { afterLoginMenu } from "./afterLoginMenu.js";

export async function mainMenu(rl) {
  console.log("\n=== 🔧 Command Menu ===");
  console.log("1. Register new user");
  console.log("2. Set a user's password");
  console.log("3. Login and view profile");
  console.log("4. Exit the program\n");

  while (true) {
    const choice = await rl.question("Select an option (1-4): ");

    switch (choice.trim()) {
      case "1":
        await promptRegister(rl);
        break;
      case "2":
        await promptSetPassword(rl);
        break;
      case "3":
        const loginResult = await promptLoginAndProfile(rl);
        if (loginResult?.token) {
          await afterLoginMenu(rl, loginResult.token);
        }
      case "4":
        console.log("👋 Exiting...");
        rl.close();
        process.exit(0);
        break;
      default:
        console.log("❓ Invalid choice. Please select a valid option (1-4).");
    }
  }
}
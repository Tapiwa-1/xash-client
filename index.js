// index.js
import readline from 'readline/promises';
import { stdin as input, stdout as output } from 'node:process';
import { registerUser, setPassword, loginUser } from "./services/auth.js";
import { getProfile } from "./services/profile.js";
import { createBusiness, getBusinessCategories } from "./services/business.js";

const rl = readline.createInterface({ input, output });

async function promptRegister() {
  console.log("=== 📝 User Registration ===");

  const firstName = await rl.question("First Name: ");
  const lastName = await rl.question("Last Name: ");
  const dob = await rl.question("Date of Birth (YYYY-MM-DD): ");
  const phone = await rl.question("Phone (2637XXXXXXXX): ");
  const email = await rl.question("Email: ");
  const idNumber = await rl.question("ID Number: ");

  try {
    const registrationData = await registerUser(firstName, lastName, dob, phone, email, idNumber);
    console.log("✅ Registered successfully:", registrationData);
  } catch (err) {
    console.error("❌ Registration Error:", err.message || err);
  }
}

async function promptSetPassword() {
  console.log("=== 🔐 Set Password ===");

  const userNumber = await rl.question("User Number (or phone): ");
  const password = await rl.question("New Password: ");
  const confirmPassword = await rl.question("Confirm Password: ");

  try {
    const setPasswordData = await setPassword(userNumber, password, confirmPassword);
    console.log("✅ Password set:", setPasswordData);
  } catch (err) {
    console.error("❌ Set Password Error:", err.message || err);
  }
}

async function promptLoginAndProfile() {
  console.log("=== 🔑 Login & Profile ===");

  const userNumber = await rl.question("User Number: ");
  const password = await rl.question("Password: ");

  try {
    const loginData = await loginUser(userNumber, password);
    console.log("✅ Logged in:", loginData);

    const profileData = await getProfile(loginData.token);
    console.log("👤 Profile Data:", profileData);

    await afterLoginMenu(loginData.token);

  } catch (err) {
    console.error("❌ Login/Profile Error:", err.message || err);
  }
}

async function promptCreateBusiness(token) {
  console.log("🏢 Create New Business");

  const name = await rl.question("Business Name: ");
  const description = await rl.question("Description: ");
  const category_id = await rl.question("Category ID: ");
  const phone = await rl.question("Phone Number: ");
  const address = await rl.question("Address: ");

  try {
    const businessData = await createBusiness(token, {
      name,
      description,
      category_id,
      phone,
      address
    });
    console.log("✅ Business Created:", businessData);
  } catch (err) {
    console.error("❌ Business Creation Error:", err.message || err);
  }
}

async function promptGetCategories(token) {
  console.log("📦 Getting Business Categories...");

  try {
    const categories = await getBusinessCategories(token);
    console.log("✅ Categories:");
    categories.forEach((cat, i) => {
      console.log(`${i + 1}. ${cat.name} (ID: ${cat.id})`);
    });
  } catch (err) {
    console.error("❌ Failed to fetch categories:", err.message || err);
  }
}

async function afterLoginMenu(token) {
  console.log("\n=== 📋 Business Menu ===");
  console.log("/create-business - Create a new business");
  console.log("/categories - View business categories");
  console.log("/logout - Logout and return to main menu\n");

  while (true) {
    const command = await rl.question("Business command: ");

    switch (command.trim()) {
      case "/create-business":
        await promptCreateBusiness(token);
        break;
      case "/categories":
        await promptGetCategories(token);
        break;
      case "/logout":
        console.log("🔒 Logged out.\n");
        return;
      default:
        console.log("❓ Unknown business command. Try again.");
    }
  }
}

async function mainMenu() {
  console.log("\n=== 🔧 Command Menu ===");
  console.log("/register - Register new user");
  console.log("/set-password - Set a user's password");
  console.log("/login - Login and view profile");
  console.log("/exit - Exit the program\n");

  while (true) {
    const command = await rl.question("Enter command: ");

    switch (command.trim()) {
      case "/register":
        await promptRegister();
        break;
      case "/set-password":
        await promptSetPassword();
        break;
      case "/login":
        await promptLoginAndProfile();
        break;
      case "/exit":
        console.log("👋 Exiting...");
        rl.close();
        process.exit(0);
      default:
        console.log("❓ Unknown command. Try again.");
    }
  }
}

mainMenu();
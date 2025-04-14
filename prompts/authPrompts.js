import { registerUser, setPassword, loginUser } from "../services/auth.js";
import { getProfile } from "../services/profile.js";
import { afterLoginMenu } from "../menus/afterLoginMenu.js";

export async function promptRegister(rl) {
   console.log("\n=== 📝 User Registration ===");
  
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

export async function promptSetPassword(rl) {
   console.log("\n=== 🔐 Set Password ===");
  
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

export async function promptLoginAndProfile(rl) {
    try {
      const userNumber = await rl.question("User Number: ");
      const password = await rl.question("Password: ");
      
      const loginData = await loginUser(userNumber, password);
      const profileData = await getProfile(loginData.token);
      
      return {
        token: loginData.token,
        user: profileData
      };
    } catch (err) {
      console.error("Login failed:", err.message);
      return null;
    }
  }

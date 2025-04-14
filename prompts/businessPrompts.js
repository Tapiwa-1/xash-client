import { createBusiness, getBusinessCategories } from "../services/business.js";

export async function promptCreateBusiness(rl, token) {
   console.log("\n🏢 Create New Business");
  
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

export async function promptGetCategories(rl, token) {
    console.log("\n📦 Getting Business Categories...");
    // console.log(token); token is undefined

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
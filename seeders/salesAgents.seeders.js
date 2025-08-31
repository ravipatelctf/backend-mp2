// const fs = require("fs");
// const SalesAgent = require("../models/salesAgent.models");

// const jsonData = fs.readFileSync("./data/salesAgentsData.json", "utf-8");
// const salesAgentsData = JSON.parse(jsonData);

// async function seedSalesAgentsCollection() {
//     try {
//         for (const salesAgentData of salesAgentsData) {
//             const newSalesAgent = new SalesAgent({
//                 name: salesAgentData.name,
//                 email: salesAgentData.email,
//             });
//             await newSalesAgent.save();
//         }
//         console.log("salesagents collection seeded successfully.");
//     } catch (error) {
//         throw error;
//     }
// }
// module.exports = {seedSalesAgentsCollection};
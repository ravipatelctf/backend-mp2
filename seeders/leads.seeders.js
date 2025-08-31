// const fs = require("fs");
// const Lead = require("../models/lead.models");
// const SalesAgent = require("../models/salesAgent.models");
// const jsonData = fs.readFileSync("./data/leadsData.json", "utf-8");
// const leadsData = JSON.parse(jsonData);

// async function seedLeadsCollection() {
//     try {
//         for (const leadData of leadsData) {

//             const salesAgent = await SalesAgent.findOne();
//             console.log("salesAgent:", salesAgent);
//             const newLead = new Lead({
//                 name: leadData.name,
//                 source: leadData.source,
//                 salesAgent: salesAgent._id,
//                 status: leadData.status,
//                 tags: leadData.tags,
//                 timeToClose: leadData.timeToClose,
//                 priority: leadData.priority
//             });
//             await newLead.save();
//         }
//         console.log(`leads collection seeded successfully.`)
//     } catch (error) {
//         throw error;
//     }
// }

// module.exports = {seedLeadsCollection};
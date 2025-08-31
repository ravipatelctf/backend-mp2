const SalesAgent = require("../models/salesAgent.models");


async function createNewSalesAgent(newAgentObj) {
    try {
        const newSalesAgent = new SalesAgent(newAgentObj);
        const savedNewSalesAgent = await newSalesAgent.save();
        return savedNewSalesAgent;
    } catch (error) {
        throw error;
    }
}


async function getAllSalesAgents() {
    try {
        const salesAgents = await SalesAgent.find();
        return salesAgents;
    } catch (error) {
        throw error;
    }
}


module.exports = { createNewSalesAgent, getAllSalesAgents };
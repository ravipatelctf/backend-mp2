const Lead = require("../models/lead.models");


async function createNewLead(newLeadObj) {
    try {
        const newLead = new Lead(newLeadObj);
        const savedNewLead = await newLead.save();
        return savedNewLead.populate("salesAgent");
    } catch (error) {
        throw error;
    }
}


async function getAllLeads(filters) {
    try {
        const allLeads = await Lead.find(filters).populate("salesAgent");
        return allLeads;
    } catch (error) {
        throw error;
    }
}


async function updateLeadById(leadId, dataToUpdate) {
    try {
        const updatedLead = await Lead.findByIdAndUpdate(leadId, dataToUpdate, {new: true}).populate("salesAgent");
        return updatedLead;
    } catch (error) {
        throw error;
    }
}


async function deleteLeadById(leadId) {
    try {
        const deletedLead = await Lead.findByIdAndDelete(leadId);
        return deletedLead;
    } catch (error) {
        throw error;
    }
}


module.exports = { createNewLead, getAllLeads, updateLeadById, deleteLeadById };
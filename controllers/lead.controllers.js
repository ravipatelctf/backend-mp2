const Lead = require("../models/lead.models");
const Comment = require("../models/comment.models");

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

// -----------------------------------------------------------------------------------------------

// a. Add a Comment to a Lead | 3. Comments API | anvaya.api.spec
async function addComment(leadId, agentId, commentText) {
    try {
        const newComment = new Comment({lead: leadId, author: agentId, commentText: commentText});
        const savedComment = await newComment.save();
        console.log("savedComment:", savedComment);
        return savedComment.populate(["lead", "author"]);
    } catch (error) {
        throw error;
    }
}


// b. Get All Comments for a Lead | 3. Comments API | anvaya.api.spec
async function getComments(leadId) {
    try {
        const allComments = await Comment.find({lead: leadId}).populate(["lead", "author"]);
        console.log(allComments);
        return allComments;
    } catch (error) {
        throw error;
    }
}



module.exports = { createNewLead, getAllLeads, updateLeadById, deleteLeadById, addComment, getComments };
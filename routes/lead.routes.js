const { createNewLead, getAllLeads, updateLeadById, deleteLeadById, addComment, getComments, deleteCommentById } = require("../controllers/lead.controllers");
const express = require("express");
const router = express.Router();


// a. Create a New Lead | 1. Leads API | anvaya.api.spec
router.post("/", async (req, res) => {
    const reqData = req.body;
    if (!reqData.name) {
        res
            .status(400)
            .json({ "error": "Invalid input: 'name', 'email' is required." });
    }
    try {
        const savedNewLead = await createNewLead(reqData);
        if (!savedNewLead) {
            res
                .status(404)
                .json({ "error": `Sales agent with ID ${reqData._id} not found.` })
        } else {
            res
                .status(201)
                .send(savedNewLead);
        }
    } catch (error) {
        res
            .status(500)
            .json({ error: "Failed to create data." })
    }
})


// b. Get All Leads | 1. Leads API | anvaya.api.spec
router.get("/", async (req, res) => {
    const queryObj = req.query;
    const filters = {};
    
    if (queryObj.salesAgent) filters.salesAgent = queryObj.salesAgent;
    if (queryObj.status) filters.status = queryObj.status;
    if (queryObj.tags) filters.tags = queryObj.tags;
    if (queryObj.source) filters.source = queryObj.source;

    try {
        const response = await getAllLeads(filters);
        if (!response || response.length === 0) {
            res
                .status(400)
                .json({error: "Invalid input: 'status' must be one of ['New', 'Contacted', 'Qualified', 'Proposal Sent', 'Closed']. Make sure input is in correct format."})
        } else {
            res
                .status(200)
                .send(response)
        }
    } catch (error) {
        res
            .status(500)
            .json({error: "Failed to fetch data."});
    }
})


// c. Update a Lead | 1. Leads API | anvaya.api.spec
router.put("/:id", async (req, res) => {

    if (!req.params.id || !req.body.name || !req.body.source || !req.body.salesAgent || !req.body.status || !req.body.tags || !req.body.timeToClose || !req.body.priority ) {
        res
            .status(400)
            .json({ "error" : "lead id  and all fields are required."});
    }

    try {
        const updatedLead = await updateLeadById(req.params.id, req.body);
        if (updatedLead) {
            res
                .status(200)
                .send(updatedLead);
        }
    } catch (error) {
        res
            .status(404)
            .json({ "error": `Lead with ID ${req.params.id} not found.` })
    }
})


// d. Delete a Lead | 1. Leads API | anvaya.api.spec
router.delete("/:id", async (req, res) => {
    if (!req.params.id) {
        res
            .status(400)
            .json({ error: "Lead id is required." });
    }
    try {
        const deletedLead = await deleteLeadById(req.params.id);
        if (deletedLead) {
            res
                .status(200)
                .json({ "message": "Lead deleted successfully." })
        }
    } catch (error) {
        res
            .status(404)
            .json({ "error": `Lead with ID ${req.params.id} not found.` });
    }
});

// a. Add a Comment to a Lead | 3. Comments API | anvaya.api.spec
router.post("/:id/comments", async (req, res) => {
    try {
        const { agentId, commentText} = req.body;
        const response = await addComment(req.params.id, agentId, commentText);
        if (response) {
            res
                .status(201)
                .send(response)
            }
    } catch (error) {
        res
            .status(404)
            .json({error: `Lead with ${req.params.id} not found!`});
    }
})


// b. Get All Comments for a Lead | 3. Comments API | anvaya.api.spec
router.get("/:id/comments", async (req, res) => {

    try {
        const response = await getComments(req.params.id);
        if (response) {
            res
                .status(200)
                .send(response)
            }
    } catch (error) {
        res
            .status(404)
            .json({error: `Lead with ${req.params.id} not found!`});
    }
})


// Delete a Comment 
router.delete("/:id/comments", async (req, res) => {
    if (!req.params.id) {
        res
            .status(400)
            .json({ error: "comment id is required." });
    }
    try {
        const deletedComment = await deleteCommentById(req.params.id);
        if (deletedComment) {
            res
                .status(200)
                .json({ "message": "Comment deleted successfully." })
        }
    } catch (error) {
        res
            .status(404)
            .json({ "error": `Comment with ID ${req.params.id} not found.` });
    }
});


module.exports = router;
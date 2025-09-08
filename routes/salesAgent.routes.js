const { createNewSalesAgent, getAllSalesAgents, deleteAgentById } = require("../controllers/salesAgent.controllers");
const express = require("express");
const SalesAgent = require("../models/salesAgent.models");
const router = express.Router();



// a. Create a New Sales Agent | 2. Sales Agents API | anvaya.api.spec
router.post("/", async (req, res) => {

    if (!req.body.name || !req.body.email) {
        res
            .status(400)
            .json({ "error": "All fields are required!" });
    }

    try {
        const savedNewSalesAgent = await createNewSalesAgent(req.body);
        if (!savedNewSalesAgent) {
            res
                .status(409)
                .json({ "error": `Sales agent with email ${req.body.email} already exists.` });
        } else {
            res
                .status(201)
                .send(savedNewSalesAgent);
        }
    } catch (error) {
        res
            .status(400)
            .json({ "error": "Invalid input: 'email' must be a valid email address." });
    }
})


// b. Get All Sales Agents | 2. Sales Agents API | anvaya.api.spec
router.get("/", async (req, res) => {
    try {
        const allSalesAgents = await getAllSalesAgents();

        if (!allSalesAgents || allSalesAgents.length === 0) {
            res
                .status(404)
                .json({ error: "Data Not Found!" });
        } else {
            res
                .status(200)
                .send(allSalesAgents);
        }
    } catch (error) {
        res
            .status(500)
            .json({ error: "Failed to fetch data!" })
    }
});


// Delete agent 
router.delete("/:id", async (req, res) => {
    if (!req.params.id) {
        res
            .status(400)
            .json({ error: "agent id is required." });
    }
    try {
        const deletedComment = await deleteAgentById(req.params.id);
        if (deletedComment) {
            res
                .status(200)
                .json({ "message": "Agent deleted successfully." })
        }
    } catch (error) {
        res
            .status(404)
            .json({ "error": `Agent with ID ${req.params.id} not found.` });
    }
});


module.exports = router;
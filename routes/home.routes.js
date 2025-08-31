const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    res.send("Hello from anvaya app home route.")
})

module.exports = router;
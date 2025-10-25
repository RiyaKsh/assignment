const express = require("express");
const router = express.Router();
const { addAgent, getAgents } = require("../controllers/agent.controller");
const protect = require("../middleware/auth.middleware");

router.post("/", protect, addAgent);
router.get("/", protect, getAgents);

module.exports = router;

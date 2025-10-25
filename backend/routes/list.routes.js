const express = require("express");
const router = express.Router();
const { uploadAndDistribute, getListsByAgent, upload } = require("../controllers/list.controller");
const protect = require("../middleware/auth.middleware");

// Upload CSV
router.post("/upload", protect, upload.single("file"), uploadAndDistribute);

// Get lists by agent
router.get("/agent/:agentId", protect, getListsByAgent);

module.exports = router;

const express = require("express");
const router = express.Router();
const { loginAdmin ,logoutAdmin} = require("../controllers/auth.controller");

// POST /api/auth/login
router.post("/login", loginAdmin);
router.post("/logout",logoutAdmin);

module.exports = router;

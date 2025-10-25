const Agent = require("../models/agent");
const bcrypt = require("bcryptjs");

// Add agent
exports.addAgent = async (req, res) => {
  const { name, email, mobile, password } = req.body;

  try {
    const exists = await Agent.findOne({ email });
    if (exists) return res.status(400).json({ message: "Agent already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const agent = await Agent.create({ name, email, mobile, password: hashedPassword });

    res.status(201).json(agent);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// Get all agents
exports.getAgents = async (req, res) => {
  try {
    const agents = await Agent.find();
    res.json(agents);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

const multer = require("multer");
const csv = require("csvtojson");
const List = require("../models/list");
const Agent = require("../models/agent");

// Configure multer
const storage = multer.memoryStorage();
exports.upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (!file.originalname.match(/\.(csv|xlsx|xls)$/)) {
      return cb(new Error("Only CSV or Excel files are allowed"));
    }
    cb(null, true);
  },
});

// Upload and distribute CSV
exports.uploadAndDistribute = async (req, res) => {
  if (!req.file) return res.status(400).json({ message: "File required" });

  try {
    const jsonArray = await csv().fromString(req.file.buffer.toString());
    const agents = await Agent.find();
    if (!agents.length) return res.status(400).json({ message: "No agents found" });

    const listsToSave = [];
    let agentIndex = 0;

    for (let i = 0; i < jsonArray.length; i++) {
      const agent = agents[agentIndex];
      listsToSave.push({
        agent: agent._id,
        firstName: jsonArray[i].FirstName,
        phone: jsonArray[i].Phone,
        notes: jsonArray[i].Notes,
      });

      agentIndex = (agentIndex + 1) % agents.length;
    }

    await List.insertMany(listsToSave);
    res.json({ message: "Lists distributed successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Get lists per agent
exports.getListsByAgent = async (req, res) => {
  try {
    const lists = await List.find({ agent: req.params.agentId }).populate("agent", "name email");
    res.json(lists);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

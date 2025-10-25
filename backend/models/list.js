const mongoose = require("mongoose");

const listSchema = new mongoose.Schema({
  agent: { type: mongoose.Schema.Types.ObjectId, ref: "Agent", required: true },
  firstName: { type: String, required: true },
  phone: { type: String, required: true },
  notes: { type: String },
});

module.exports = mongoose.model("List", listSchema);

const mongoose = require("mongoose");

const emergencySchema = new mongoose.Schema({

  patient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  location: {
    type: String,
    required: true,
  },

  reason: {
    type: String,
    required: true,
  },

  status: {
    type: String,
    enum: ["Pending", "Dispatched", "Completed"],
    default: "Pending",
  },

}, { timestamps: true });

module.exports = mongoose.model("Emergency", emergencySchema);
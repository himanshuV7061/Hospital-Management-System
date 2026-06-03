const mongoose = require("mongoose");

const bedSchema = new mongoose.Schema(
  {
    bedNumber: {
      type: String,
      required: true,
      unique: true,
    },

    ward: {
      type: String,
      required: true,
    },

    type: {
      type: String,
      enum: ["General", "ICU", "Private", "Emergency"],
      default: "General",
    },

    status: {
      type: String,
      enum: ["Available", "Occupied", "Maintenance"],
      default: "Available",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Bed", bedSchema);
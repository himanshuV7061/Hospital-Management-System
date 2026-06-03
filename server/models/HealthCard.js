const mongoose = require("mongoose");

const healthCardSchema = new mongoose.Schema(
  {
    patient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    cardHolderName: {
      type: String,
      required: true,
    },

    cardNumber: {
      type: String,
      required: true,
    },

    schemeName: {
      type: String,
      default: "Ayushman Bharat",
    },

    coverageAmount: {
      type: Number,
      default: 500000,
    },

    cardFile: {
      type: String,
    },

    status: {
      type: String,
      enum: ["Pending", "Verified", "Rejected"],
      default: "Pending",
    },

    remarks: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("HealthCard", healthCardSchema);
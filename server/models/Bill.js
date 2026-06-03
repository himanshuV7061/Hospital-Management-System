const mongoose = require("mongoose");

const billSchema = new mongoose.Schema(
  {
    patient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    appointment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Appointment",
    },

    amount: {
      type: Number,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      enum: ["Unpaid", "Paid"],
      default: "Unpaid",
    },
    coveredByHealthCard: {
  type: Boolean,
  default: false,
},

coverageApplied: {
  type: Number,
  default: 0,
},

finalAmount: {
  type: Number,
},
  },
  { timestamps: true }
);

module.exports = mongoose.model("Bill", billSchema);
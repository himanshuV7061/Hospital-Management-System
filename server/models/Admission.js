const mongoose = require("mongoose");

const admissionSchema = new mongoose.Schema(
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

    ward: {
      type: String,
      required: true,
    },

    bedNumber: {
      type: String,
      required: true,
    },

    reason: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      enum: ["Admitted", "Discharged"],
      default: "Admitted",
    },

    admittedAt: {
      type: Date,
      default: Date.now,
    },

    dischargedAt: {
      type: Date,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Admission", admissionSchema);
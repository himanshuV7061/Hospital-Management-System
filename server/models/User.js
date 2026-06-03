const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },

    role: {
      type: String,
      enum: ["patient", "admin"],
      default: "patient",
    },

    age: Number,
    sex: String,
    bloodGroup: String,
    height: String,
    weight: String,
    phone: String,
    address: String,
    emergencyContact: String,
    allergies: String,
    medicalHistory: String,

    resetOtp: String,
    resetOtpExpire: Date,
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
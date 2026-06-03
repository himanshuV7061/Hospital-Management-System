const express = require("express");
const router = express.Router();

const {
  createEmergency,
  getAllEmergencies,
  updateEmergencyStatus,
} = require("../controllers/emergencyController");

const { protect } = require("../middleware/authMiddleware");

// 🧑 Patient sends request
router.post("/", protect, createEmergency);

// 🏥 Admin sees all requests
router.get("/", protect, getAllEmergencies);

// 🏥 Admin updates status
router.put("/:id", protect, updateEmergencyStatus);

module.exports = router;
const express = require("express");

const router = express.Router();

const {
  createAppointment,
  getMyAppointments,
  getAllAppointments,
  updateAppointmentStatus,
  assignDoctor,
} = require("../controllers/appointmentController");

const { protect } = require("../middleware/authMiddleware");

router.post("/", protect, createAppointment);

router.get("/my", protect, getMyAppointments);

router.get("/", protect, getAllAppointments);

router.put("/:id", protect, updateAppointmentStatus);

router.put("/:id/assign-doctor", protect, assignDoctor);

module.exports = router;
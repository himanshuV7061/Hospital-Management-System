const express = require("express");

const router = express.Router();

const {
  createDoctor,
  getDoctors,
} = require("../controllers/doctorController");

const { protect } = require("../middleware/authMiddleware");

router.post("/", protect, createDoctor);

router.get("/", protect, getDoctors);

module.exports = router;
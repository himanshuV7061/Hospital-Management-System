const express = require("express");
const router = express.Router();

const {
  admitPatient,
  getAdmissions,
  dischargePatient,
} = require("../controllers/admissionController");

const { protect } = require("../middleware/authMiddleware");

router.post("/", protect, admitPatient);

router.get("/", protect, getAdmissions);

router.put("/:id/discharge", protect, dischargePatient);

module.exports = router;
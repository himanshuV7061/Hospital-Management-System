const express = require("express");
const router = express.Router();

const {
  createMedicalRecord,
  getAllMedicalRecords,
  getMyMedicalRecords,
} = require("../controllers/medicalRecordController");

const { protect } = require("../middleware/authMiddleware");

router.post("/", protect, createMedicalRecord);

router.get("/", protect, getAllMedicalRecords);

router.get("/my", protect, getMyMedicalRecords);

module.exports = router;
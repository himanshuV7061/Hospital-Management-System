const express = require("express");
const router = express.Router();

const {
  addBed,
  getBeds,
  updateBedStatus,
} = require("../controllers/bedController");

const { protect } = require("../middleware/authMiddleware");

router.post("/", protect, addBed);

router.get("/", protect, getBeds);

router.put("/:id/status", protect, updateBedStatus);

module.exports = router;
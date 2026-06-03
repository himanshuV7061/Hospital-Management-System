const express = require("express");

const router = express.Router();

const {
  uploadReport,
  getMyReports,
  getAllReports,
} = require("../controllers/reportController");

const { protect } = require("../middleware/authMiddleware");

const upload = require("../middleware/uploadMiddleware");

router.post("/", protect, upload.single("file"), uploadReport);

router.get("/my", protect, getMyReports);

router.get("/", protect, getAllReports);

module.exports = router;
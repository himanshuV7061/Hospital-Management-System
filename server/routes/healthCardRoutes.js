const express = require("express");
const router = express.Router();

const {
  submitHealthCard,
  getMyHealthCard,
  getAllHealthCards,
  updateHealthCardStatus,
} = require("../controllers/healthCardController");

const { protect } = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");

router.post("/", protect, upload.single("cardFile"), submitHealthCard);

router.get("/my", protect, getMyHealthCard);

router.get("/", protect, getAllHealthCards);

router.put("/:id/status", protect, updateHealthCardStatus);

module.exports = router;
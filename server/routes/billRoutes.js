const express = require("express");
const router = express.Router();

const {
  createBill,
  getAllBills,
  getMyBills,
  markBillPaid,
} = require("../controllers/billController");

const { protect } = require("../middleware/authMiddleware");

router.post("/", protect, createBill);

router.get("/", protect, getAllBills);

router.get("/my", protect, getMyBills);

router.put("/:id/pay", protect, markBillPaid);

module.exports = router;
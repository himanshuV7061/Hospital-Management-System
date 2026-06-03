const HealthCard = require("../models/HealthCard");
const Bill = require("../models/Bill");


const createBill = async (req, res) => {
  try {
    const { patient, appointment, amount, description, useHealthCard } = req.body;

    let coveredByHealthCard = false;
    let coverageApplied = 0;
    let finalAmount = amount;

    if (useHealthCard) {
      const healthCard = await HealthCard.findOne({
        patient,
        status: "Verified",
      });

      if (healthCard) {
        coveredByHealthCard = true;
        coverageApplied = Math.min(amount, healthCard.coverageAmount);
        finalAmount = amount - coverageApplied;
      }
    }

    const bill = await Bill.create({
      patient,
      appointment,
      amount,
      description,
      coveredByHealthCard,
      coverageApplied,
      finalAmount,
    });

    res.status(201).json(bill);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAllBills = async (req, res) => {
  try {
    const bills = await Bill.find()
      .populate("patient", "name email")
      .populate("appointment", "department symptoms appointmentDate");

    res.json(bills);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getMyBills = async (req, res) => {
  try {
    const bills = await Bill.find({
      patient: req.user._id,
    }).populate("appointment", "department appointmentDate");

    res.json(bills);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const markBillPaid = async (req, res) => {
  try {
    const bill = await Bill.findById(req.params.id);

    if (!bill) {
      return res.status(404).json({ message: "Bill not found" });
    }

    bill.status = "Paid";

    await bill.save();

    res.json(bill);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createBill,
  getAllBills,
  getMyBills,
  markBillPaid,
};
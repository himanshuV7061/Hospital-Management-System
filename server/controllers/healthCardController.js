const HealthCard = require("../models/HealthCard");

const submitHealthCard = async (req, res) => {
  try {
    const card = await HealthCard.create({
      patient: req.user._id,
      cardHolderName: req.body.cardHolderName,
      cardNumber: req.body.cardNumber,
      schemeName: req.body.schemeName || "Ayushman Bharat",
      coverageAmount: req.body.coverageAmount || 500000,
      cardFile: req.file ? req.file.path : "",
    });

    res.status(201).json(card);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getMyHealthCard = async (req, res) => {
  try {
    const card = await HealthCard.findOne({
      patient: req.user._id,
    });

    res.json(card);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAllHealthCards = async (req, res) => {
  try {
    const cards = await HealthCard.find()
      .populate("patient", "name email age sex bloodGroup");

    res.json(cards);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateHealthCardStatus = async (req, res) => {
  try {
    const { status, remarks } = req.body;

    const card = await HealthCard.findById(req.params.id);

    if (!card) {
      return res.status(404).json({
        message: "Health card not found",
      });
    }

    card.status = status;
    card.remarks = remarks || "";

    await card.save();

    res.json(card);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  submitHealthCard,
  getMyHealthCard,
  getAllHealthCards,
  updateHealthCardStatus,
};
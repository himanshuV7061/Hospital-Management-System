const Emergency = require("../models/Emergency");

// CREATE EMERGENCY REQUEST
const createEmergency = async (req, res) => {
  try {
    const emergency = await Emergency.create({
      patient: req.user._id,
      location: req.body.location,
      reason: req.body.reason,
    });

    // SOCKET.IO REAL-TIME ALERT
    const io = req.app.get("io");

    if (io) {
      io.emit("newEmergency", emergency);
    }

    res.status(201).json(emergency);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET ALL EMERGENCIES
const getAllEmergencies = async (req, res) => {
  try {
    const emergencies = await Emergency.find()
      .populate("patient", "name email");

    res.json(emergencies);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// UPDATE EMERGENCY STATUS
const updateEmergencyStatus = async (req, res) => {
  try {
    const emergency = await Emergency.findById(req.params.id);

    if (!emergency) {
      return res.status(404).json({
        message: "Emergency request not found",
      });
    }

    emergency.status = req.body.status;

    await emergency.save();

    res.json(emergency);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createEmergency,
  getAllEmergencies,
  updateEmergencyStatus,
};
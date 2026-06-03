const MedicalRecord = require("../models/MedicalRecord");

const createMedicalRecord = async (req, res) => {
  try {
    const { patient, appointment, diagnosis, prescription, notes } = req.body;

    const record = await MedicalRecord.create({
      patient,
      appointment,
      diagnosis,
      prescription,
      notes,
    });

    res.status(201).json(record);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAllMedicalRecords = async (req, res) => {
  try {
    const records = await MedicalRecord.find()
      .populate("patient", "name email age sex bloodGroup")
      .populate("appointment", "department symptoms appointmentDate");

    res.json(records);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getMyMedicalRecords = async (req, res) => {
  try {
    const records = await MedicalRecord.find({
      patient: req.user._id,
    }).populate("appointment", "department symptoms appointmentDate");

    res.json(records);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createMedicalRecord,
  getAllMedicalRecords,
  getMyMedicalRecords,
};
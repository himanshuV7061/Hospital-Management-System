const Admission = require("../models/Admission");

const admitPatient = async (req, res) => {
  try {
    const { patient, appointment, ward, bedNumber, reason } = req.body;

    const admission = await Admission.create({
      patient,
      appointment,
      ward,
      bedNumber,
      reason,
    });

    res.status(201).json(admission);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAdmissions = async (req, res) => {
  try {
    const admissions = await Admission.find()
      .populate("patient", "name email age sex bloodGroup")
      .populate("appointment", "department symptoms appointmentDate status");

    res.json(admissions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const dischargePatient = async (req, res) => {
  try {
    const admission = await Admission.findById(req.params.id);

    if (!admission) {
      return res.status(404).json({ message: "Admission not found" });
    }

    admission.status = "Discharged";
    admission.dischargedAt = Date.now();

    await admission.save();

    res.json(admission);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  admitPatient,
  getAdmissions,
  dischargePatient,
};
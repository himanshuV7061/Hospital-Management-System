const Appointment = require("../models/Appointment");
const sendEmail = require("../utils/sendEmail");

const createAppointment = async (req, res) => {
  try {
    const { department, doctor, symptoms, appointmentDate } = req.body;

    const appointment = await Appointment.create({
      patient: req.user._id,
      doctor,
      department,
      symptoms,
      appointmentDate,
    });

    const io = req.app.get("io");

    if (io) {
      io.emit("newAppointment", appointment);
    }

    res.status(201).json(appointment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getMyAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find({
      patient: req.user._id,
    }).populate("doctor", "name specialization department");

    res.json(appointments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAllAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find()
      .populate("patient", "name email")
      .populate("doctor", "name specialization department");

    res.json(appointments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateAppointmentStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const appointment = await Appointment.findById(req.params.id).populate(
      "patient",
      "name email"
    );

    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    appointment.status = status;

    await appointment.save();

    if (appointment.patient?.email) {
      await sendEmail(
        appointment.patient.email,
        "Appointment Status Updated",
        `Hello ${appointment.patient.name}, your appointment status has been updated to: ${status}.`
      );
    }

    res.json(appointment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const assignDoctor = async (req, res) => {
  try {
    const { doctorId } = req.body;

    const appointment = await Appointment.findById(req.params.id);

    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    appointment.doctor = doctorId;

    await appointment.save();

    res.json(appointment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createAppointment,
  getMyAppointments,
  getAllAppointments,
  updateAppointmentStatus,
  assignDoctor,
};
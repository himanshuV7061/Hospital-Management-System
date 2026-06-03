const Doctor = require("../models/Doctor");



// create doctor
const createDoctor = async (req, res) => {

  try {

    const doctor = await Doctor.create(req.body);

    res.status(201).json(doctor);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};




// get all doctors
const getDoctors = async (req, res) => {

  try {

    const doctors = await Doctor.find();

    res.json(doctors);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};




module.exports = {
  createDoctor,
  getDoctors,
};
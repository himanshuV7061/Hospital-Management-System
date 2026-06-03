const Report = require("../models/Report");

const uploadReport = async (req, res) => {
  try {

    const report = await Report.create({
      patient: req.user._id,
      title: req.body.title,
      file: req.file.path,
    });

    res.status(201).json(report);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};

const getMyReports = async (req, res) => {
  try {

    const reports = await Report.find({
      patient: req.user._id,
    });

    res.json(reports);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};

const getAllReports = async (req, res) => {
  try {
    const reports = await Report.find()
      .populate("patient", "name email");

    res.json(reports);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  uploadReport,
  getMyReports,
  getAllReports,
};
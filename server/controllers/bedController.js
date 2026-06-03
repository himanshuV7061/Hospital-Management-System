const Bed = require("../models/Bed");

const addBed = async (req, res) => {
  try {
    const bed = await Bed.create(req.body);
    res.status(201).json(bed);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getBeds = async (req, res) => {
  try {
    const beds = await Bed.find();
    res.json(beds);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateBedStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const bed = await Bed.findById(req.params.id);

    if (!bed) {
      return res.status(404).json({ message: "Bed not found" });
    }

    bed.status = status;
    await bed.save();

    res.json(bed);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  addBed,
  getBeds,
  updateBedStatus,
};
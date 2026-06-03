const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const sendEmail = require("../utils/sendEmail");
const { OAuth2Client } = require("google-auth-library");

const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
};

// REGISTER USER
const registerUser = async (req, res) => {
  try {
    const { name, email, password, age, sex, bloodGroup } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      age,
      sex,
      bloodGroup,
    });

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user._id),
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// LOGIN USER
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: generateToken(user._id),
      });
    } else {
      res.status(401).json({
        message: "Invalid email or password",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// GOOGLE LOGIN
const googleLogin = async (req, res) => {
  try {
    const { credential } = req.body;

    const ticket = await googleClient.verifyIdToken({
      idToken: credential,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();

    const { name, email } = payload;

    let user = await User.findOne({ email });

    if (!user) {
      const randomPassword = Math.random().toString(36).slice(-8);

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(randomPassword, salt);

      user = await User.create({
        name,
        email,
        password: hashedPassword,
        role: "patient",
      });
    }

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user._id),
    });
  } catch (error) {
    res.status(401).json({
      message: "Google login failed",
    });
  }
};

// FORGOT PASSWORD - SEND OTP
const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    user.resetOtp = otp;
    user.resetOtpExpire = Date.now() + 10 * 60 * 1000;

    await user.save();

    await sendEmail(
      user.email,
      "Password Reset OTP",
      `Your password reset OTP is ${otp}. It is valid for 10 minutes.`
    );

    res.json({
      message: "OTP sent to email",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// VERIFY OTP
const verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;

    const user = await User.findOne({
      email,
      resetOtp: otp,
      resetOtpExpire: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({
        message: "Invalid or expired OTP",
      });
    }

    res.json({
      message: "OTP verified",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// RESET PASSWORD
const resetPassword = async (req, res) => {
  try {
    const { email, otp, newPassword } = req.body;

    const user = await User.findOne({
      email,
      resetOtp: otp,
      resetOtpExpire: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({
        message: "Invalid or expired OTP",
      });
    }

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);

    user.resetOtp = undefined;
    user.resetOtpExpire = undefined;

    await user.save();

    res.json({
      message: "Password reset successful",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


const getProfile = async (req, res) => {
  try {
    res.json(req.user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.name = req.body.name || user.name;
    user.age = req.body.age || user.age;
    user.sex = req.body.sex || user.sex;
    user.bloodGroup = req.body.bloodGroup || user.bloodGroup;
    user.height = req.body.height || user.height;
    user.weight = req.body.weight || user.weight;
    user.phone = req.body.phone || user.phone;
    user.address = req.body.address || user.address;
    user.emergencyContact =
      req.body.emergencyContact || user.emergencyContact;
    user.allergies = req.body.allergies || user.allergies;
    user.medicalHistory =
      req.body.medicalHistory || user.medicalHistory;

    await user.save();

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      age: user.age,
      sex: user.sex,
      bloodGroup: user.bloodGroup,
      height: user.height,
      weight: user.weight,
      phone: user.phone,
      address: user.address,
      emergencyContact: user.emergencyContact,
      allergies: user.allergies,
      medicalHistory: user.medicalHistory,
      token: req.headers.authorization.split(" ")[1],
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  registerUser,
  loginUser,
  googleLogin,
  forgotPassword,
  verifyOtp,
  resetPassword,
  getProfile,
  updateProfile
};
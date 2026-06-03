const express = require("express");
const cors = require("cors");
const http = require("http");
const path = require("path");
const { Server } = require("socket.io");

require("dotenv").config();

const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const appointmentRoutes = require("./routes/appointmentRoutes");
const emergencyRoutes = require("./routes/emergencyRoutes");
const doctorRoutes = require("./routes/doctorRoutes");
const admissionRoutes = require("./routes/admissionRoutes");
const medicalRecordRoutes = require("./routes/medicalRecordRoutes");
const bedRoutes = require("./routes/bedRoutes");
const billRoutes = require("./routes/billRoutes");
const reportRoutes = require("./routes/reportRoutes");

const app = express();

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT"],
  },
});

app.set("io", io);

app.use(cors());
app.use(express.json());

connectDB();

io.on("connection", (socket) => {
  console.log("Socket connected:", socket.id);

  socket.on("disconnect", () => {
    console.log("Socket disconnected:", socket.id);
  });
});

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/api/auth", authRoutes);
app.use("/api/appointments", appointmentRoutes);
app.use("/api/emergencies", emergencyRoutes);
app.use("/api/doctors", doctorRoutes);
app.use("/api/admissions", admissionRoutes);
app.use("/api/medical-records", medicalRecordRoutes);
app.use("/api/beds", bedRoutes);
app.use("/api/bills", billRoutes);
app.use("/api/reports", reportRoutes);

app.get("/", (req, res) => {
  res.send("Hospital Management API Running");
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

const healthCardRoutes = require("./routes/healthCardRoutes");
app.use("/api/health-cards", healthCardRoutes);
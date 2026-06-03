import { io } from "socket.io-client";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";

import { getAllAppointments } from "../services/appointmentService";

function AdminDashboard() {
  const [appointments, setAppointments] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctors, setSelectedDoctors] = useState({});
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchAppointments();
    fetchDoctors();

    const socket = io("https://hospital-management-system-4kjr.onrender.com");

    socket.on("newAppointment", () => {
      alert("New appointment booked!");
      fetchAppointments();
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const getTokenConfig = () => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));

    return {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
  };

  const fetchAppointments = async () => {
    try {
      const data = await getAllAppointments();
      setAppointments(data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchDoctors = async () => {
    try {
      const { data } = await axios.get(
        "https://hospital-management-system-4kjr.onrender.com/api/doctors",
        getTokenConfig()
      );

      setDoctors(data);
    } catch (error) {
      console.log(error);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await axios.put(
        `https://hospital-management-system-4kjr.onrender.com/api/appointments/${id}`,
        { status },
        getTokenConfig()
      );

      alert("Status Updated");
      fetchAppointments();
    } catch (error) {
      console.log(error);
      alert("Failed to update status");
    }
  };

  const assignDoctor = async (appointmentId) => {
    try {
      const doctorId = selectedDoctors[appointmentId];

      if (!doctorId) {
        alert("Please select a doctor first");
        return;
      }

      await axios.put(
        `https://hospital-management-system-4kjr.onrender.com/api/appointments/${appointmentId}/assign-doctor`,
        { doctorId },
        getTokenConfig()
      );

      alert("Doctor Assigned");
      fetchAppointments();
    } catch (error) {
      console.log(error);
      alert("Failed to assign doctor");
    }
  };

  const filteredAppointments = appointments.filter((appointment) => {
    const patientName = appointment.patient?.name?.toLowerCase() || "";
    const department = appointment.department?.toLowerCase() || "";
    const status = appointment.status?.toLowerCase() || "";

    return (
      patientName.includes(search.toLowerCase()) ||
      department.includes(search.toLowerCase()) ||
      status.includes(search.toLowerCase())
    );
  });

  const statusStyle = (status) => {
    if (status === "Approved") return "bg-green-500/20 text-green-300 border-green-400/30";
    if (status === "Rejected") return "bg-red-500/20 text-red-300 border-red-400/30";
    if (status === "Completed") return "bg-blue-500/20 text-blue-300 border-blue-400/30";
    return "bg-yellow-500/20 text-yellow-300 border-yellow-400/30";
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Navbar />

      <div className="p-10">
        <div className="relative overflow-hidden bg-gradient-to-r from-blue-700 via-cyan-600 to-teal-500 p-8 rounded-3xl shadow-2xl mb-10">
          <div className="absolute right-[-50px] top-[-50px] w-52 h-52 bg-white/20 rounded-full blur-3xl"></div>

          <p className="text-cyan-100 font-semibold mb-2">
            Appointment Control
          </p>

          <h1 className="text-5xl font-black mb-3">
            Hospital Appointments
          </h1>

          <p className="text-blue-50">
            Manage patient bookings, assign doctors, and update treatment workflow status.
          </p>
        </div>

        <input
          type="text"
          placeholder="Search by patient, department, or status..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-white/10 border border-white/10 text-white placeholder:text-slate-400 p-4 rounded-2xl mb-8 outline-none focus:border-cyan-400"
        />

        <div className="grid gap-6">
          {filteredAppointments.map((appointment) => (
            <div
              key={appointment._id}
              className="bg-white/10 border border-white/10 p-6 rounded-3xl shadow-xl"
            >
              <div className="flex justify-between gap-4 flex-wrap mb-4">
                <div>
                  <h2 className="text-3xl font-black">
                    {appointment.patient?.name}
                  </h2>

                  <p className="text-slate-300">
                    {appointment.patient?.email}
                  </p>
                </div>

                <span
                  className={`px-4 py-2 rounded-full border font-bold h-fit ${statusStyle(
                    appointment.status
                  )}`}
                >
                  {appointment.status}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-slate-300 mb-5">
                <p>
                  <span className="text-white font-semibold">Department:</span>{" "}
                  {appointment.department}
                </p>

                <p>
                  <span className="text-white font-semibold">Date:</span>{" "}
                  {new Date(appointment.appointmentDate).toLocaleDateString()}
                </p>

                <p>
                  <span className="text-white font-semibold">Symptoms:</span>{" "}
                  {appointment.symptoms}
                </p>
              </div>

              <p className="mb-5 text-slate-300">
                <span className="text-white font-semibold">
                  Assigned Doctor:
                </span>{" "}
                {appointment.doctor
                  ? `Dr. ${appointment.doctor.name} (${appointment.doctor.specialization})`
                  : "Not assigned"}
              </p>

              <div className="flex gap-3 flex-wrap mb-5">
                <select
                  className="bg-slate-900 border border-white/10 p-3 rounded-xl text-white"
                  value={selectedDoctors[appointment._id] || ""}
                  onChange={(e) =>
                    setSelectedDoctors({
                      ...selectedDoctors,
                      [appointment._id]: e.target.value,
                    })
                  }
                >
                  <option value="">Select Doctor</option>

                  {doctors.map((doctor) => (
                    <option key={doctor._id} value={doctor._id}>
                      Dr. {doctor.name} - {doctor.specialization}
                    </option>
                  ))}
                </select>

                <button
                  onClick={() => assignDoctor(appointment._id)}
                  className="bg-purple-600 px-5 py-3 rounded-xl font-bold hover:bg-purple-500"
                >
                  Assign Doctor
                </button>
              </div>

              <div className="flex gap-3 flex-wrap">
                <button
                  onClick={() => updateStatus(appointment._id, "Approved")}
                  className="bg-green-600 px-5 py-3 rounded-xl font-bold hover:bg-green-500"
                >
                  Approve
                </button>

                <button
                  onClick={() => updateStatus(appointment._id, "Rejected")}
                  className="bg-red-600 px-5 py-3 rounded-xl font-bold hover:bg-red-500"
                >
                  Reject
                </button>

                <button
                  onClick={() => updateStatus(appointment._id, "Completed")}
                  className="bg-blue-600 px-5 py-3 rounded-xl font-bold hover:bg-blue-500"
                >
                  Complete
                </button>
              </div>
            </div>
          ))}

          {filteredAppointments.length === 0 && (
            <div className="bg-white/10 border border-white/10 p-8 rounded-3xl">
              No appointments found.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
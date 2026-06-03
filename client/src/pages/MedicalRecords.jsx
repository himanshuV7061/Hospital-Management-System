import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";

function MedicalRecords() {
  const [records, setRecords] = useState([]);
  const [appointments, setAppointments] = useState([]);

  const [formData, setFormData] = useState({
    patient: "",
    appointment: "",
    diagnosis: "",
    prescription: "",
    notes: "",
  });

  useEffect(() => {
    fetchRecords();
    fetchAppointments();
  }, []);

  const getConfig = () => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));

    return {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
  };

  const fetchRecords = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:5000/api/medical-records",
        getConfig()
      );

      setRecords(data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchAppointments = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:5000/api/appointments",
        getConfig()
      );

      setAppointments(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleAppointmentSelect = (e) => {
    const appointmentId = e.target.value;

    const selectedAppointment = appointments.find(
      (appointment) => appointment._id === appointmentId
    );

    setFormData({
      ...formData,
      appointment: appointmentId,
      patient: selectedAppointment?.patient?._id || "",
    });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        "http://localhost:5000/api/medical-records",
        formData,
        getConfig()
      );

      alert("Medical Record Added");

      setFormData({
        patient: "",
        appointment: "",
        diagnosis: "",
        prescription: "",
        notes: "",
      });

      fetchRecords();
    } catch (error) {
      console.log(error);
      alert("Failed to add medical record");
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Navbar />

      <div className="p-10">
        <div className="relative overflow-hidden bg-gradient-to-r from-blue-700 via-indigo-700 to-violet-600 p-8 rounded-3xl shadow-2xl mb-10">
          <div className="absolute right-[-50px] top-[-50px] w-52 h-52 bg-white/20 rounded-full blur-3xl"></div>

          <p className="text-blue-100 font-semibold mb-2">
            Treatment Documentation
          </p>

          <h1 className="text-5xl font-black mb-3">
            Medical Records
          </h1>

          <p className="text-blue-50">
            Add diagnosis, prescriptions and doctor notes linked to patient appointments.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white/10 border border-white/10 p-6 rounded-3xl shadow-xl mb-10"
        >
          <h2 className="text-3xl font-black mb-6">
            Add Treatment Record
          </h2>

          <select
            name="appointment"
            value={formData.appointment}
            onChange={handleAppointmentSelect}
            className="w-full bg-slate-900 border border-white/10 p-4 rounded-2xl text-white mb-4"
          >
            <option value="">Select Appointment</option>

            {appointments.map((appointment) => (
              <option key={appointment._id} value={appointment._id}>
                {appointment.patient?.name} - {appointment.department}
              </option>
            ))}
          </select>

          <input
            type="text"
            name="diagnosis"
            placeholder="Diagnosis"
            value={formData.diagnosis}
            onChange={handleChange}
            className="w-full bg-slate-900 border border-white/10 p-4 rounded-2xl text-white placeholder:text-slate-400 mb-4"
          />

          <textarea
            name="prescription"
            placeholder="Prescription"
            value={formData.prescription}
            onChange={handleChange}
            className="w-full bg-slate-900 border border-white/10 p-4 rounded-2xl text-white placeholder:text-slate-400 mb-4"
          />

          <textarea
            name="notes"
            placeholder="Doctor Notes"
            value={formData.notes}
            onChange={handleChange}
            className="w-full bg-slate-900 border border-white/10 p-4 rounded-2xl text-white placeholder:text-slate-400"
          />

          <button
            type="submit"
            className="mt-5 bg-blue-500 px-6 py-3 rounded-xl font-black hover:bg-blue-400"
          >
            Add Record
          </button>
        </form>

        <div className="grid gap-6">
          {records.map((record) => (
            <div
              key={record._id}
              className="bg-white/10 border border-white/10 p-6 rounded-3xl shadow-xl"
            >
              <h2 className="text-3xl font-black">
                {record.patient?.name}
              </h2>

              <p className="text-slate-300 mt-1">
                {record.patient?.email}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-slate-300 mt-5">
                <p>
                  <span className="text-white font-semibold">
                    Diagnosis:
                  </span>{" "}
                  {record.diagnosis}
                </p>

                <p>
                  <span className="text-white font-semibold">
                    Appointment:
                  </span>{" "}
                  {record.appointment?.department || "Not linked"}
                </p>

                <p>
                  <span className="text-white font-semibold">
                    Prescription:
                  </span>{" "}
                  {record.prescription}
                </p>
              </div>

              <p className="text-slate-300 mt-4">
                <span className="text-white font-semibold">Notes:</span>{" "}
                {record.notes || "No notes"}
              </p>
            </div>
          ))}

          {records.length === 0 && (
            <div className="bg-white/10 border border-white/10 p-8 rounded-3xl">
              No medical records added yet.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default MedicalRecords;
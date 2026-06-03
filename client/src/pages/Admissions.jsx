import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";

function Admissions() {
  const [admissions, setAdmissions] = useState([]);
  const [appointments, setAppointments] = useState([]);

  const [formData, setFormData] = useState({
    patient: "",
    appointment: "",
    ward: "",
    bedNumber: "",
    reason: "",
  });

  useEffect(() => {
    fetchAdmissions();
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

  const fetchAdmissions = async () => {
    try {
      const { data } = await axios.get(
        "https://hospital-management-system-4kjr.onrender.com/api/admissions",
        getConfig()
      );

      setAdmissions(data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchAppointments = async () => {
    try {
      const { data } = await axios.get(
        "https://hospital-management-system-4kjr.onrender.com/api/appointments",
        getConfig()
      );

      setAppointments(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleAppointmentSelect = (e) => {
    const selectedAppointment = appointments.find(
      (appointment) => appointment._id === e.target.value
    );

    setFormData({
      ...formData,
      appointment: e.target.value,
      patient: selectedAppointment?.patient?._id || "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        "https://hospital-management-system-4kjr.onrender.com/api/admissions",
        formData,
        getConfig()
      );

      alert("Patient Admitted");

      setFormData({
        patient: "",
        appointment: "",
        ward: "",
        bedNumber: "",
        reason: "",
      });

      fetchAdmissions();
    } catch (error) {
      console.log(error);
      alert("Admission Failed");
    }
  };

  const dischargePatient = async (id) => {
    try {
      await axios.put(
        `https://hospital-management-system-4kjr.onrender.com/api/admissions/${id}/discharge`,
        {},
        getConfig()
      );

      alert("Patient Discharged");
      fetchAdmissions();
    } catch (error) {
      console.log(error);
      alert("Discharge Failed");
    }
  };

  const statusStyle = (status) => {
    if (status === "Discharged") {
      return "bg-green-500/20 text-green-300 border-green-400/30";
    }

    return "bg-orange-500/20 text-orange-300 border-orange-400/30";
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Navbar />

      <div className="p-10">
        <div className="relative overflow-hidden bg-gradient-to-r from-orange-600 via-amber-600 to-yellow-500 p-8 rounded-3xl shadow-2xl mb-10">
          <div className="absolute right-[-50px] top-[-50px] w-52 h-52 bg-white/20 rounded-full blur-3xl"></div>

          <p className="text-orange-100 font-semibold mb-2">
            Inpatient Workflow
          </p>

          <h1 className="text-5xl font-black mb-3">
            Admissions & Discharge
          </h1>

          <p className="text-orange-50">
            Admit patients, assign beds and wards, and manage discharge workflows.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white/10 border border-white/10 p-6 rounded-3xl shadow-xl mb-10"
        >
          <h2 className="text-3xl font-black mb-6">
            Admit Patient
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              name="ward"
              placeholder="Ward"
              value={formData.ward}
              onChange={handleChange}
              className="bg-slate-900 border border-white/10 p-4 rounded-2xl text-white placeholder:text-slate-400"
            />

            <input
              type="text"
              name="bedNumber"
              placeholder="Bed Number"
              value={formData.bedNumber}
              onChange={handleChange}
              className="bg-slate-900 border border-white/10 p-4 rounded-2xl text-white placeholder:text-slate-400"
            />
          </div>

          <textarea
            name="reason"
            placeholder="Reason for admission"
            value={formData.reason}
            onChange={handleChange}
            className="w-full bg-slate-900 border border-white/10 p-4 rounded-2xl text-white placeholder:text-slate-400 mt-4"
          />

          <button
            type="submit"
            className="mt-5 bg-orange-500 text-slate-950 px-6 py-3 rounded-xl font-black hover:bg-orange-400"
          >
            Admit Patient
          </button>
        </form>

        <div className="grid gap-6">
          {admissions.map((admission) => (
            <div
              key={admission._id}
              className="bg-white/10 border border-white/10 p-6 rounded-3xl shadow-xl"
            >
              <div className="flex justify-between gap-4 flex-wrap mb-4">
                <div>
                  <h2 className="text-3xl font-black">
                    {admission.patient?.name}
                  </h2>

                  <p className="text-slate-300">
                    {admission.patient?.email}
                  </p>
                </div>

                <span
                  className={`px-4 py-2 rounded-full border font-bold h-fit ${statusStyle(
                    admission.status
                  )}`}
                >
                  {admission.status}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-slate-300">
                <p>
                  <span className="text-white font-semibold">Ward:</span>{" "}
                  {admission.ward}
                </p>

                <p>
                  <span className="text-white font-semibold">Bed:</span>{" "}
                  {admission.bedNumber}
                </p>

                <p>
                  <span className="text-white font-semibold">Reason:</span>{" "}
                  {admission.reason}
                </p>
              </div>

              {admission.status !== "Discharged" && (
                <button
                  onClick={() => dischargePatient(admission._id)}
                  className="mt-5 bg-red-600 px-5 py-3 rounded-xl font-bold hover:bg-red-500"
                >
                  Discharge Patient
                </button>
              )}
            </div>
          ))}

          {admissions.length === 0 && (
            <div className="bg-white/10 border border-white/10 p-8 rounded-3xl">
              No admissions found.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Admissions;
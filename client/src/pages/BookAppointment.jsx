import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import { createAppointment } from "../services/appointmentService";

function BookAppointment() {
  const [doctors, setDoctors] = useState([]);

  const [formData, setFormData] = useState({
    department: "",
    doctor: "",
    symptoms: "",
    appointmentDate: "",
  });

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    try {
      const userInfo = JSON.parse(localStorage.getItem("userInfo"));

      const { data } = await axios.get(
        "https://hospital-management-system-4kjr.onrender.com/api/doctors",
        {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        }
      );

      setDoctors(data);
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await createAppointment(formData);

      alert("Appointment Booked Successfully");

      setFormData({
        department: "",
        doctor: "",
        symptoms: "",
        appointmentDate: "",
      });
    } catch (error) {
      console.log(error);
      alert("Failed to book appointment");
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Navbar />

      <div className="p-10">
        <div className="relative overflow-hidden bg-gradient-to-r from-cyan-700 via-blue-700 to-indigo-700 p-8 rounded-3xl shadow-2xl mb-10">
          <div className="absolute right-[-50px] top-[-50px] w-52 h-52 bg-white/20 rounded-full blur-3xl"></div>

          <p className="text-cyan-100 font-semibold mb-2">
            Patient Scheduling
          </p>

          <h1 className="text-5xl font-black mb-3">
            Book Appointment
          </h1>

          <p className="text-cyan-50">
            Schedule consultations with doctors and hospital departments quickly.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white/10 border border-white/10 rounded-3xl p-8 shadow-2xl max-w-4xl"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="text-slate-300 block mb-2">
                Department
              </label>

              <input
                type="text"
                name="department"
                placeholder="Enter department"
                value={formData.department}
                onChange={handleChange}
                className="w-full bg-slate-900/80 border border-white/10 p-4 rounded-2xl text-white placeholder:text-slate-500 outline-none focus:border-cyan-400"
                required
              />
            </div>

            <div>
              <label className="text-slate-300 block mb-2">
                Select Doctor
              </label>

              <select
                name="doctor"
                value={formData.doctor}
                onChange={handleChange}
                className="w-full bg-slate-900/80 border border-white/10 p-4 rounded-2xl text-white outline-none focus:border-cyan-400"
                required
              >
                <option value="">Choose doctor</option>

                {doctors.map((doctor) => (
                  <option key={doctor._id} value={doctor._id}>
                    Dr. {doctor.name} - {doctor.specialization}
                  </option>
                ))}
              </select>
            </div>

            <div className="md:col-span-2">
              <label className="text-slate-300 block mb-2">
                Symptoms
              </label>

              <textarea
                name="symptoms"
                placeholder="Describe your symptoms"
                value={formData.symptoms}
                onChange={handleChange}
                className="w-full bg-slate-900/80 border border-white/10 p-4 rounded-2xl text-white placeholder:text-slate-500 outline-none focus:border-cyan-400 min-h-[120px]"
                required
              />
            </div>

            <div>
              <label className="text-slate-300 block mb-2">
                Appointment Date
              </label>

              <input
                type="date"
                name="appointmentDate"
                value={formData.appointmentDate}
                onChange={handleChange}
                className="w-full bg-slate-900/80 border border-white/10 p-4 rounded-2xl text-white outline-none focus:border-cyan-400"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="mt-8 bg-cyan-400 text-slate-950 px-8 py-4 rounded-2xl font-black hover:bg-cyan-300 transition"
          >
            Book Appointment
          </button>
        </form>
      </div>
    </div>
  );
}

export default BookAppointment;
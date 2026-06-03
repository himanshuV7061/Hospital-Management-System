import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";

function Doctors() {
  const [doctors, setDoctors] = useState([]);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    specialization: "",
    department: "",
    experience: "",
  });

  useEffect(() => {
    fetchDoctors();
  }, []);

  const getConfig = () => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));

    return {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
  };

  const fetchDoctors = async () => {
    try {
      const { data } = await axios.get(
        "https://hospital-management-system-4kjr.onrender.com/api/doctors",
        getConfig()
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
      await axios.post(
        "https://hospital-management-system-4kjr.onrender.com/api/doctors",
        formData,
        getConfig()
      );

      alert("Doctor Added");

      setFormData({
        name: "",
        email: "",
        specialization: "",
        department: "",
        experience: "",
      });

      fetchDoctors();
    } catch (error) {
      console.log(error);
      alert("Failed to add doctor");
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Navbar />

      <div className="p-10">
        <div className="relative overflow-hidden bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 p-8 rounded-3xl shadow-2xl mb-10">
          <div className="absolute right-[-50px] top-[-50px] w-52 h-52 bg-white/20 rounded-full blur-3xl"></div>

          <p className="text-emerald-100 font-semibold mb-2">
            Medical Staff Control
          </p>

          <h1 className="text-5xl font-black mb-3">
            Doctor Management
          </h1>

          <p className="text-emerald-50">
            Add doctors, manage specialties, and prepare them for patient assignment.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white/10 border border-white/10 p-6 rounded-3xl shadow-xl mb-10"
        >
          <h2 className="text-3xl font-black mb-6">
            Add Doctor
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              name="name"
              placeholder="Doctor Name"
              value={formData.name}
              onChange={handleChange}
              className="bg-slate-900 border border-white/10 p-4 rounded-2xl text-white placeholder:text-slate-400"
            />

            <input
              type="email"
              name="email"
              placeholder="Doctor Email"
              value={formData.email}
              onChange={handleChange}
              className="bg-slate-900 border border-white/10 p-4 rounded-2xl text-white placeholder:text-slate-400"
            />

            <input
              type="text"
              name="specialization"
              placeholder="Specialization"
              value={formData.specialization}
              onChange={handleChange}
              className="bg-slate-900 border border-white/10 p-4 rounded-2xl text-white placeholder:text-slate-400"
            />

            <input
              type="text"
              name="department"
              placeholder="Department"
              value={formData.department}
              onChange={handleChange}
              className="bg-slate-900 border border-white/10 p-4 rounded-2xl text-white placeholder:text-slate-400"
            />

            <input
              type="number"
              name="experience"
              placeholder="Experience (years)"
              value={formData.experience}
              onChange={handleChange}
              className="bg-slate-900 border border-white/10 p-4 rounded-2xl text-white placeholder:text-slate-400"
            />
          </div>

          <button
            type="submit"
            className="mt-5 bg-emerald-500 text-slate-950 px-6 py-3 rounded-xl font-black hover:bg-emerald-400"
          >
            Add Doctor
          </button>
        </form>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {doctors.map((doctor) => (
            <div
              key={doctor._id}
              className="bg-white/10 border border-white/10 p-6 rounded-3xl shadow-xl"
            >
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-500 to-cyan-600 flex items-center justify-center text-2xl mb-5">
                👨‍⚕️
              </div>

              <h2 className="text-3xl font-black">
                Dr. {doctor.name}
              </h2>

              <p className="text-slate-300 mt-2">{doctor.email}</p>

              <div className="mt-5 space-y-2 text-slate-300">
                <p>
                  <span className="text-white font-semibold">
                    Specialization:
                  </span>{" "}
                  {doctor.specialization}
                </p>

                <p>
                  <span className="text-white font-semibold">
                    Department:
                  </span>{" "}
                  {doctor.department}
                </p>

                <p>
                  <span className="text-white font-semibold">
                    Experience:
                  </span>{" "}
                  {doctor.experience} years
                </p>
              </div>
            </div>
          ))}

          {doctors.length === 0 && (
            <div className="bg-white/10 border border-white/10 p-8 rounded-3xl">
              No doctors added yet.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Doctors;
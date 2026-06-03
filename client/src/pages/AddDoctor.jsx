import { useState } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";

function AddDoctor() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    specialization: "",
    department: "",
    experience: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const userInfo = JSON.parse(localStorage.getItem("userInfo"));

      await axios.post("http://localhost:5000/api/doctors", formData, {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      });

      alert("Doctor Added Successfully");

      setFormData({
        name: "",
        email: "",
        specialization: "",
        department: "",
        experience: "",
      });
    } catch (error) {
      console.log(error);
      alert("Failed to add doctor");
    }
  };

  return (
    <div className="min-h-screen bg-slate-100">
      <Navbar />

      <div className="flex justify-center mt-10">
        <form
          onSubmit={handleSubmit}
          className="bg-white p-8 rounded-xl shadow-lg w-[500px]"
        >
          <h1 className="text-3xl font-bold text-blue-600 mb-6">
            Add Doctor
          </h1>

          <input
            type="text"
            name="name"
            placeholder="Doctor Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border p-3 mb-4 rounded"
          />

          <input
            type="email"
            name="email"
            placeholder="Doctor Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border p-3 mb-4 rounded"
          />

          <input
            type="text"
            name="specialization"
            placeholder="Specialization"
            value={formData.specialization}
            onChange={handleChange}
            className="w-full border p-3 mb-4 rounded"
          />

          <input
            type="text"
            name="department"
            placeholder="Department"
            value={formData.department}
            onChange={handleChange}
            className="w-full border p-3 mb-4 rounded"
          />

          <input
            type="number"
            name="experience"
            placeholder="Experience in years"
            value={formData.experience}
            onChange={handleChange}
            className="w-full border p-3 mb-4 rounded"
          />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-3 rounded hover:bg-blue-700"
          >
            Add Doctor
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddDoctor;
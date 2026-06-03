import { useState } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";

function Emergency() {
  const [formData, setFormData] = useState({
    location: "",
    reason: "",
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

      await axios.post(
        "https://hospital-management-system-4kjr.onrender.com/api/emergencies",
        formData,
        {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        }
      );

      alert("Emergency request sent!");

      setFormData({
        location: "",
        reason: "",
      });
    } catch (error) {
      console.log(error);
      alert("Failed to send emergency request");
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Navbar />

      <div className="p-10">
        <div className="relative overflow-hidden bg-gradient-to-r from-red-700 via-rose-600 to-orange-500 p-8 rounded-3xl shadow-2xl mb-10">
          <div className="absolute right-[-50px] top-[-50px] w-52 h-52 bg-white/20 rounded-full blur-3xl"></div>

          <p className="text-red-100 font-semibold mb-2">
            Emergency Support
          </p>

          <h1 className="text-5xl font-black mb-3">
            Request Ambulance
          </h1>

          <p className="text-red-50">
            Send an urgent ambulance request to hospital emergency control.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white/10 border border-white/10 rounded-3xl p-8 shadow-2xl max-w-3xl"
        >
          <div className="mb-5">
            <label className="text-slate-300 block mb-2">
              Current Location
            </label>

            <input
              type="text"
              name="location"
              placeholder="Enter your location"
              value={formData.location}
              onChange={handleChange}
              className="w-full bg-slate-900/80 border border-white/10 p-4 rounded-2xl text-white placeholder:text-slate-500 outline-none focus:border-red-400"
              required
            />
          </div>

          <div className="mb-5">
            <label className="text-slate-300 block mb-2">
              Emergency Reason
            </label>

            <textarea
              name="reason"
              placeholder="Describe the emergency"
              value={formData.reason}
              onChange={handleChange}
              className="w-full bg-slate-900/80 border border-white/10 p-4 rounded-2xl text-white placeholder:text-slate-500 outline-none focus:border-red-400 min-h-[140px]"
              required
            />
          </div>

          <button
            type="submit"
            className="bg-red-500 text-white px-8 py-4 rounded-2xl font-black hover:bg-red-400 transition"
          >
            🚑 Send Emergency Request
          </button>
        </form>
      </div>
    </div>
  );
}

export default Emergency;
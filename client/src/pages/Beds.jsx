import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";

function Beds() {
  const [beds, setBeds] = useState([]);

  const [formData, setFormData] = useState({
    bedNumber: "",
    ward: "",
    type: "General",
  });

  useEffect(() => {
    fetchBeds();
  }, []);

  const getConfig = () => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));

    return {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
  };

  const fetchBeds = async () => {
    try {
      const { data } = await axios.get(
        "https://hospital-management-system-4kjr.onrender.com/api/beds",
        getConfig()
      );

      setBeds(data);
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

  const addBed = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        "https://hospital-management-system-4kjr.onrender.com/api/beds",
        formData,
        getConfig()
      );

      alert("Bed Added");

      setFormData({
        bedNumber: "",
        ward: "",
        type: "General",
      });

      fetchBeds();
    } catch (error) {
      console.log(error);
      alert("Failed to add bed");
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await axios.put(
        `https://hospital-management-system-4kjr.onrender.com/api/beds/${id}/status`,
        { status },
        getConfig()
      );

      fetchBeds();
    } catch (error) {
      console.log(error);
      alert("Failed to update bed");
    }
  };

  const statusStyle = (status) => {
    if (status === "Available") {
      return "bg-green-500/20 text-green-300 border-green-400/30";
    }

    if (status === "Occupied") {
      return "bg-red-500/20 text-red-300 border-red-400/30";
    }

    return "bg-yellow-500/20 text-yellow-300 border-yellow-400/30";
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Navbar />

      <div className="p-10">
        <div className="relative overflow-hidden bg-gradient-to-r from-violet-700 via-purple-600 to-fuchsia-500 p-8 rounded-3xl shadow-2xl mb-10">
          <div className="absolute right-[-50px] top-[-50px] w-52 h-52 bg-white/20 rounded-full blur-3xl"></div>

          <p className="text-violet-100 font-semibold mb-2">
            Capacity Control
          </p>

          <h1 className="text-5xl font-black mb-3">
            Bed Management
          </h1>

          <p className="text-violet-50">
            Track availability of ICU, emergency, private, and general hospital beds.
          </p>
        </div>

        <form
          onSubmit={addBed}
          className="bg-white/10 border border-white/10 p-6 rounded-3xl shadow-xl mb-10"
        >
          <h2 className="text-3xl font-black mb-6">
            Add Bed
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input
              type="text"
              name="bedNumber"
              placeholder="Bed Number"
              value={formData.bedNumber}
              onChange={handleChange}
              className="bg-slate-900 border border-white/10 p-4 rounded-2xl text-white placeholder:text-slate-400"
            />

            <input
              type="text"
              name="ward"
              placeholder="Ward"
              value={formData.ward}
              onChange={handleChange}
              className="bg-slate-900 border border-white/10 p-4 rounded-2xl text-white placeholder:text-slate-400"
            />

            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="bg-slate-900 border border-white/10 p-4 rounded-2xl text-white"
            >
              <option value="General">General</option>
              <option value="ICU">ICU</option>
              <option value="Private">Private</option>
              <option value="Emergency">Emergency</option>
            </select>
          </div>

          <button
            type="submit"
            className="mt-5 bg-violet-500 text-white px-6 py-3 rounded-xl font-black hover:bg-violet-400"
          >
            Add Bed
          </button>
        </form>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {beds.map((bed) => (
            <div
              key={bed._id}
              className="bg-white/10 border border-white/10 p-6 rounded-3xl shadow-xl"
            >
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-violet-500 to-fuchsia-600 flex items-center justify-center text-2xl mb-5">
                🛏️
              </div>

              <div className="flex justify-between items-start gap-4">
                <h2 className="text-3xl font-black">
                  Bed {bed.bedNumber}
                </h2>

                <span
                  className={`px-3 py-1 rounded-full border font-bold text-sm ${statusStyle(
                    bed.status
                  )}`}
                >
                  {bed.status}
                </span>
              </div>

              <div className="mt-5 space-y-2 text-slate-300">
                <p>
                  <span className="text-white font-semibold">Ward:</span>{" "}
                  {bed.ward}
                </p>

                <p>
                  <span className="text-white font-semibold">Type:</span>{" "}
                  {bed.type}
                </p>
              </div>

              <div className="flex gap-2 mt-5 flex-wrap">
                <button
                  onClick={() => updateStatus(bed._id, "Available")}
                  className="bg-green-600 px-4 py-2 rounded-xl font-bold hover:bg-green-500"
                >
                  Available
                </button>

                <button
                  onClick={() => updateStatus(bed._id, "Occupied")}
                  className="bg-red-600 px-4 py-2 rounded-xl font-bold hover:bg-red-500"
                >
                  Occupied
                </button>

                <button
                  onClick={() => updateStatus(bed._id, "Maintenance")}
                  className="bg-yellow-500 text-slate-950 px-4 py-2 rounded-xl font-bold hover:bg-yellow-400"
                >
                  Maintenance
                </button>
              </div>
            </div>
          ))}

          {beds.length === 0 && (
            <div className="bg-white/10 border border-white/10 p-8 rounded-3xl">
              No beds added yet.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Beds;
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import { io } from "socket.io-client";

function AdminEmergency() {
  const [emergencies, setEmergencies] = useState([]);

  useEffect(() => {
    fetchEmergencies();

    const socket = io("https://hospital-management-system-4kjr.onrender.com");

    socket.on("newEmergency", () => {
      alert("🚑 New emergency request received!");
      fetchEmergencies();
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const getConfig = () => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));

    return {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
  };

  const fetchEmergencies = async () => {
    try {
      const { data } = await axios.get(
        "https://hospital-management-system-4kjr.onrender.com/api/emergencies",
        getConfig()
      );

      setEmergencies(data);
    } catch (error) {
      console.log(error);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await axios.put(
        `https://hospital-management-system-4kjr.onrender.com/api/emergencies/${id}`,
        { status },
        getConfig()
      );

      fetchEmergencies();
    } catch (error) {
      console.log(error);
    }
  };

  const statusStyle = (status) => {
    if (status === "Dispatched")
      return "bg-blue-500/20 text-blue-300 border-blue-400/30";

    if (status === "Completed")
      return "bg-green-500/20 text-green-300 border-green-400/30";

    return "bg-red-500/20 text-red-300 border-red-400/30";
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Navbar />

      <div className="p-10">
        <div className="relative overflow-hidden bg-gradient-to-r from-red-700 via-rose-600 to-orange-500 p-8 rounded-3xl shadow-2xl mb-10">
          <div className="absolute right-[-50px] top-[-50px] w-52 h-52 bg-white/20 rounded-full blur-3xl"></div>

          <p className="text-red-100 font-semibold mb-2">
            Emergency Control
          </p>

          <h1 className="text-5xl font-black mb-3">
            Ambulance Requests
          </h1>

          <p className="text-red-50">
            Track incoming emergency requests and dispatch hospital support instantly.
          </p>
        </div>

        <div className="grid gap-6">
          {emergencies.map((e) => (
            <div
              key={e._id}
              className="bg-white/10 border border-white/10 rounded-3xl p-6 shadow-xl"
            >
              <div className="flex justify-between gap-4 flex-wrap mb-4">
                <div>
                  <h2 className="text-3xl font-black">
                    {e.patient?.name}
                  </h2>

                  <p className="text-slate-300">
                    {e.patient?.email}
                  </p>
                </div>

                <span
                  className={`px-4 py-2 rounded-full border font-bold h-fit ${statusStyle(
                    e.status
                  )}`}
                >
                  {e.status}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-slate-300 mb-5">
                <p>
                  <span className="text-white font-semibold">
                    Location:
                  </span>{" "}
                  {e.location}
                </p>

                <p>
                  <span className="text-white font-semibold">
                    Reason:
                  </span>{" "}
                  {e.reason}
                </p>
              </div>

              <div className="flex gap-3 flex-wrap">
                <button
                  onClick={() => updateStatus(e._id, "Dispatched")}
                  className="bg-blue-600 px-5 py-3 rounded-xl font-bold hover:bg-blue-500"
                >
                  Dispatch
                </button>

                <button
                  onClick={() => updateStatus(e._id, "Completed")}
                  className="bg-green-600 px-5 py-3 rounded-xl font-bold hover:bg-green-500"
                >
                  Complete
                </button>
              </div>
            </div>
          ))}

          {emergencies.length === 0 && (
            <div className="bg-white/10 border border-white/10 p-8 rounded-3xl">
              No emergency requests found.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AdminEmergency;
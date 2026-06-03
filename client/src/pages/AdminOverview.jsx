import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import axios from "axios";

function AdminOverview() {
  const [loading, setLoading] = useState(true);

  const [stats, setStats] = useState({
    appointments: 0,
    doctors: 0,
    beds: 0,
    emergencies: 0,
    admissions: 0,
    bills: 0,
  });

  useEffect(() => {
    fetchStats();
  }, []);

  const getConfig = () => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));

    return {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
  };

  const fetchStats = async () => {
    try {
      const [
        appointmentsRes,
        doctorsRes,
        bedsRes,
        emergenciesRes,
        admissionsRes,
        billsRes,
      ] = await Promise.all([
        axios.get("https://hospital-management-system-4kjr.onrender.com/api/appointments", getConfig()),
        axios.get("https://hospital-management-system-4kjr.onrender.com/api/doctors", getConfig()),
        axios.get("https://hospital-management-system-4kjr.onrender.com/api/beds", getConfig()),
        axios.get("https://hospital-management-system-4kjr.onrender.com/api/emergencies", getConfig()),
        axios.get("https://hospital-management-system-4kjr.onrender.com/api/admissions", getConfig()),
        axios.get("https://hospital-management-system-4kjr.onrender.com/api/bills", getConfig()),
      ]);

      setStats({
        appointments: appointmentsRes.data.length,
        doctors: doctorsRes.data.length,
        beds: bedsRes.data.length,
        emergencies: emergenciesRes.data.length,
        admissions: admissionsRes.data.length,
        bills: billsRes.data.length,
      });

      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const cards = [
    {
      title: "Appointments",
      value: stats.appointments,
      link: "/admin-dashboard",
      icon: "📅",
      color: "from-cyan-500 to-blue-600",
    },
    {
      title: "Doctors",
      value: stats.doctors,
      link: "/doctors",
      icon: "👨‍⚕️",
      color: "from-emerald-500 to-teal-600",
    },
    {
      title: "Beds",
      value: stats.beds,
      link: "/beds",
      icon: "🛏️",
      color: "from-violet-500 to-purple-600",
    },
    {
      title: "Emergencies",
      value: stats.emergencies,
      link: "/admin-emergency",
      icon: "🚑",
      color: "from-red-500 to-rose-600",
    },
    {
      title: "Admissions",
      value: stats.admissions,
      link: "/admissions",
      icon: "🏥",
      color: "from-orange-500 to-amber-600",
    },
    {
      title: "Bills",
      value: stats.bills,
      link: "/billing",
      icon: "💳",
      color: "from-slate-700 to-slate-900",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Navbar />

      <div className="p-10">
        <div className="relative overflow-hidden bg-gradient-to-r from-blue-700 via-cyan-600 to-teal-500 p-8 rounded-3xl shadow-2xl mb-10">
          <div className="absolute right-[-40px] top-[-40px] w-48 h-48 bg-white/20 rounded-full blur-2xl"></div>

          <p className="text-cyan-100 font-semibold mb-2">
            Hospital Control Center
          </p>

          <h1 className="text-5xl font-black mb-3">
            Admin Overview
          </h1>

          <p className="text-blue-50 max-w-3xl">
            Monitor live operations across appointments, emergencies,
            doctors, admissions, billing, beds and patient services.
          </p>
        </div>

        {loading ? (
          <div className="bg-white/10 border border-white/10 p-6 rounded-2xl">
            Loading dashboard stats...
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {cards.map((card) => (
              <Link
                key={card.title}
                to={card.link}
                className="group bg-white/10 border border-white/10 rounded-3xl p-6 hover:bg-white/15 transition shadow-xl"
              >
                <div
                  className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${card.color} flex items-center justify-center text-2xl mb-6 shadow-lg`}
                >
                  {card.icon}
                </div>

                <h2 className="text-xl text-slate-300">
                  {card.title}
                </h2>

                <p className="text-6xl font-black mt-3">
                  {card.value}
                </p>

                <p className="text-cyan-300 mt-4 group-hover:translate-x-1 transition">
                  Manage →
                </p>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminOverview;
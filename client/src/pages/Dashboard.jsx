import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";

function Dashboard() {
  const user = JSON.parse(localStorage.getItem("userInfo"));

  const cards = [
    {
      icon: "📅",
      title: "Book Appointment",
      text: "Schedule a visit with hospital departments.",
      link: "/book-appointment",
    },
    {
      icon: "🗂️",
      title: "My Appointments",
      text: "Track status and assigned doctor.",
      link: "/my-appointments",
    },
    {
      icon: "🚑",
      title: "Emergency",
      text: "Request ambulance support immediately.",
      link: "/emergency",
    },
    {
      icon: "📋",
      title: "Medical Records",
      text: "View diagnosis, prescriptions, and notes.",
      link: "/my-medical-records",
    },
    {
      icon: "📁",
      title: "Reports",
      text: "Upload and view medical reports.",
      link: "/my-reports",
    },
    {
      icon: "🪪",
      title: "Health Card",
      text: "Submit Ayushman/government health card.",
      link: "/my-health-card",
    },
    {
      icon: "💳",
      title: "Bills",
      text: "View billing and payment status.",
      link: "/my-bills",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Navbar />

      <div className="p-10">
        <div className="relative overflow-hidden bg-gradient-to-r from-cyan-600 via-blue-700 to-indigo-800 p-8 rounded-3xl shadow-2xl mb-10">
          <div className="absolute right-[-50px] top-[-50px] w-52 h-52 bg-white/20 rounded-full blur-3xl"></div>

          <p className="text-cyan-100 font-semibold mb-2">
            Patient Portal
          </p>

          <h1 className="text-5xl font-black mb-3">
            Welcome, {user?.name}
          </h1>

          <p className="text-blue-50">
            Manage appointments, reports, health card, billing and emergency requests from one place.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {cards.map((card) => (
            <Link
              key={card.title}
              to={card.link}
              className="group bg-white/10 border border-white/10 rounded-3xl p-6 hover:bg-white/15 transition shadow-xl"
            >
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-2xl mb-6 shadow-lg">
                {card.icon}
              </div>

              <h2 className="text-2xl font-bold text-white mb-2">
                {card.title}
              </h2>

              <p className="text-slate-300">
                {card.text}
              </p>

              <p className="text-cyan-300 mt-5 group-hover:translate-x-1 transition">
                Open →
              </p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
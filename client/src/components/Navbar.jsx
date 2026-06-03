import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  const logoutHandler = () => {
    localStorage.removeItem("userInfo");
    navigate("/login");
  };

  return (
    <div className="sticky top-0 z-50 px-4 pt-4">
      <nav className="backdrop-blur-xl bg-white/10 border border-white/20 text-white px-6 py-4 rounded-3xl shadow-2xl">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-3xl font-black tracking-wide">
            HMS<span className="text-cyan-400">.</span>
          </h1>

          <button
            onClick={logoutHandler}
            className="bg-white text-slate-950 px-5 py-2 rounded-full font-bold hover:bg-cyan-300 transition"
          >
            Logout
          </button>
        </div>

        <div className="flex gap-4 items-center flex-wrap">
          {userInfo?.role === "patient" && (
            <>
              <Link className="nav-pill" to="/dashboard">
                <span>🏠</span>
                <span>Dashboard</span>
              </Link>

              <Link to="/profile">👤 Profile</Link>

              <Link className="nav-pill" to="/book-appointment">
                <span>📅</span>
                <span>Book Appointment</span>
              </Link>

              <Link className="nav-pill" to="/my-appointments">
                <span>🗂️</span>
                <span>Appointments</span>
              </Link>

              <Link className="nav-pill" to="/emergency">
                <span>🚑</span>
                <span>Emergency</span>
              </Link>

              <Link className="nav-pill" to="/my-medical-records">
                <span>📋</span>
                <span>Records</span>
              </Link>

              <Link className="nav-pill" to="/my-reports">
                <span>📁</span>
                <span>Reports</span>
              </Link>

              <Link className="nav-pill" to="/my-health-card">
                <span>🪪</span>
                <span>Health Card</span>
              </Link>

              <Link className="nav-pill" to="/my-bills">
                <span>💳</span>
                <span>Bills</span>
              </Link>
            </>
          )}

          {userInfo?.role === "admin" && (
            <>
              <Link className="nav-pill" to="/admin-overview">
                <span>📊</span>
                <span>Overview</span>
              </Link>

              <Link className="nav-pill" to="/admin-dashboard">
                <span>📅</span>
                <span>Appointments</span>
              </Link>

              <Link className="nav-pill" to="/admin-emergency">
                <span>🚑</span>
                <span>Emergencies</span>
              </Link>

              <Link className="nav-pill" to="/doctors">
                <span>👨‍⚕️</span>
                <span>Doctors</span>
              </Link>

              <Link className="nav-pill" to="/admissions">
                <span>🏥</span>
                <span>Admissions</span>
              </Link>

              <Link className="nav-pill" to="/beds">
                <span>🛏️</span>
                <span>Beds</span>
              </Link>

              <Link className="nav-pill" to="/medical-records">
                <span>📋</span>
                <span>Records</span>
              </Link>

              <Link className="nav-pill" to="/reports">
                <span>📁</span>
                <span>Reports</span>
              </Link>

              <Link className="nav-pill" to="/health-cards">
                <span>🪪</span>
                <span>Health Cards</span>
              </Link>

              <Link className="nav-pill" to="/billing">
                <span>💳</span>
                <span>Billing</span>
              </Link>
            </>
          )}
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
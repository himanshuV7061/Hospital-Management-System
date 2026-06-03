import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 text-white">
      <nav className="px-10 py-6 flex justify-between items-center">
        <h1 className="text-3xl font-black tracking-wide">
          HMS<span className="text-cyan-400">.</span>
        </h1>

        <div className="flex gap-4">
          <Link to="/login" className="px-5 py-2 rounded-lg hover:bg-white/10">
            Login
          </Link>

          <Link
            to="/register"
            className="bg-cyan-400 text-slate-950 px-5 py-2 rounded-lg font-bold hover:bg-cyan-300"
          >
            Register
          </Link>
        </div>
      </nav>

      <section className="px-10 py-20 grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <p className="text-cyan-400 font-semibold mb-4">
            Smart Healthcare Workflow Platform
          </p>

          <h1 className="text-6xl font-black leading-tight mb-6">
            Manage hospitals faster, smarter, and in real time.
          </h1>

          <p className="text-slate-300 text-lg mb-8 max-w-2xl">
            A full-stack HMS with appointments, emergencies, doctors,
            admissions, beds, billing, reports, health cards, and live alerts.
          </p>

          <div className="flex gap-4">
            <Link
              to="/register"
              className="bg-cyan-400 text-slate-950 px-7 py-3 rounded-xl font-bold hover:bg-cyan-300"
            >
              Get Started
            </Link>

            <Link
              to="/login"
              className="border border-cyan-400 text-cyan-300 px-7 py-3 rounded-xl font-bold hover:bg-cyan-400/10"
            >
              Login
            </Link>
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl">
          <h2 className="text-2xl font-bold mb-6">Live Hospital Control</h2>

          <div className="grid grid-cols-2 gap-4">
            {[
              "Appointments",
              "Emergency Alerts",
              "Doctor Assignment",
              "Bed Tracking",
              "Billing",
              "Health Cards",
            ].map((item) => (
              <div
                key={item}
                className="bg-white/10 border border-white/10 p-5 rounded-2xl"
              >
                <p className="text-cyan-300 font-semibold">{item}</p>
                <p className="text-sm text-slate-300 mt-2">
                  Real-time workflow ready
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../services/authService";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    age: "",
    sex: "",
    bloodGroup: "",
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
      await registerUser(formData);

      alert("Registration Successful");

      navigate("/login");
    } catch (error) {
      console.log(error);

      alert("Registration Failed");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 flex items-center justify-center px-6 py-10">
      <div className="grid lg:grid-cols-2 bg-white/10 backdrop-blur-xl border border-white/10 rounded-[40px] overflow-hidden shadow-2xl max-w-6xl w-full">
        <div className="hidden lg:flex flex-col justify-center p-14 bg-gradient-to-br from-blue-600/20 to-cyan-500/20 border-r border-white/10">
          <p className="text-cyan-300 font-semibold mb-4">
            Patient Registration
          </p>

          <h1 className="text-6xl font-black text-white leading-tight mb-6">
            Join the smarter hospital experience.
          </h1>

          <p className="text-slate-300 text-lg">
            Create your account to book appointments, manage reports,
            request ambulance support, and access your health records.
          </p>
        </div>

        <div className="p-10 lg:p-14">
          <p className="text-cyan-300 font-semibold mb-2">
            Create Account
          </p>

          <h1 className="text-5xl font-black text-white mb-8">
            Register
          </h1>

          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                className="bg-slate-900/80 border border-white/10 p-4 rounded-2xl text-white placeholder:text-slate-500 outline-none focus:border-cyan-400"
                onChange={handleChange}
                required
              />

              <input
                type="email"
                name="email"
                placeholder="Email"
                className="bg-slate-900/80 border border-white/10 p-4 rounded-2xl text-white placeholder:text-slate-500 outline-none focus:border-cyan-400"
                onChange={handleChange}
                required
              />

              <input
                type="password"
                name="password"
                placeholder="Password"
                className="bg-slate-900/80 border border-white/10 p-4 rounded-2xl text-white placeholder:text-slate-500 outline-none focus:border-cyan-400"
                onChange={handleChange}
                required
              />

              <input
                type="number"
                name="age"
                placeholder="Age"
                className="bg-slate-900/80 border border-white/10 p-4 rounded-2xl text-white placeholder:text-slate-500 outline-none focus:border-cyan-400"
                onChange={handleChange}
              />

              <select
                name="sex"
                className="bg-slate-900/80 border border-white/10 p-4 rounded-2xl text-white outline-none focus:border-cyan-400"
                onChange={handleChange}
              >
                <option value="">Select Sex</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>

              <select
                name="bloodGroup"
                className="bg-slate-900/80 border border-white/10 p-4 rounded-2xl text-white outline-none focus:border-cyan-400"
                onChange={handleChange}
              >
                <option value="">Blood Group</option>
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full mt-6 bg-cyan-400 text-slate-950 p-4 rounded-2xl font-black hover:bg-cyan-300 transition"
            >
              Create Account
            </button>

            <p className="text-center text-slate-400 mt-8">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-cyan-300 hover:text-cyan-200"
              >
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
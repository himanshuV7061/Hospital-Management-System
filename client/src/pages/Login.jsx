import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";

import { loginUser } from "../services/authService";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const redirectByRole = (data) => {
    if (data.role === "admin") {
      navigate("/admin-overview");
    } else {
      navigate("/dashboard");
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
      const data = await loginUser(formData);

      localStorage.setItem("userInfo", JSON.stringify(data));

      alert("Login Successful");

      redirectByRole(data);
    } catch (error) {
      console.log(error);

      alert("Invalid Credentials");
    }
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/auth/google-login",
        {
          credential: credentialResponse.credential,
        }
      );

      localStorage.setItem("userInfo", JSON.stringify(data));

      alert("Google Login Successful");

      redirectByRole(data);
    } catch (error) {
      console.log(error);
      alert("Google Login Failed");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 flex items-center justify-center px-6">
      <div className="grid lg:grid-cols-2 bg-white/10 backdrop-blur-xl border border-white/10 rounded-[40px] overflow-hidden shadow-2xl max-w-6xl w-full">
        
        <div className="hidden lg:flex flex-col justify-center p-14 bg-gradient-to-br from-cyan-500/20 to-blue-600/20 border-r border-white/10">
          <p className="text-cyan-300 font-semibold mb-4">
            Hospital Management System
          </p>

          <h1 className="text-6xl font-black text-white leading-tight mb-6">
            Smart healthcare starts here.
          </h1>

          <p className="text-slate-300 text-lg">
            Secure appointments, emergency response, reports,
            billing, admissions, and real-time workflows.
          </p>

          <div className="grid grid-cols-2 gap-4 mt-10">
            {[
              "Appointments",
              "Emergency",
              "Doctors",
              "Billing",
            ].map((item) => (
              <div
                key={item}
                className="bg-white/10 border border-white/10 rounded-2xl p-4 text-white font-semibold"
              >
                {item}
              </div>
            ))}
          </div>
        </div>

        <div className="p-10 lg:p-14">
          <p className="text-cyan-300 font-semibold mb-2">
            Welcome Back
          </p>

          <h1 className="text-5xl font-black text-white mb-8">
            Login
          </h1>

          <form onSubmit={handleSubmit}>
            <div className="mb-5">
              <label className="text-slate-300 block mb-2">
                Email
              </label>

              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                className="w-full bg-slate-900/80 border border-white/10 p-4 rounded-2xl text-white placeholder:text-slate-500 outline-none focus:border-cyan-400"
                onChange={handleChange}
              />
            </div>

            <div className="mb-5">
              <label className="text-slate-300 block mb-2">
                Password
              </label>

              <input
                type="password"
                name="password"
                placeholder="Enter your password"
                className="w-full bg-slate-900/80 border border-white/10 p-4 rounded-2xl text-white placeholder:text-slate-500 outline-none focus:border-cyan-400"
                onChange={handleChange}
              />
            </div>

            <button
              type="submit"
              className="w-full bg-cyan-400 text-slate-950 p-4 rounded-2xl font-black hover:bg-cyan-300 transition"
            >
              Login
            </button>

            <p className="text-center mt-5">
              <Link
                to="/forgot-password"
                className="text-cyan-300 hover:text-cyan-200"
              >
                Forgot Password?
              </Link>
            </p>

            <div className="my-6 flex items-center gap-3">
              <div className="h-px bg-white/10 flex-1"></div>

              <span className="text-slate-400 text-sm">
                OR
              </span>

              <div className="h-px bg-white/10 flex-1"></div>
            </div>

            <div className="flex justify-center">
              <GoogleLogin
                onSuccess={handleGoogleSuccess}
                onError={() => {
                  alert("Google Login Failed");
                }}
              />
            </div>

            <p className="text-center text-slate-400 mt-8">
              Don’t have an account?{" "}
              <Link
                to="/register"
                className="text-cyan-300 hover:text-cyan-200"
              >
                Register
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
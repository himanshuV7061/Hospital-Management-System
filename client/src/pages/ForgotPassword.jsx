import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function ForgotPassword() {
  const navigate = useNavigate();

  const [step, setStep] = useState(1);

  const [formData, setFormData] = useState({
    email: "",
    otp: "",
    newPassword: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const sendOtp = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        "https://hospital-management-system-4kjr.onrender.com/api/auth/forgot-password",
        {
          email: formData.email,
        }
      );

      alert("OTP sent to your email");
      setStep(2);
    } catch (error) {
      console.log(error);
      alert("Failed to send OTP");
    }
  };

  const resetPassword = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        "https://hospital-management-system-4kjr.onrender.com/api/auth/reset-password",
        {
          email: formData.email,
          otp: formData.otp,
          newPassword: formData.newPassword,
        }
      );

      alert("Password reset successful");

      navigate("/login");
    } catch (error) {
      console.log(error);
      alert("Invalid OTP or reset failed");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 flex items-center justify-center px-6">
      <div className="grid lg:grid-cols-2 bg-white/10 backdrop-blur-xl border border-white/10 rounded-[40px] overflow-hidden shadow-2xl max-w-5xl w-full">

        <div className="hidden lg:flex flex-col justify-center p-14 bg-gradient-to-br from-violet-600/20 to-cyan-500/20 border-r border-white/10">
          <p className="text-cyan-300 font-semibold mb-4">
            Account Recovery
          </p>

          <h1 className="text-6xl font-black text-white leading-tight mb-6">
            Secure your hospital account again.
          </h1>

          <p className="text-slate-300 text-lg">
            Reset your password securely using OTP verification and regain access to your healthcare dashboard.
          </p>

          <div className="grid grid-cols-2 gap-4 mt-10">
            {[
              "OTP Verification",
              "Secure Reset",
              "JWT Security",
              "Google Login",
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
            Password Recovery
          </p>

          <h1 className="text-5xl font-black text-white mb-8">
            Forgot Password
          </h1>

          {step === 1 && (
            <form onSubmit={sendOtp}>
              <label className="text-slate-300 block mb-2">
                Registered Email
              </label>

              <input
                type="email"
                name="email"
                placeholder="Enter your registered email"
                value={formData.email}
                onChange={handleChange}
                className="w-full bg-slate-900/80 border border-white/10 p-4 rounded-2xl text-white placeholder:text-slate-500 outline-none focus:border-cyan-400 mb-6"
                required
              />

              <button
                type="submit"
                className="w-full bg-cyan-400 text-slate-950 p-4 rounded-2xl font-black hover:bg-cyan-300 transition"
              >
                Send OTP
              </button>
            </form>
          )}

          {step === 2 && (
            <form onSubmit={resetPassword}>
              <label className="text-slate-300 block mb-2">
                OTP
              </label>

              <input
                type="text"
                name="otp"
                placeholder="Enter OTP"
                value={formData.otp}
                onChange={handleChange}
                className="w-full bg-slate-900/80 border border-white/10 p-4 rounded-2xl text-white placeholder:text-slate-500 outline-none focus:border-cyan-400 mb-5"
                required
              />

              <label className="text-slate-300 block mb-2">
                New Password
              </label>

              <input
                type="password"
                name="newPassword"
                placeholder="Enter new password"
                value={formData.newPassword}
                onChange={handleChange}
                className="w-full bg-slate-900/80 border border-white/10 p-4 rounded-2xl text-white placeholder:text-slate-500 outline-none focus:border-cyan-400 mb-6"
                required
              />

              <button
                type="submit"
                className="w-full bg-green-500 text-white p-4 rounded-2xl font-black hover:bg-green-400 transition"
              >
                Reset Password
              </button>
            </form>
          )}

          <p className="text-center text-slate-400 mt-8">
            Back to{" "}
            <Link
              to="/login"
              className="text-cyan-300 hover:text-cyan-200"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
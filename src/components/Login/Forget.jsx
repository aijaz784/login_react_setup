import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

const Forget = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const forgetPassword = async () => {
    if (!email) {
      toast.error("Please enter your email!");
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:7000/auth/forget-password",
        { email },
        { withCredentials: true }
      );

      toast.success(res.data.message || "Reset link sent to your email!", {
        autoClose: 1000,
      });

      setTimeout(() => {
        navigate("/");
      }, 1000);
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Failed to send reset link!",
        { autoClose: 2000 }
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-300 via-white to-green-100 relative overflow-hidden">
      {/* Soft glowing circles */}
      <div className="absolute top-10 left-10 w-48 h-48 bg-green-400/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-10 right-10 w-56 h-56 bg-emerald-300/30 rounded-full blur-2xl animate-pulse"></div>

      {/* Main Card */}
      <div className="relative bg-white/80 backdrop-blur-xl border border-green-200 rounded-3xl shadow-2xl w-[400px] p-10 transform transition duration-300 hover:scale-[1.02]">
        {/* Title */}
        <h1 className="text-4xl font-extrabold text-center text-green-700 mb-2">
          Forgot Password?
        </h1>
        <p className="text-center text-gray-600 mb-6 text-sm">
          Don’t worry 🌱 Just enter your registered email, <br />
          we’ll send you a reset link.
        </p>

        {/* Email Field */}
        <div className="mb-6">
          <label className="block text-sm font-semibold mb-2 text-gray-700">
            Email Address
          </label>
          <input
            type="email"
            placeholder="you@example.com"
            className="w-full p-3 rounded-lg border border-gray-300 bg-white/70 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 transition"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {/* Reset Button */}
        <button
          onClick={forgetPassword}
          className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white py-3 rounded-lg font-semibold transition-all shadow-md active:scale-95"
        >
          Send Reset Link
        </button>

        {/* Back to Login */}
        <div className="text-sm text-center mt-6 text-green-700 font-medium">
          Remembered your password?{" "}
          <Link
            to="/"
            className="underline hover:text-emerald-700 transition-colors"
          >
            Sign In
          </Link>
        </div>

        {/* Footer */}
        <p className="text-xs text-gray-500 mt-8 text-center italic">
          “Forget password — but never forget self-care 💚”
        </p>
      </div>
    </div>
  );
};

export default Forget;


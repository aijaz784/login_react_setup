import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import showpassword from "../../assets/showpassword.svg";
import hidepassword from "../../assets/hidepassword.svg";

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const togglePassword = () => setShowPassword((prev) => !prev);

  const handleReset = async () => {
    if (!password || !confirmPassword) {
      toast.error("Please fill both fields!");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    try {
      const res = await axios.post(
        `http://localhost:7000/auth/reset-password/${token}`,
        { newPassword: password }
      );

      toast.success(res.data.message || "Password reset successfully!");
      setTimeout(() => navigate("/"), 1000);
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong!");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-200 via-white to-green-100 relative overflow-hidden">
      {/* Animated glowing background */}
      <div className="absolute top-10 left-10 w-48 h-48 bg-green-400/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-10 right-10 w-56 h-56 bg-emerald-300/30 rounded-full blur-2xl animate-pulse"></div>

      {/* Reset Password Card */}
      <div className="relative bg-white/80 backdrop-blur-xl border border-green-200 rounded-3xl shadow-2xl w-[400px] p-10 transform transition duration-300 hover:scale-[1.02]">
        {/* Title */}
        <h1 className="text-4xl font-extrabold text-center text-green-700 mb-3 tracking-tight">
          Reset Password 🔐
        </h1>
        <p className="text-center text-gray-600 mb-8 text-sm">
          Set a new password and continue your{" "}
          <span className="text-emerald-600 font-semibold">HealthMate</span>{" "}
          journey stronger 💪
        </p>

        {/* New Password Field */}
        <div className="mb-5 relative">
          <label className="block text-sm font-semibold mb-2 text-gray-700">
            New Password
          </label>
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Enter new password"
            className="w-full p-3 rounded-lg border border-gray-300 bg-white/70 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition pr-10"
            onChange={(e) => setPassword(e.target.value)}
          />
          <img
            src={showPassword ? hidepassword : showpassword}
            alt="toggle"
            onClick={togglePassword}
            className="w-5 absolute right-3 top-10 cursor-pointer opacity-70 hover:opacity-100 transition"
          />
        </div>

        {/* Confirm Password Field */}
        <div className="mb-6 relative">
          <label className="block text-sm font-semibold mb-2 text-gray-700">
            Confirm Password
          </label>
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Confirm your password"
            className="w-full p-3 rounded-lg border border-gray-300 bg-white/70 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition pr-10"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <img
            src={showPassword ? hidepassword : showpassword}
            alt="toggle"
            onClick={togglePassword}
            className="w-5 absolute right-3 top-10 cursor-pointer opacity-70 hover:opacity-100 transition"
          />
        </div>

        {/* Reset Button */}
        <button
          onClick={handleReset}
          className="w-full bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white py-3 rounded-lg font-semibold shadow-md transition-all active:scale-95"
        >
          Reset Password
        </button>

        {/* Back to Login */}
        <div className="text-sm text-center mt-6 text-emerald-700 font-medium">
          Back to{" "}
          <Link
            to="/"
            className="underline hover:text-emerald-800 transition-colors"
          >
            Sign In
          </Link>
        </div>

        {/* Footer */}
        <p className="text-xs text-gray-500 mt-8 text-center italic">
          “Keep your password strong — protect your{" "}
          <span className="text-emerald-600 font-semibold">health & data</span>{" "}
          both 💚”
        </p>
      </div>
    </div>
  );
};

export default ResetPassword;


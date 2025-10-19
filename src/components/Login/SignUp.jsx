import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import showpassword from "../../assets/showpassword.svg";
import hidepassword from "../../assets/hidepassword.svg";
import google from "../../images/google.png";

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const togglePassword = () => setShowPassword((prev) => !prev);

  const signUp = async () => {
    try {
      const res = await axios.post(
        "http://localhost:7000/auth/signup",
        { firstName, lastName, email, password },
        { withCredentials: true }
      );

      toast.success("Account created successfully!", { autoClose: 1000 });
      setTimeout(() => navigate("/"), 1000);
    } catch (err) {
      toast.error("Signup Failed: " + (err.response?.data || err.message), {
        autoClose: 2000,
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-200 via-white to-green-100 relative overflow-hidden">
      {/* Decorative glowing circles */}
      <div className="absolute top-10 left-10 w-48 h-48 bg-green-400/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-10 right-10 w-56 h-56 bg-emerald-300/25 rounded-full blur-2xl animate-pulse"></div>

      {/* Sign Up Card */}
      <div className="relative bg-white/80 backdrop-blur-xl border border-green-200 rounded-3xl shadow-2xl w-[420px] p-10 transform transition duration-300 hover:scale-[1.02]">
        {/* Header */}
        <h1 className="text-4xl font-extrabold text-center text-green-700 mb-3 tracking-tight">
          Join HealthMate 🌿
        </h1>
        <p className="text-center text-gray-600 mb-8 text-sm">
          Your <span className="text-emerald-600 font-semibold">Smart Health Partner</span> 💚 <br />
          Create an account and start your wellness journey today.
        </p>

        {/* Name Fields */}
        <div className="grid grid-cols-2 gap-3 mb-5">
          <input
            type="text"
            placeholder="First Name"
            className="w-full p-3 rounded-lg border border-gray-300 bg-white/70 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition"
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Last Name"
            className="w-full p-3 rounded-lg border border-gray-300 bg-white/70 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition"
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </div>

        {/* Email Field */}
        <div className="mb-5">
          <input
            type="email"
            placeholder="you@example.com"
            className="w-full p-3 rounded-lg border border-gray-300 bg-white/70 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        {/* Password Field */}
        <div className="mb-6 relative">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Create a strong password"
            className="w-full p-3 rounded-lg border border-gray-300 bg-white/70 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition pr-10"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <img
            src={showPassword ? hidepassword : showpassword}
            alt="toggle password"
            onClick={togglePassword}
            className="w-5 absolute right-3 top-3.5 cursor-pointer opacity-70 hover:opacity-100 transition"
          />
        </div>

        {/* Remember + Link */}
        <div className="flex justify-between items-center text-sm mb-6 text-emerald-700 font-medium">
          <label className="flex items-center space-x-2 cursor-pointer">
            <input type="checkbox" className="accent-emerald-600" />
            <span>Remember me</span>
          </label>
          <div>
            Already have an account?{" "}
            <Link
              to="/"
              className="underline hover:text-emerald-800 transition-colors"
            >
              Sign In
            </Link>
          </div>
        </div>

        {/* Sign Up Button */}
        <button
          onClick={signUp}
          className="w-full bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white py-3 rounded-lg font-semibold shadow-md transition-all active:scale-95"
        >
          Sign Up
        </button>

        {/* Divider */}
        <div className="flex items-center my-6">
          <hr className="flex-grow border-gray-300" />
          <span className="mx-2 text-xs text-gray-500 font-semibold">
            or sign up with
          </span>
          <hr className="flex-grow border-gray-300" />
        </div>

        {/* Google SignUp */}
        <div className="flex justify-center">
          <div className="border border-gray-300 py-2 px-6 rounded-lg cursor-pointer hover:bg-gray-50 active:scale-95 flex items-center gap-2 transition-all">
            <img src={google} alt="Google" className="w-6" />
            <span className="font-medium text-gray-700">Google</span>
          </div>
        </div>

        {/* Footer Disclaimer */}
        <p className="text-xs text-gray-500 mt-8 text-center italic">
          “AI is for understanding only — not for medical advice.” <br />
          <span className="text-emerald-700">
            “Yeh AI sirf samajhne ke liye hai, ilaaj ke liye nahi.” 💚
          </span>
        </p>
      </div>
    </div>
  );
};

export default SignUp;


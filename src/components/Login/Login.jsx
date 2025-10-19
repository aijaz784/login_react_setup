import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import showpassword from "../../assets/showpassword.svg";
import hidepassword from "../../assets/hidepassword.svg";
import google from "../../images/google.png";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const login = async () => {
    try {
      const res = await axios.post(
        "http://localhost:7000/auth/login",
        { email, password },
        { withCredentials: true }
      );

      localStorage.setItem("user", JSON.stringify({ email }));

      toast.success("Welcome back!", { autoClose: 1000 });

      setTimeout(() => {
        if (email === "admin@gmail.com") {
          navigate("/Dashboard");
        } else {
          navigate("/Home");
        }
      }, 1000);
    } catch (err) {
      toast.error("Login Failed: " + (err.response?.data || err.message), {
        autoClose: 2000,
      });
    }
  };

  const togglePassword = () => setShowPassword((prev) => !prev);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-200 via-white to-green-100 relative overflow-hidden">
      {/* Decorative glowing circles */}
      <div className="absolute top-10 left-10 w-48 h-48 bg-green-400/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-10 right-10 w-56 h-56 bg-emerald-300/25 rounded-full blur-2xl animate-pulse"></div>

      {/* Login Card */}
      <div className="relative bg-white/80 backdrop-blur-xl border border-green-200 rounded-3xl shadow-2xl w-[400px] p-10 transform transition duration-300 hover:scale-[1.02]">
        {/* Header */}
        <h1 className="text-4xl font-extrabold text-center text-green-700 mb-3 tracking-tight">
          Welcome Back 👋
        </h1>
        <p className="text-center text-gray-600 mb-8 text-sm">
          Log in to your{" "}
          <span className="text-emerald-600 font-semibold">HealthMate</span>{" "}
          account <br /> and continue your healthy journey.
        </p>

        {/* Email Field */}
        <div className="mb-5">
          <label className="block text-sm font-semibold mb-2 text-gray-700">
            Email Address
          </label>
          <input
            type="email"
            placeholder="you@example.com"
            className="w-full p-3 rounded-lg border border-gray-300 bg-white/70 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        {/* Password Field */}
        <div className="mb-5 relative">
          <label className="block text-sm font-semibold mb-2 text-gray-700">
            Password
          </label>
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Enter your password"
            className="w-full p-3 rounded-lg border border-gray-300 bg-white/70 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition pr-10"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <img
            src={showPassword ? hidepassword : showpassword}
            alt="toggle"
            onClick={togglePassword}
            className="w-5 absolute right-3 top-10 cursor-pointer opacity-70 hover:opacity-100 transition"
          />
        </div>

        {/* Forgot + Signup Links */}
        <div className="flex justify-between text-sm mb-6 text-emerald-700 font-medium">
          <Link
            to="/Forget"
            className="underline hover:text-emerald-800 transition-colors"
          >
            Forgot password?
          </Link>
          <Link
            to="/SignUp"
            className="underline hover:text-emerald-800 transition-colors"
          >
            Create an account
          </Link>
        </div>

        {/* Login Button */}
        <button
          onClick={login}
          className="w-full bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white py-3 rounded-lg font-semibold shadow-md transition-all active:scale-95"
        >
          Sign In
        </button>

        {/* Divider */}
        <div className="flex items-center my-6">
          <hr className="flex-grow border-gray-300" />
          <span className="mx-2 text-xs text-gray-500 font-semibold">
            or continue with
          </span>
          <hr className="flex-grow border-gray-300" />
        </div>

        {/* Google Login */}
        <div className="flex justify-center">
          <div className="border border-gray-300 py-2 px-6 rounded-lg cursor-pointer hover:bg-gray-50 active:scale-95 flex items-center gap-2 transition-all">
            <img src={google} alt="Google" className="w-6" />
            <span className="font-medium text-gray-700">Google</span>
          </div>
        </div>

        {/* Footer */}
        <p className="text-xs text-gray-500 mt-8 text-center italic">
          “Login to track your wellness, not your worries 💚” <br />
          <span className="text-emerald-700 font-medium">
            AI is here to assist — not to diagnose.
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;


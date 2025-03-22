"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useUserStore } from "../store/useStore";

export default function Login() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();
  const email = watch("email");
  const password = watch("password");
  const login = useUserStore((state) => state.login);
  const getUserByEmail = useUserStore((state) => state.getUserByEmail);
  const currentUser = useUserStore((state) => state.currentUser);

  const [showPassword, setShowPassword] = useState(false); 

  

  const onSubmit = (data) => {
    const userExists = getUserByEmail(data.email);

    if (!userExists) {
      toast.error("User not found. Please sign up.");
      setTimeout(() => {
        router.push("/signup");
      }, 2000);
      return;
    }

    const loginSuccess = login(data.email, data.password);

    if (loginSuccess) {
      toast.success("Login successful!");
      setTimeout(() => {
        router.push("/profile");
      }, 1500);
    } else {
      toast.error("Invalid credentials");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <ToastContainer position="top-right" autoClose={2000} />
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-xl shadow-md h-screen ">
        <h1 className="text-2xl font-bold text-black ">
          Sign in to your PopX account
        </h1>
        <p className="text-gray-600">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 ">
          <div>
            <label className="block text-sm font-medium text-indigo-700">
              Email Address
            </label>
            <input
              type="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address",
                },
              })}
              className="w-full px-3 py-2 mt-1 text-black border rounded-md"
              placeholder="Enter your email address"
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">
                {errors.email.message}
              </p>
            )}
          </div>

          <div className="relative">
            <label className="block text-sm font-medium text-indigo-700">
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"} 
              {...register("password", { required: "Password is required" })}
              className="w-full px-3 py-2 mt-1 text-black border rounded-md"
              placeholder="Enter your password"
            />
            <div
              className="absolute inset-y-0 translate-y-3.5 right-3 flex items-center cursor-pointer"
              onClick={() => setShowPassword(!showPassword)} 
            >
              {showPassword ? (
                <FaEyeSlash color="#313131" size={20} />
              ) : (
                <FaEye color="#313131" size={20} />
              )}
            </div>
            {errors.password && (
              <p className="mt-1 text-sm text-red-600">
                {errors.password.message}
              </p>
            )}
          </div>

          <button
            disabled={!email || !password}
            type="submit"
            className={`w-full py-3 mt-6 text-white rounded-md ${
              email && password
                ? "bg-[#6c25ff] hover:bg-purple-700 cursor-pointer"
                : "bg-gray-400 cursor-not-allowed"
            }`}
          >
            Login
          </button>
        </form>

        <div className="text-center">
          <Link href="/signup" className="text-[#6c25ff] ">
            Don't have an account? <span className="font-bold">Sign up</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

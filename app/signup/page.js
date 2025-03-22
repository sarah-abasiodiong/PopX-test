"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useUserStore } from "../store/useStore";
import Link from "next/link";
import { FaEye, FaEyeSlash } from "react-icons/fa"; 

export default function Signup() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const addUser = useUserStore((state) => state.addUser);
  const getUserByEmail = useUserStore((state) => state.getUserByEmail);
  const currentUser = useUserStore((state) => state.currentUser);

  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (currentUser) {
      router.push("/profile");
    }
  }, [currentUser, router]);

  const onSubmit = (data) => {
    const existingUser = getUserByEmail(data.email);

    if (existingUser) {
      toast.error("User with this email already exists");
      return;
    }

    addUser({
      fullName: data.fullName,
      phone: data.phone,
      email: data.email,
      password: data.password,
      company: data.company,
      isAgency: data.isAgency === "yes",
    });

    toast.success("Account created successfully!");
    setTimeout(() => {
      router.push("/login");
    }, 1500);
  };

  return (
    <div className="flex flex-col items-center justify-center h-full bg-gray-100 border">
      <ToastContainer position="top-right" autoClose={2000} />
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-xl shadow-md">
        <h1 className="text-2xl font-bold text-black">
          Create your PopX account
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-indigo-700">
              Full Name<span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              {...register("fullName", { required: "Full name is required" })}
              className="w-full px-3 py-2 mt-1 border rounded-md text-black"
              placeholder="Marry Doe"
            />
            {errors.fullName && (
              <p className="mt-1 text-sm text-red-600">
                {errors.fullName.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-indigo-700">
              Phone number<span className="text-red-600">*</span>
            </label>
            <input
              type="tel"
              {...register("phone", {
                required: "Phone number is required",
                pattern: {
                  value: /^[0-9]+$/,
                  message: "Please enter a valid phone number",
                },
              })}
              className="w-full px-3 py-2 mt-1 border rounded-md text-black"
              placeholder="Enter your phone number"
            />
            {errors.phone && (
              <p className="mt-1 text-sm text-red-600">
                {errors.phone.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-indigo-700">
              Email address <span className="text-red-600">*</span>
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
              className="w-full px-3 py-2 mt-1 border text-black rounded-md"
              placeholder="Enter your email"
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">
                {errors.email.message}
              </p>
            )}
          </div>

          <div className="relative">
            <label className="block text-sm font-medium text-indigo-700">
              Password<span className="text-red-600">*</span>
            </label>
            <input
              type={showPassword ? "text" : "password"} 
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters",
                },
              })}
              className="w-full px-3 py-2 mt-1 border text-black rounded-md"
              placeholder="Enter your password"
            />
            <div
              className="absolute inset-y-0 right-3 flex items-center cursor-pointer  translate-y-3.5"
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

          <div>
            <label className="block text-sm font-medium text-indigo-700">
              Company name
            </label>
            <input
              type="text"
              {...register("company")}
              className="w-full px-3 py-2 mt-1 border text-black rounded-md"
              placeholder="Marry Doe"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-indigo-700">
              Are you an Agency?*
            </label>
            <div className="flex items-center mt-2 space-x-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  value="yes"
                  {...register("isAgency", {
                    required: "Please select an option",
                  })}
                  className="w-4 h-4 text-indigo-600"
                />
                <span className="ml-2 text-black">Yes</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  value="no"
                  {...register("isAgency", {
                    required: "Please select an option",
                  })}
                  className="w-4 h-4 text-indigo-600"
                />
                <span className="ml-2 text-black">No</span>
              </label>
            </div>
            {errors.isAgency && (
              <p className="mt-1 text-sm text-red-600">
                {errors.isAgency.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full py-3 mt-6 text-white bg-[#6c25ff] rounded-md hover:bg-purple-700 cursor-pointer"
          >
            Create Account
          </button>
        </form>
        <div className="text-center">
          <Link href="/login" className="text-[#6c25ff] ">
            Already Registered? <span className="font-bold">Login</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

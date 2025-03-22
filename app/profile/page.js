"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useUserStore } from "../store/useStore";

export default function Profile() {
  const router = useRouter();
  const currentUser = useUserStore((state) => state.currentUser);
  const logout = useUserStore((state) => state.logout);


  
  if (!currentUser) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <ToastContainer position="top-right" autoClose={2000} />
      <div className="w-full max-w-md space-y-8 h-screen bg-[#f7f8f9] rounded-xl shadow-md">
        <div className="h-[100px] bg-white p-8">
          <h1 className="text-xl font-medium text-black">Account Settings</h1>
        </div>

        <div className="flex items-center space-x-4 px-8 bg-[#f7f8f9]">
          <div className="relative">
            <img
              src={`https://ui-avatars.com/api/?name=${currentUser.fullName.replace(
                " ",
                "+"
              )}&background=random`}
              alt="Profile"
              className="w-16 h-16 rounded-full"
            />
            <span className="absolute bottom-0 right-0 w-5 h-5 bg-purple-600 border-2 border-white rounded-full"></span>
          </div>

          <div>
            <h2 className="font-medium text-black">{currentUser.fullName}</h2>
            <p className="text-sm text-gray-600">{currentUser.email}</p>
          </div>
        </div>

        <div className="pt-4 px-8">
          <p className="text-sm text-gray-600">
            Lorem ipsum Dolor Sit Amet, Consetetur Sadipscing Elitr, Sed Diam
            Nonumy Eirmod Tempor Invidunt Ut Labore Et Dolore Magna Aliquyam
            Erat, Sed Diam.
          </p>
        </div>

       
      </div>
    </div>
  );
}

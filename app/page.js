"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useUserStore } from "./store/useStore";

export default function Home() {
  const router = useRouter();
  const currentUser = useUserStore((state) => state.currentUser);

 
  return (
    <div className="flex flex-col items-center justify-end min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-4 h-screen bg-white rounded-xl shadow-md flex flex-col justify-end">
        <div>
          <h1 className="text-2xl mb-2 font-bold  text-black">
            Welcome to PopX
          </h1>
          <p className=" text-gray-600">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </p>
        </div>
        <div className="pt-4">
          <Link href="/signup">
            <button className="w-full py-3 cursor-pointer text-white bg-[#6c25ff] rounded-md hover:bg-purple-700 font-semibold ">
              Create Account
            </button>
          </Link>
        </div>
        <div className="pt-2">
          <Link href="/login">
            <button className="w-full py-3 cursor-pointer text-black bg-[#cebafb] rounded-md hover:bg-purple-400">
              Already Registered?<span className="font-semibold"> Login</span>
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

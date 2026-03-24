"use client"

import { useState } from "react"
import axios from "axios"
import { useRouter } from "next/navigation";
import Image from "next/image"

export default function ResetPassword() {
  const [resetData, setResetData] = useState({
    email: "",
    password: ""
  })
  const router = useRouter(); 

  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<boolean>(false);

  const OnChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setResetData({
      ...resetData,
      [e.target.name]: e.target.value
    })
  }

  const OnSubmit = async () => {
    if (resetData.email === "" || resetData.password === "") {
      setError("Please fill all fields");
      return;
    }
    setError("");
    try {
      const res = await axios.post("http://localhost:3003/user/reset-password", resetData, {
        withCredentials: true
      });
      const data = res.data;
      if (data.status) {
        setSuccess(true);
        setTimeout(() => {
          router.push("/signin");
        }, 2000);
      } else {
        setError(data.message || "Failed to reset password");
      }
    } catch (error: any) {
      if (axios.isAxiosError(error) && error.response && error.response.data) {
        setError(error.response.data.message || "Failed to reset password");
      } else {
        setError("An error occurred. Please try again.");
      }
    }
  }

  return (
    <div className="w-screen h-screen bg-black flex items-center justify-center">
      <div className="w-[900px] h-[520px] bg-neutral-900 rounded-2xl overflow-hidden flex shadow-xl">

        {/* 🔮 LEFT INFO / GRADIENT */}
        <div className="relative w-1/2 h-full overflow-hidden bg-black">
          <div className="absolute inset-0 bg-radial-[at_50%_0%] from-purple-400 via-purple-800 to-black" />
          <div className="relative z-10 h-full flex flex-col justify-center p-10 text-white">
            <h1 className="text-3xl text-center font-semibold mb-4">
              Reset Password
            </h1>
            <p className="text-neutral-300 max-w-sm text-center">
              Enter your email and a new password to get back into your account.
            </p>
          </div>
        </div>

        {/* 🧾 RIGHT FORM */}
        <div className="w-1/2 h-full flex items-center justify-center bg-neutral-900">
          <div className="w-full px-10 text-white">

            <div className="flex items-center gap-2.5">
              <Image src="/Logo.png" alt="Logo" width={64} height={64}
                onClick={() => router.push("/")}
                className="w-16 h-16 mb-3 animate-pulse cursor-pointer" />
              <h2 className="text-2xl font-semibold mb-6">
                Update Password
              </h2>
            </div>

            <label className="text-sm">Email address</label>
            <input
              type="email"
              name="email"
              value={resetData.email}
              onChange={OnChangeHandler}
              placeholder="sample@gmail.com"
              className="w-full mt-1 mb-4 px-3 py-2 rounded-md bg-neutral-800 outline-none"
            />

            <label className="text-sm">New Password</label>
            <input
              type="password"
              name="password"
              value={resetData.password}
              onChange={OnChangeHandler}
              placeholder="Enter your new password"
              className="w-full mt-1 mb-6 px-3 py-2 rounded-md bg-neutral-800 outline-none"
            />

            {error !== "" && (
              <div className="text-md mb-2 text-center text-red-500">
                {error}
              </div>
            )}
            
            {success && (
              <div className="text-md mb-2 text-center text-green-500">
                Password updated! Redirecting to login...
              </div>
            )}

            <button
              onClick={OnSubmit}
              disabled={success}
              className={`w-full py-2 rounded-md font-medium text-black transition-colors ${
                success ? "bg-green-500" : "bg-white hover:bg-neutral-200"
              }`}
            >
              Confirm Reset
            </button>

            <p className="text-sm text-neutral-400 mt-4 text-center">
              Remember your password?{" "}
              <button
                className="text-white hover:underline cursor-pointer"
                onClick={() => router.push("/signin")}
              >
                Sign in
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

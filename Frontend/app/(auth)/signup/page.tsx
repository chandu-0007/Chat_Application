"use client";
import { redirect, useRouter } from "next/navigation";
import React, { useState } from "react";
import axios from "axios";
import Image from "next/image";

type userInfo = {
  username: string;
  email: string;
  password: string;
};

export default function SingUP() {
  const router = useRouter();
  const [SignUP, SetSignUp] = useState<userInfo>({
    username: "",
    email: "",
    password: ""
  });
  const [Error, SerError] = useState<string>("");
  const OnChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    SetSignUp({
      ...SignUP,
      [e.target.name]: e.target.value
    });
  };

  const OnSubmit = async () => {
    try {
      if (SignUP.email == "" || SignUP.password == "" || SignUP.username == "") {
        SerError("please fill all fileds");
        return;
      }
      const res = await axios.post(
        "https://chat-application-ps2v.onrender.com/user/register",
        {
          username: SignUP.username,
          email: SignUP.email,
          password: SignUP.password
        },
        { withCredentials: true }
      );

      if (res.data.status) {
        alert(res.data.message);
        router.push("dashboard");
      } else {
        SerError(res.data.message);
      }

    } catch (err) {
      alert("something went wrong");
      console.log(err);
    }
  };

  return (
    <div className="w-screen h-screen bg-black flex items-center justify-center">
      <div className="w-[900px] h-[520px] bg-neutral-900 rounded-2xl overflow-hidden flex shadow-xl">

        <div className="relative w-1/2 h-full overflow-hidden bg-black">

          {/* GRADIENT LAYER */}
          <div
            className="absolute inset-0  bg-radial-[at_50%_0%] from-purple-400 via-purple-800 to-black "


          />

          {/* CONTENT */}
          <div className="relative z-10 h-full flex flex-col justify-center p-10 text-white">
            <h1 className="text-3xl text-center font-semibold mb-4">
              Get Started with Us
            </h1>
            <p className="text-neutral-300 max-w-sm">
              Complete these easy steps to register your account.
            </p>
          </div>

        </div>

        {/* 🧾 RIGHT SIGNUP FORM */}
        <div className="w-1/2 h-full flex items-center justify-center bg-neutral-900">
          <div className="w-full px-10 text-white">
            <div className="flex items-center gap-2.5  ">
              <Image src="/Logo.png" alt="Logo" width={64} height={64}
                onClick={() => redirect("/")}
                className="w-16  h-16 mb-3 cursor-pointer animate-pulse" />
              <h2 className="text-2xl font-semibold mb-6">
                Register to our Chat.com
              </h2>
            </div>
            <label className="text-sm">Username</label>
            <input
              type="text"
              name="username"
              value={SignUP.username}
              onChange={OnChangeHandler}
              placeholder="username123"
              className="w-full mt-1 mb-4 px-3 py-2 rounded-md bg-neutral-800 outline-none"
            />

            <label className="text-sm">Email address</label>
            <input
              type="text"
              name="email"
              value={SignUP.email}
              onChange={OnChangeHandler}
              placeholder="sample@gmail.com"
              className="w-full mt-1 mb-4 px-3 py-2 rounded-md bg-neutral-800 outline-none"
            />

            <label className="text-sm">Password</label>
            <input
              type="password"
              name="password"
              value={SignUP.password}
              onChange={OnChangeHandler}
              placeholder="Enter your password"
              className="w-full mt-1 mb-6 px-3 py-2 rounded-md bg-neutral-800 outline-none"
            />
            {Error != "" && <div className=" text-md mb-1 mt-0  text-center text-red-400 ">
              {Error}
            </div>}
            <button
              onClick={OnSubmit}
              className="w-full bg-white text-black py-2 rounded-md font-medium hover:bg-neutral-200"
            >
              Submit
            </button>

            <p className="text-sm text-neutral-400 mt-4">
              If already have an account{" "}
              <button
                className="text-white hover:underline cursor-pointer"
                onClick={() => redirect("/signin")}
              >
                Login
              </button>
            </p>

          </div>
        </div>
      </div>
    </div>
  );
}

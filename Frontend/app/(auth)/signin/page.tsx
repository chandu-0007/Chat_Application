"use client"

import { useState } from "react"
import axios from "axios"
import { redirect } from "next/navigation"
export default function login() {
  const [SignIn, SetsignIn] = useState({
    email: "",
    password: ""
  })
  const [ message , SetMessage ] = useState<string>("")

  const OnChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    SetsignIn({
      ...SignIn,
      [e.target.name]: e.target.value
    })
  }
  const [Error , SetError] = useState<string>("");
  const OnSubmit = async () => {
    if(SignIn.email == "" || SignIn.password==""){
      SetError("please fill the above flieds");
      return ; 
    }
    const res = await axios.post("https://chat-application-ps2v.onrender.com/user/login", SignIn ,{
      withCredentials: true
    })
    console.log(res);
    const data = res.data;
    console.log(data);
    if (data.status) {
      alert("login successful")
      redirect("/dashboard");
    } else {
      SetError(data.message);
      SetsignIn({
        email: "",
        password: ""
      })
    }
  }
return (
  <div className="w-screen h-screen bg-black flex items-center justify-center">
    <div className="w-[900px] h-[520px] bg-neutral-900 rounded-2xl overflow-hidden flex shadow-xl">

      {/* 🔮 LEFT INFO / GRADIENT */}
      <div className="relative w-1/2 h-full overflow-hidden bg-black">

        {/* GRADIENT */}
        <div className="absolute inset-0 bg-radial-[at_50%_0%] from-purple-400 via-purple-800 to-black" />

        {/* CONTENT */}
        <div className="relative z-10 h-full flex flex-col justify-center p-10 text-white">
          <h1 className="text-3xl text-center font-semibold mb-4">
            Welcome Back
          </h1>
          <p className="text-neutral-300 max-w-sm text-center">
            Log in to continue chatting with your friends.
          </p>
        </div>

      </div>

      {/* 🧾 RIGHT SIGN IN FORM */}
      <div className="w-1/2 h-full flex items-center justify-center bg-neutral-900">
        <div className="w-full px-10 text-white">

          <div className="flex items-center gap-2.5  ">
            <img src="./Logo.png" alt=""   
            onClick={()=> redirect("/")}
             className="w-16  h-16 mb-3 animate-pulse cursor-pointer"/>
            <h2 className="text-2xl font-semibold mb-6">
            Login to Chat.com
          </h2>
          </div>

          <label className="text-sm">Email address</label>
          <input
            type="email"
            name="email"
            value={SignIn.email}
            onChange={OnChangeHandler}
            placeholder="sample@gmail.com"
            className="w-full mt-1 mb-4 px-3 py-2 rounded-md bg-neutral-800 outline-none"
          />

          <label className="text-sm">Password</label>
          <input
            type="password"
            name="password"
            value={SignIn.password}
            onChange={OnChangeHandler}
            placeholder="Enter your password"
            className="w-full mt-1 mb-6 px-3 py-2 rounded-md bg-neutral-800 outline-none"
          />
           {Error != ""   && <div className=" text-md mb-1 mt-0  text-center text-red-400 ">
              {Error}
              </div>}
          <button
            onClick={OnSubmit}
            className="w-full bg-white text-black py-2 rounded-md font-medium hover:bg-neutral-200"
          >
            Submit
          </button>

          <p className="text-sm text-neutral-400 mt-4">
            Don&apos;t have an account?{" "}
            <button
              className="text-white hover:underline cursor-pointer"
              onClick={() => redirect("/signup")}
            >
              Register
            </button>
          </p>
        </div>
      </div>
    </div>
  </div>
)
}
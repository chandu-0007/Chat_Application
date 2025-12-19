"use client"

import { useState } from "react"
import axios from "axios"
import { redirect, useRouter } from "next/navigation"
export default function login() {
  const [SignIn, SetsignIn] = useState({
    email: "",
    password: ""
  })
  const router = useRouter();

  const OnChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    SetsignIn({
      ...SignIn,
      [e.target.name]: e.target.value
    })
  }
  const OnSubmit = async () => {
    const res = await axios.post("http://localhost:3003/user/login", SignIn ,{
      withCredentials: true
    })
    const data = res.data;
    console.log(data);
    if (data.status) {
      alert("login successful")
      redirect("/dashboard");
    } else {
      alert("login failed")
      SetsignIn({
        email: "",
        password: ""
      })
    }
  }
  return (
    <>
      <div className="flex-row items-center justify-center p-28  h-screen w-screen bg-black ">
        <div className="flex justify-center text-4xl font-bold mb-10 text-white ">
          <div className="text-white "> Chat.com</div>
        </div>
        <div className="flex justify-center ">
          <div className="w-100 h-70 bg-neutral-900  border-0.5 rounded-2xl text-white   p-6 items-center flex-col justify-center">
            <div className="text-2xl text-blod mb-4  ">WELCOME BACK ! </div>
            <div>Email adderss</div>
            <input type="text"
               className="w-full rounded-lg my-2 text-white hover:border-white"
              placeholder="sample@gmail.com"
              value={SignIn.email} name="email" onChange={OnChangeHandler}></input>
            <div>Password</div>
            <input type="password" 
              className="w-full rounded-lg my-2 hover:border-white"
              placeholder="Enter your password"
            value={SignIn.password} name="password" onChange={OnChangeHandler}></input>
            <div className="flex justify-center"><button
              className="bg-white  w-full  text-black rounded-lg p-1 mt-2 items-center justify-center
                hover:bg-gray-300"
                 onClick={()=>{OnSubmit()}}>Submit</button></div>

                <div>
                   Doesn't have an account <button className="border-none text-gray-500 hover:text-lg" 
                   onClick={()=>{redirect("/signup")}}
                   >register </button> here 
                </div>
          </div>
        </div>

      </div>

    </>
  )
}
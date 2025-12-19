"use client"
import { redirect, useRouter } from "next/navigation"
import React, { useState } from "react"
import axios  from "axios"
type userInfo = {
    username : string , 
    email : string , 
    password : string
}
export default function SingUP(){
    const router = useRouter();
    const [SignUP  , SetSignUp] = useState({
            username : "" , 
            email: "",
            password :""
    })
    const OnChangeHandler = (e: React.ChangeEvent<HTMLInputElement>)=>{
     SetSignUp({
        ...SignUP , 
        [e.target.name] : e.target.value
     })
    }
    const OnSubmit = async ()=>{
    console.log({SignUP});
       try{
        const res = await axios.post("http://localhost:3003/user/register",{
          username :SignUP.username , 
          email : SignUP.email,
          password : SignUP.password,
        },{
          withCredentials:true 
        })
        const data = res.data ; 
         alert(data.message);
        if(data){
           router.push("dashboard")
        }else{
        SetSignUp({
          username:"",
          email:"",
          password : ""
        })    
        }
       }catch(err : any){
         alert("something went wrong")
         console.log(err);
       }
    }
     return (
       <>
             <div className="flex-row items-center justify-center p-28  h-screen w-screen bg-black ">
               <div className="flex justify-center text-4xl font-bold mb-10 text-white ">
                 <div className="text-white "> Chat.com</div>
               </div>
               <div className="flex justify-center ">
                 <div className="w-100 h-90 bg-neutral-900  border-0.5 rounded-2xl text-white   p-6 items-center flex-col justify-center">
                   <div className="text-2xl text-blod mb-4  ">Register to our Chat.com</div>
                   <div>Enter your username :</div>
                   <input type="text"
                      className="w-full rounded-lg my-2 text-white hover:border-white"
                     placeholder="usename123"
                     value={SignUP.username} name="username" onChange={OnChangeHandler}></input>
                   <div>Email adderss</div>
                   <input type="text"
                      className="w-full rounded-lg my-2 text-white hover:border-white"
                     placeholder="sample@gmail.com"
                     value={SignUP.email} name="email" onChange={OnChangeHandler}></input>
                   <div>Password</div>
                   <input type="password" 
                     className="w-full rounded-lg my-2 hover:border-white"
                     placeholder="Enter your password"
                   value={SignUP.password} name="password" onChange={OnChangeHandler}></input>
                   <div className="flex justify-center"><button
                     className="bg-white  w-full  text-black rounded-lg p-1 mt-2 items-center justify-center
                       hover:bg-gray-300"
                        onClick={()=>{OnSubmit()}}>Submit</button></div>
       
                       <div className="mt-2">
                          IF already  have an account <button className="border-none text-gray-500 hover:text-lg" 
                          onClick={()=>{redirect("/signin")}}
                          >Login </button> here 
                       </div>
                 </div>
               </div>
       
             </div>
       
           </>
     )
}
"use client"
import axios from "axios";
import { useEffect, useState } from "react";
export default function  UserCard({token}:{ token: string | null} ){
    const API = process.env.API || "https://chat-application-ps2v.onrender.com";
    type typeuser = {
        username : string , 
        email : string , 
        profile:string 
    }
    const [User , SetUser] = useState<typeuser>();
    useEffect(()=>{
       const fetch  = async ()=>{
        const res = await axios.get(`${API}/user/me`,{
            withCredentials: true , 
        })
        if(res.data.status){
            console.log(res.data.userinfo)
          SetUser(res.data.userinfo)
        }
       }
       fetch();
    }  , [token])
    return <div>
          <div className="flex pl-2 items-cemter">
            <div className="w-7 h-7 rounded-full border-2 border-white flex justify-center items-center mt-1 mr-2"> 
               <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6 text-white ">
  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
</svg>
            </div>
             <div className="text-2xl text-white">
                <span>{User?.username}</span>
             </div>
          </div>
    </div>
    
}
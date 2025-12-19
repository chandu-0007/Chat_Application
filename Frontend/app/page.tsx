import { redirect } from "next/navigation";
import Link from "next/link";
import GetToken from "./lib/getToken"
export default async function Home() {
  const token = await GetToken();
  if(token){
        redirect("/dashboard")
  }
  return (
       <>
        <div className="w-screen h-screen text-2xl text-black "> Landing Page </div>
       </>
     
  )
}

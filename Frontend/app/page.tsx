import { redirect } from "next/navigation";
import Link from "next/link";
import GetToken from "./lib/getToken"
export default async function Home() {
  const token = await GetToken();
  return (
    <div>
      {token != null ? <>
        <div className="bg-white text-lg text-black ">
          Landing Page </div></> : <>
            <>
            <div className="text-lg flex items-center text-white bg-black ">  Login page </div> </>
      </>}
    </div>
  )
}

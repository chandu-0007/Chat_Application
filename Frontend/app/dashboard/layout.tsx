import React from "react";
import GetToken from "../lib/getToken";
import { redirect } from "next/navigation";
import { SocketProvider } from "../components/SocketProvider";
export default async function RootLayou(
  {
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>
) {
   const token  = await GetToken();
   if(!token){
     redirect("/signin");
   }
  return <>
     
    <SocketProvider>{children}</SocketProvider>
    
  </>
}
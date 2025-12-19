import { cookies } from "next/headers"
 async function GetToken (){
    const token = (await cookies()).get("token")?.value;
    if(!token) return null ; 
    return token ; 
}

export default GetToken ; 
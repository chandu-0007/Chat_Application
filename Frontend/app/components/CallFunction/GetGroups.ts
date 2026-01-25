import axios from "axios";

 export default async function GetGroups( cursor : string | undefined)  {
      const API = process.env.API || "http://localhost:3003";
      const url = cursor
    ? `/groups?cursor=${cursor}`
    : `/groups`;
      try{
          const response = await axios.get(API+url , {
             withCredentials : true , 
          })
         if(response.data.status){
            return response.data
         }else{
            alert(response.data.message)
         }
      }catch(err){
           return null ; 
      }
 }
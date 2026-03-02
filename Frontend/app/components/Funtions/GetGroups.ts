import axios from "axios";

export default async function GetGroups(cursor?: string) {
  const API =
    "https://chat-application-ps2v.onrender.com/chat/groups";
  try {
   
    const response = await axios.get(API, {
      withCredentials: true,
      params: { cursor },
    });

    if (response.data.status) {
      return response.data;
    } else {
      alert(response.data.message);
      return null;
    }
  } catch (err) {
    console.error("GetGroups error:", err);
    throw err;
  }
}

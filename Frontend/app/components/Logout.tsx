import axios from "axios";
import { useRouter } from "next/navigation";

const Logout = () => {
  const router = useRouter();
  const API =
    process.env.NEXT_PUBLIC_API || "https://chat-application-ps2v.onrender.com";
  const logoutfunction = async () => {
    try {
      const response = await axios.get(`${API}/user/logout`, {
        withCredentials: true,
      });

      if (response.data.status) {
        alert("Logout successful");
        router.push("/signin");
      }
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <>
      <button
        className="w-full text-left px-4 py-2 text-sm text-red-500  hover:bg-neutral-700 "
        onClick={logoutfunction}>
        Logout
      </button>
    </>
  );
};

export default Logout;

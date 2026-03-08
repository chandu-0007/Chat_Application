import axios from "axios";
import { redirect } from "next/navigation";

const Logout = () => {
  const logoutfunction = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3003/user/logout",
        { withCredentials: true }
      );

      if (response.data.status) {
        alert("Logout successful");
        redirect("/signin")
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

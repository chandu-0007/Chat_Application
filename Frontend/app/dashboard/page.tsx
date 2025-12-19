import GetToken from "../lib/getToken";
import DashboardClient from "../components/DashboardClient";
import { redirect } from "next/navigation";

export default async function Dashboard() {
  const token = await GetToken();

  if (!token) {
    redirect("/login");
  }

  return <DashboardClient token={token} />;
}

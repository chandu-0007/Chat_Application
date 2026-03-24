"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import DashboardClient from "../components/DashboardClient";

export default function Dashboard() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await axios.get(
          "https://chat-application-ps2v.onrender.com/user/me",
          { withCredentials: true }
        );

        if (res.data.status) {
          setToken(res.data.token); // or user data
        } else {
          router.replace("/signin");
        }
      } catch {
        router.replace("/signin");
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [router]);

  if (loading) {
    return <div className="text-white">Loading...</div>;
  }

  if (!token) return null;

  return <DashboardClient token={token} />;
}
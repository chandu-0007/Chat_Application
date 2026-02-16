import { redirect } from "next/navigation";
import Link from "next/link";
import GetToken from "./lib/getToken";

export default async function Home() {
  const token = await GetToken();

  if (token) {
    redirect("/dashboard");
  }
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#030303] text-white">

      {/* ===== Background Gradient Base ===== */}
      <div className="absolute inset-0 
        bg-[radial-gradient(70%_60%_at_50%_0%,rgba(59,130,246,0.35),transparent_60%)]">
      </div>

      {/* ===== Violet Mid Glow ===== */}
      <div className="absolute inset-0 
        bg-[radial-gradient(50%_40%_at_50%_40%,rgba(139,92,246,0.25),transparent_70%)]">
      </div>

      {/* ===== Blue Side Light Beam ===== */}
      <div className="absolute -top-40 right-[-200px] 
        w-[800px] h-[800px] 
        bg-blue-500/20 
        blur-[180px] rotate-45">
      </div>

      {/* ===== Extra Soft Glow Layer ===== */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2
        w-[1200px] h-[700px]
        bg-gradient-to-b from-blue-400/20 to-transparent
        blur-3xl">
      </div>

      
    </main>
  );
}

"use client";
import { createContext, useContext, useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";

type SocketContextType = {
  socket: Socket | null;
  connectSocket: (token: string) => void;
  disconnectSocket: () => void;
};

const SocketContext = createContext<SocketContextType | null>(null);

export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  const socketRef = useRef<Socket | null>(null);
  const [socket, setSocket] = useState<Socket | null>(null);

  const connectSocket = (token: string | null) => {
    if (!token) {
      console.log("❌ Token missing");
      return;
    }

    if (socketRef.current) return; // already connected

    const host =
      process.env.NEXT_PUBLIC_API || "http://localhost:3003";

    const s = io(host, {
      auth: { token },
      withCredentials: true,
      autoConnect: true,
    });

    socketRef.current = s;
    setSocket(s);

    s.on("connect", () => {
      console.log("✅ Socket connected:", s.id);
    });

    s.on("connect_error", (err) => {
      console.error("❌ Socket error:", err.message);
    });
  };

  const disconnectSocket = () => {
    if (socketRef.current) {
      socketRef.current.disconnect();
      socketRef.current = null;
      setSocket(null);
      console.log("🔌 Socket disconnected");
    }
  };

  // cleanup on app unmount
  useEffect(() => {
    return () => disconnectSocket();
  }, []);

  return (
    <SocketContext.Provider
      value={{ socket, connectSocket, disconnectSocket }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error("useSocket must be used inside SocketProvider");
  }
  return context;
};

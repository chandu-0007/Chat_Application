import React from "react";
import { SocketProvider } from "../components/SocketProvider";
export default function RootLayou(
  {
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>
) {
  return (
    <SocketProvider>{children}</SocketProvider>
  );
}
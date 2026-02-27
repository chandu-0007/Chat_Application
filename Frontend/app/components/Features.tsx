"use client";

import { useState } from "react";

  const features = [
    {
      title: "Real-Time Messaging",
      desc: "Send and receive messages instantly with zero delay and smooth performance.",
      icon: "./realtime.png",
    },
    {
      title: "Secure Conversations",
      desc: "End-to-end encryption ensures your chats remain private and protected.",
      icon: "./secure.png",
    },
    {
      title: "Group Chats",
      desc: "Create groups, collaborate, and stay connected with multiple users easily.",
      icon: "./group.png",
    },
    {
      title: "Media Sharing",
      desc: "Share images, videos, and documents quickly with seamless uploads.",
      icon: "./share.png",
    },
    {
      title: "Smart Notifications",
      desc: "Stay updated with real-time alerts without unnecessary interruptions.",
      icon: "./notification.png",
    },
    
  ];
export default function FeatureScroll() {
  const [isPaused, setIsPaused] = useState(false);

  return (
    <div className="overflow-hidden w-full py-10">
      <div
        className={`flex gap-6 w-max  ${
          isPaused ? "" : "animate-scroll"
        }`}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* Duplicate content for infinite effect */}
        {[...features, ...features].map((item, index) => (
          <div
            key={index}
            className="w-80 h-60 rounded-md  bg-white shadow-lg  text-lg  flex-col justify-start"
          >
            <div className="flex items-center justify-center">
              <img src={item.icon} className="w-30 h-30  rounded-full items-center"></img>
            </div>
            <div className="p-2.5 text-center ">
              <h2 className="font-bold uppercase  tracking-tight ">{item.title}</h2>
            <p className="text-sm">{item.desc}</p>
            </div>
            
          </div>
        ))}
      </div>
    </div>
  );
}
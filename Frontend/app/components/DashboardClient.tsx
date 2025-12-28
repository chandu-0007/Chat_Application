"use client";

import { useEffect, useState, useRef } from "react";
import { useSocket } from "../components/SocketProvider";
import UserCard from "./UserCard";
import axios from "axios";
import MessageCard from "./MessageCard";
import CreateGroup from "./CreateGroup";
import { tree } from "next/dist/build/templates/app-page";
import Logout from "./Logout";
export default function DashboardClient({ token }: { token: string }) {
    const { socket, connectSocket, disconnectSocket } = useSocket();
    const messagesEndRef = useRef<HTMLDivElement | null>(null);
    const [chats, Setchats] = useState<any[]>([]);
    const [currentUser, SetCurrentUser] = useState<{
        chatId: string,
        chatName: string
    }>();
    const [GroupCreate, SetGroupCreate] = useState<boolean>(false);
    const [Users, SetUsers] = useState<{
        username: string,
        profileUrl: string | null
    }[]>([]);
    const [togglemsg, Settogglemsg] = useState<boolean>(false);
    const [Messages, SetMessages] = useState<{
        text: string,
        sentByUser: boolean
    }[]>([])
    const [inputmsg, setinputmsg] = useState<string>("")

    const createchat = async (username: string) => {
        try {
            const createchatres = await axios.post("http://localhost:3003/chat/chat-privacy", {
                username: username
            }, {
                withCredentials: true
            })
            if (createchatres.data.status) {
                Setchats((prevs) => [...prevs, {
                    chatId: createchatres.data.chatId,
                    chatName: username
                }])
            }
        } catch (err) {
            alert("something got an error")
        }
    }

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [Messages]);

    useEffect(() => {
        if (token) {
            connectSocket(token);
        }
        const getchats = async () => {
            const res = await axios.get("http://localhost:3003/chat/getchats", {
                withCredentials: true
            });
            const users = await axios.get("http://localhost:3003/user", {
                withCredentials: true
            })
            if (res.status == 200) {
                SetUsers(users.data.allusers)
                console.log(Users)
            }
            if (res.data?.status) {
                // assume res.data.ListOFchats is an array of chats; append them
                console.log(res.data)
                Setchats((prevs) => [...prevs, ...res.data.ListOFchats]);
            }
        };
        // fetch chats when token changes
        getchats();
        return () => {
            disconnectSocket();
        };
    }, [token]);


    //fetch the messages 
    const getmessgaes = async (chatId: string, chatName: string) => {
        Settogglemsg(true);
        if (!chatId || !chatName) {
            alert("something went worng ")
            return;
        }
        SetCurrentUser({
            chatId: chatId,
            chatName
        })
        try {
            const response = await axios.get("http://localhost:3003/chat/messages/" + chatId, {
                withCredentials: true
            })

            if (response.data.status) {
                SetMessages(response.data.messages);
            }
        } catch (err) {
            alert("something went worng");
        }
    }

    useEffect(() => {
        socket?.on("message", (data) => {
            console.log(data);
            SetMessages((prevs) => [...prevs, { text: data.text, sentByUser: false }])
        })

    }, [socket])

    const SendMsg = () => {
        console.log(currentUser?.chatId);
        const sendPlayLoad = {
            text: inputmsg,
            chatId: currentUser?.chatId,
            chatName: currentUser?.chatName
        }
        socket?.emit("message", sendPlayLoad);
        if (inputmsg != "") {
            SetMessages((prev) => [...prev, {
                text: inputmsg,
                sentByUser: true
            }
            ])
        }
        setinputmsg("");
    }
    
   const handleCreateGroup = (groupName : string ,members :any[])=>{
      console.log(groupName);
      console.log(members);
   }

    const [open, setopen] = useState<boolean>(false)
    return (
        <div className="w-screen relative h-screen bg-black ">
            <div className="w-full h-full bg-neutral-900 rounded-lg px-1.5 flex">
                <div className="bg-neutral-900 w-80 h-full relative">
                    <div className="flex justify-between items-center border-2 border-b-white p-2 " >
                        <UserCard token={token}></UserCard>
                        <div className="flex gap-2.5">
                            <div>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6 text-white">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z" />
                                </svg>
                            </div>
                            <div
                                onClick={() => setopen(!open)}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6 text-white">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                                </svg>
                            </div>
                            {open && (
                                <div className="absolute right-0 top-10 mt-2 w-40 bg-neutral-800 rounded-lg shadow-lg border border-neutral-700 z-50">
                                    <button className="w-full text-left px-4 py-2 text-sm text-white hover:bg-neutral-700">
                                        Update Profile
                                    </button>

                                    <Logout />
                                </div>
                            )}
                        </div>
                    </div>

                    {/* search bar  */}
                    <div className=" flex gap-1.5 items-center-safe ">
                        <input className="bg-neutral-650 text-white p-1.5 items-center rounded-xl w-full h-8 border-none   mt-4" placeholder="search"></input>
                        <button
                            className="bg-purple-600 items-center hover:bg-purple-500 mt-4 
                            rounded-full p-0.5 text-white text-center"
                            onClick={() => SetGroupCreate((prevs) => !prevs)}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6 text-white">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                            </svg>

                        </button>
                    </div>
                    {/* chats */}

                    <div>
                        {chats.length == 0 && <div className="text-gray-400 flex  justify-center items-center ">..No chats.. </div>}
                        {chats.length != 0 && <div className="text-white ">
                            <div className="text-white">
                                {chats.map((child, index) => (
                                    <div key={index}
                                        className="flex items-center gap-2 pl-2 h-8 hover:bg-neutral-600 cursor-pointer"
                                        onClick={() => getmessgaes(child.chatId, child.chatName)}
                                    >
                                        {/* <img src={child.profileUrl ?? "/default.png"} alt={child.username} className="w-8 h-8 rounded-full" /> */}
                                        <span>{child.chatName}</span>
                                    </div>
                                ))}
                            </div>
                        </div>}
                        <div className="text-white font-semibold  text-xl "> List of Users </div>
                        <div className="text-white">
                            {Users.map((child) => (
                                <div key={child.username}
                                    className="flex items-center gap-2 pl-2 h-8 hover:bg-neutral-600 cursor-pointer"
                                    onClick={() => createchat(child.username)}
                                >
                                    {/* <img src={child.profileUrl ?? "/default.png"} alt={child.username} className="w-8 h-8 rounded-full" /> */}
                                    <span>{child.username}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* messages slide  */}
                {togglemsg && (
                    <div className="bg-black w-full h-full flex flex-col">

                        <div className="flex items-center gap-3 p-4 border-b border-neutral-800 bg-neutral-900">
                            <img
                                src="https://via.placeholder.com/40"
                                alt="profile"
                                className="w-8 h-8 rounded-full object-cover"
                            />
                            <div>
                                <h2 className="text-white font-semibold">{currentUser?.chatName}</h2>
                            </div>
                        </div>

                        {/* Messages Area */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-3">
                            {Messages.map((each, index) => (
                                <MessageCard
                                    key={index}
                                    text={each.text}
                                    sentByUser={each.sentByUser}
                                />
                            ))}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input Area */}
                        <div className="flex items-center gap-2 p-3 bg-neutral-900">
                            <input
                                type="text"
                                name="inputmsg"
                                value={inputmsg}
                                onChange={(e) => setinputmsg(e.target.value)}
                                placeholder="Type a message..."
                                className="flex-1 h-9 px-3 rounded-md bg-neutral-800 text-white outline-none"
                            />
                            <button
                                onClick={() => SendMsg()}
                                className="h-9 px-4 rounded-md bg-white text-black font-medium">
                                Send
                            </button>
                        </div>

                    </div>
                )}

                {
                    !togglemsg && <div className="bg-black w-full h-full text-2xl text-white text-center items-center"> No chats yet</div>
                }
            </div>
                {GroupCreate && (
                    <div className="absolute inset-0 bg-black/60   text-balck flex justify-center items-center z-50">
                        <div className="bg-white w-100 rounded-2xl p-2">
                             <div 
                               className="flex justify-between items-baseline px-2 ">
                                <label 
                                className="text-lg font-semibold font-sans ">
                                Create New Group 
                              </label>
                              <button
                                className="bg-red-500 rounded-lg p-2 text-white text-md  text-center "
                                onClick={()=>SetGroupCreate(!GroupCreate)}
                                >
                                 cancel
                              </button>
                            </div>
                             <CreateGroup users={chats} handleCreateGroup={handleCreateGroup} />
                        </div>
                    </div>
                )}
        </div>
    );
}


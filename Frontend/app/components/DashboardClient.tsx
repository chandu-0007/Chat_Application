"use client";

import { useEffect, useState, useRef } from "react";
import { useSocket } from "../components/SocketProvider";
import UserCard from "./UserCard";
import axios from "axios";
import MessageCard from "./MessageCard";
import CreateGroup from "./CreateGroup";
import Logout from "./Logout";
import GetGroups from "./Funtions/GetGroups";
import GroupCard from "./GroupCard";
export default function DashboardClient({ token }: { token: string }) {
    const { socket, connectSocket, disconnectSocket } = useSocket();
    const messagesEndRef = useRef<HTMLDivElement | null>(null);
    const [chats, Setchats] = useState<any[]>([]);
    const [currentUser, SetCurrentUser] = useState<{
        chatId: string,
        chatName: string
    }>();

    // all groups 
    const [Groups, SetGroups] = useState<any[]>();
    const [GroupCreate, SetGroupCreate] = useState<boolean>(false);
    let nextcursor: string;
    const [togglegroupinfo, SetToggleGroupInfo] = useState<boolean>(false);

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
            const createchatres = await axios.post("https://chat-application-ps2v.onrender.com/chat/chat-privacy", {
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


    // handle the groups call function 
    const GetGroupInfo = async () => {
        const info = await GetGroups(nextcursor);
        nextcursor = info.nextCursor;
        Settogglemsg(false);
        console.log(info);
        SetGroups(info.groups);
        console.log(Groups);
        SetToggleGroupInfo(true);
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
        SetToggleGroupInfo(false);
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

    const handleCreateGroup = (groupName: string, members: any[]) => {
        console.log(groupName);
        console.log(members);
    }

    const [open, setopen] = useState<boolean>(false)
return (
  <div className="w-screen h-screen bg-[#0f0f0f]  text-white flex">
    
    {/* SIDEBAR */}
    <div className="w-80 bg-[#111] border-r border-neutral-800 flex flex-col">

      {/* HEADER */}
      <div className="flex justify-between items-center px-4 py-3 border-b border-neutral-800">
        <UserCard token={token} />
        <div className="flex items-center gap-3 relative">
          
          {/* menu button */}
          <button onClick={() => setopen(!open)}>
            <div className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-neutral-700 transition">
              ⋮
            </div>
          </button>

          {open && (
            <div className="absolute right-0 top-10 w-44 bg-neutral-900 border border-neutral-700 rounded-xl shadow-xl">
              <button className="w-full text-left px-4 py-2 text-sm hover:bg-neutral-800">
                Update Profile
              </button>
              <Logout />
            </div>
          )}
        </div>
      </div>

      {/* SEARCH */}
      <div className="p-3 flex gap-2">
        <input
          placeholder="Search..."
          className="flex-1 px-3 py-2 rounded-lg bg-neutral-800 text-sm outline-none focus:ring-2 focus:ring-violet-500"
        />
        <button
          onClick={() => SetGroupCreate((p) => !p)}
          className="bg-violet-600 hover:bg-violet-500 transition px-3 rounded-lg"
        >
          +
        </button>
      </div>

      {/* CHAT LIST */}
      <div className="flex-1 overflow-y-auto px-2 space-y-1">
        {chats.length === 0 && (
          <div className="text-center text-neutral-500 mt-10">
            No chats yet
          </div>
        )}

        {chats.map((child, index) => (
          <div
            key={index}
            onClick={() => getmessgaes(child.chatId, child.chatName)}
            className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-neutral-800 cursor-pointer transition"
          >
            <div className="w-10 h-10 rounded-full bg-violet-600 flex items-center justify-center font-semibold">
              {child.chatName?.charAt(0).toUpperCase()}
            </div>

            <div className="flex flex-col">
              <span className="text-sm font-medium">
                {child.chatName}
              </span>
              {child.lastMessage && (
                <span className="text-xs text-neutral-400 truncate w-40">
                  {child.lastMessage}
                </span>
              )}
            </div>
          </div>
        ))}

        {/* GROUPS */}
        <div
          onClick={GetGroupInfo}
          className="mt-4 px-3 py-2 rounded-lg hover:bg-neutral-800 cursor-pointer font-semibold"
        >
          Groups
        </div>

        {/* USERS */}
        <div className="px-3 text-lg font-serif  mt-2">
          Find your Users
        </div>

        {Users.map((child) => (
          <div
            key={child.username}
            onClick={() => createchat(child.username)}
            className="px-3 py-2 rounded-lg hover:bg-neutral-800 cursor-pointer text-sm"
          >
            {child.username}
          </div>
        ))}
      </div>
    </div>

    {/* MAIN CONTENT */}
    <div className="flex-1 flex flex-col bg-[#0b0b0b]">

      {/* EMPTY STATE */}
      {!togglemsg && !togglegroupinfo && (
        <div className="flex items-center justify-center h-full text-neutral-500 text-lg">
          Select a chat to start messaging
        </div>
      )}

      {/* CHAT VIEW */}
      {togglemsg && (
        <>
          {/* HEADER */}
          <div className="px-4 py-3 border-b border-neutral-800 flex items-center gap-3 bg-[#111]">
            <div className="w-9 h-9 rounded-full bg-violet-600 flex items-center justify-center">
              {currentUser?.chatName?.charAt(0)}
            </div>
            <h2 className="font-semibold">{currentUser?.chatName}</h2>
          </div>

          {/* MESSAGES */}
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

          {/* INPUT */}
          <div className="p-3 border-t border-neutral-800 flex gap-2 bg-[#111]">
            <input
              value={inputmsg}
              onChange={(e) => setinputmsg(e.target.value)}
              placeholder="Type a message..."
              className="flex-1 px-3 py-2 rounded-lg bg-neutral-800 outline-none focus:ring-2 focus:ring-violet-500"
            />
            <button
              onClick={SendMsg}
              className="px-4 rounded-lg bg-violet-600 hover:bg-violet-500 transition"
            >
              Send
            </button>
          </div>
        </>
      )}

      {/* GROUP VIEW */}
      {togglegroupinfo && (
        <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {Groups?.map((each: any) => (
            <GroupCard
              key={each.id}
              group={{
                id: each.id,
                name: each.name,
                description: each.description,
                noOfMembers: each._count.members,
              }}
            />
          ))}
        </div>
      )}
    </div>

    {/* MODAL */}
    {GroupCreate && (
      <div className="absolute inset-0 bg-black/70 flex justify-center items-center">
        <div className="bg-neutral-900 p-6 rounded-2xl w-[420px] shadow-2xl">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Create Group</h2>
            <button
              onClick={() => SetGroupCreate(false)}
              className="text-red-400 hover:text-red-300"
            >
              ✕
            </button>
          </div>

          <CreateGroup users={chats} handleCreateGroup={handleCreateGroup} />
        </div>
      </div>
    )}
  </div>
);
}


import { Server } from "socket.io";
import type { Socket as IOSocket } from "socket.io";
import { Server as HttpServer } from "http";
import cookie from "cookie";
import jwt from "jsonwebtoken"
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient()
//online users 
const onlineUser = new Map<string, IOSocket>()

export default function socketlogic(server: HttpServer) {
    const io = new Server(server, {
        cors: {
            origin: "http://localhost:3000",
            credentials: true
        }
    })
    console.log("socket is running on the server")

    //middle ware for the userid using the jwt 
    io.use((socket, next) => {
        // using the token from the auth 
        const token = socket.handshake.auth.token ; 
        if (!token) return next(new Error("Unauthorized"));

        try {
          const secret = process.env.JWT_SECRET || "mysupersecretkey"
          const decoded =  jwt.verify(token , secret) as {id : string };
          socket.data.userId = decoded.id ; 
          next();
        } catch (err) {
            return next(new Error("Invaild Token"))
        }
    })
    io.on("connection", (socket) => {
        onlineUser.set(socket.data.userId, socket);
        console.log(onlineUser.size);
        socket.on("message", async (playload) => {
            console.log(playload);
            try{
            const chat = await prisma.chat.findFirst({
                where:{
                    id:playload.chatId
                } 
            })
            let user ; 
            let sendersocket ; 
            if(chat !=null){
                user = chat.user1Id == socket.data.userId ? chat.user2Id : chat.user1Id ; 
                sendersocket = onlineUser.get(user)
            }
            console.log(chat);
            console.log(socket.data.userId);
            console.log(user);
            await prisma.message.create({
                data :{
                    text : playload.text , 
                    senderId : socket.data.userId , 
                    chatId : playload.chatId
                }
            })
            if(sendersocket != null){
               sendersocket.emit("message" ,{
                status : true , 
                text : playload.text ,
                chatName : playload.chatName
               })
            }
          
        }catch(err){

        }
        })
        socket.on("disconnect", () => {
            console.log("dissconnected socket id is " + socket.id)
            onlineUser.delete(socket.data.userId);
        })
    })

}
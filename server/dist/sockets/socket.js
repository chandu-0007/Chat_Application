import { Server } from "socket.io";
import { Server as HttpServer } from "http";
import cookie from "cookie";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
//online users 
const onlineUser = new Map();
export default function socketlogic(server) {
    const io = new Server(server, {
        cors: {
            origin: "http://localhost:3000",
            credentials: true
        }
    });
    console.log("socket is running on the server");
    //middle ware for the userid using the jwt 
    io.use((socket, next) => {
        // using the token from the auth 
        const token = socket.handshake.auth.token;
        if (!token)
            return next(new Error("Unauthorized"));
        try {
            const secret = process.env.JWT_SECRET || "mysupersecretkey";
            const decoded = jwt.verify(token, secret);
            socket.data.userId = decoded.id;
            next();
        }
        catch (err) {
            return next(new Error("Invaild Token"));
        }
    });
    io.on("connection", (socket) => {
        onlineUser.set(socket.data.userId, socket);
        console.log(socket);
        socket.on("message", async (playload) => {
            console.log(playload);
            try {
                const chat = await prisma.chat.findFirst({
                    where: {
                        id: playload.chatId
                    }
                });
                let user;
                let sendersocket;
                if (chat != null) {
                    user = chat.user1Id == socket.data.userId ? chat.user2Id : chat.user1Id;
                    sendersocket = onlineUser.get(user);
                }
                await prisma.message.create({
                    data: {
                        text: playload.text,
                        senderId: socket.data.userId,
                        chatId: playload.chatId
                    }
                });
                if (sendersocket != null) {
                    sendersocket.emit("message", {
                        status: true,
                        text: playload.text,
                        chatName: playload.chatName
                    });
                }
            }
            catch (err) {
                socket.emit("message", {
                    status: false,
                    message: "Internal server error"
                });
            }
        });
        // request handler 
        socket.on("request-sent", async (playload) => {
            const { groupId } = playload;
            console.log("request recived ");
            if (!groupId)
                return;
            try {
                const user = await prisma.user.findUnique({
                    where: {
                        id: socket.data.userId
                    },
                    select: {
                        username: true,
                        profileUrl: true,
                        email: true
                    }
                });
                const admin = await prisma.group.findUnique({
                    where: {
                        id: groupId
                    },
                    select: {
                        adminId: true,
                        name: true
                    }
                });
                if (admin) {
                    const Notification = await prisma.notifacation.create({
                        data: {
                            text: `${user?.username} is sent request to join in your ${admin?.name}`,
                            view: false,
                            type: "join-request",
                            groupId: groupId,
                            touserId: admin?.adminId,
                            senderId: socket.data.userId
                        }
                    });
                    const adminSocket = onlineUser.get(admin?.adminId);
                    if (adminSocket) {
                        adminSocket.emit("Notification", {
                            NotificationId: Notification.id,
                            SenderId: socket.data.userId,
                            SenderName: user?.username,
                            SenderProfileurl: user?.profileUrl,
                            Senderemail: user?.email,
                            text: Notification.text,
                        });
                    }
                }
            }
            catch (err) {
                socket.emit("message", {
                    status: false,
                    message: "internal server error"
                });
            }
        });
        socket.on("group-chat", async (playload) => {
            const { text, groupId } = playload;
            if (!groupId)
                return;
            try {
                const groupMember = await prisma.groupMember.findMany({
                    where: {
                        groupId: groupId
                    },
                    select: {
                        userId: true
                    }
                });
                if (groupMember.length == 0) {
                    socket.emit("group-chat", {
                        status: false,
                        message: "There is no group exist"
                    });
                }
                let MembersSockets = [];
                for (let i = 0; i < groupMember.length; i++) {
                    const member = groupMember[i];
                    if (!member || !member.userId || member.userId == socket.data.userId)
                        continue;
                    const sock = onlineUser.get(member.userId);
                    if (sock) {
                        MembersSockets.push(sock);
                    }
                }
                await prisma.message.create({
                    data: {
                        senderId: socket.data.userId,
                        groupId: groupId,
                        text: text
                    }
                });
                if (MembersSockets.length > 0) {
                    for (const s of MembersSockets) {
                        s.emit("group-chat", {
                            status: true,
                            text: text
                        });
                    }
                }
            }
            catch (err) {
                socket.emit("message", {
                    status: false,
                    message: "Internal server error"
                });
            }
        });
        socket.on("disconnect", () => {
            console.log("dissconnected socket id is " + socket.id);
            onlineUser.delete(socket.data.userId);
        });
    });
}
//# sourceMappingURL=socket.js.map
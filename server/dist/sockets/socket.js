import { Server } from "socket.io";
import { Server as HttpServer } from "http";
import jwt from "jsonwebtoken";
//online users 
const onlineUser = new Map();
export default function socketlogic(server) {
    const io = new Server(server, {
        cors: {
            origin: "*",
        }
    });
    console.log("socket is running on the server");
    //middle ware for the userid using the jwt 
    io.use((Socket, next) => {
        const rawToken = Socket.handshake.query.token;
        const token = Array.isArray(rawToken) ? rawToken[0] : rawToken;
        if (!token || typeof token !== "string") {
            return next(new Error("The token is missing "));
        }
        try {
            const secret = process.env.JWT_SCERET || "adfasdasdfkjsd;";
            const decoded = jwt.verify(token, secret);
            // ensure we store a string userId on Socket.data
            if (typeof decoded === "string") {
                Socket.data.userId = decoded;
            }
            else if (decoded && typeof decoded === "object") {
                Socket.data.userId = (decoded.userId ?? decoded.id ?? "").toString();
            }
            else {
                Socket.data.userId = "";
            }
            next();
        }
        catch (err) {
            return next(new Error("Invaild Token"));
        }
    });
    io.on("connection", (Socket) => {
        console.log(Socket.id);
        onlineUser.set(Socket.data.userId, Socket.id);
        console.log(onlineUser);
        Socket.on("message", (data) => {
            console.log(data);
            Socket.emit("message", data);
        });
        Socket.on("disconnect", () => {
            console.log("dissconnected socket id is " + Socket.id);
            onlineUser.delete(Socket.data.userId);
        });
    });
}
//# sourceMappingURL=socket.js.map
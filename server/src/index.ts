import Express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import userRouter from './routers/users.js'
import http from "http"
import { Server } from 'socket.io'
import cookieParser from "cookie-parser";
import socketlogic from './sockets/socket.js'
import ChatRouter from "./routers/chats.js"
dotenv.config()
const app = Express()
app.use(Express.json())
app.use(cors({
  origin: "https://chat-application-taupe-omega.vercel.app",
  credentials: true
}));
app.use(cookieParser())
const PORT = process.env.PORT || 3003

app.use('/user', userRouter);
app.use('/chat', ChatRouter);
const server = http.createServer(app)
socketlogic(server);
declare global {
  namespace Express {
    interface Request {
      user?: string
    }
  }
}

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
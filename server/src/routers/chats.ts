import { Router } from "express";
import auth from "../middleware/auth.js";
import type { Request, Response } from "express";
import { PrismaClient } from "@prisma/client"
const router = Router();
const prisma = new PrismaClient()
router.use(auth)

//get all the users chat previous 
router.get("/getchats" , async(req : Request , res : Response ) =>{
       try{
          const PrivacyChats = await prisma.chat.findMany({ where :{
             OR :[
               {user1Id : req.user!} , 
               {user2Id : req.user !}  
             ]
          } 
          , select :  {
              id : true , 
              user1 : true , 
              user1Id : true , 
              user2 : true , 
              user2Id : true 
          }
        })
        const ListOFchats = PrivacyChats.map((each) => ({
              chatId :each.id , 
              chatName : each.user1Id != req.user ? each.user1.username : each.user2.username 
        }))

        const GroupChats = await prisma.groupMember.findMany({
            where : {
                userId : req.user! 
            } , 
            select :{
                groupId : true , 
                group : true , 
            }
        })

        return res.status(200).json({
              status : true , 
              ListOFchats, 
              GroupChats 
        })
       }catch (err){
           return res.status(500).json({
            message: "server error ",
            status: false
        })
       }
})


// chat create 
router.post("/chat-privacy", async (req: Request, res: Response) => {
    const userId = req.user;
    const recieverName = req.body.username;
    if (!recieverName) return res.status(401).json({ message: "Doesn't recevies the reciver name ", status: false })
    try {
        const receiver = await prisma.user.findUnique({
            where: { username: recieverName }
        });
        if (!receiver) {
            return res.json({
                message: "the usern't found ",
                status: false
            })
        }
            let chat = await prisma.chat.findFirst({
            where: {
                OR: [
                    { user1Id: userId !, user2Id: receiver.id  },
                    { user1Id: receiver.id, user2Id: userId! }
                ]
            }
        });

        if(chat){
             return res.status(200).json({
                status : false,
                chatId: chat.id, 
                message  : "chat is aleady created "
             })
        }
        const newchat =  await prisma.chat.create({
            data :{
                user1Id : userId! , 
                user2Id : receiver.id 
            }
        })
        return res.status(200).json({
            status : true , 
            message : "The chat is created , you can chat" , 
            chatId : newchat.id 
        })
    } catch (err) {
        return res.status(500).json({
            message: "server error ",
            status: false
        })
    }
});

router.get("/messages/:chatId", async (req: Request, res: Response) => {
    const userId = req.user;
    const chatId = req.params.chatId;
    if (!chatId) return res.status(400).json({ message: "chatId is required", status: false });
    try {
        const message = await prisma.message.findMany({
            where: {
                chatId: chatId
            },
            select: {
                senderId: true,
                text: true,
            }
        });

        const messages = message.map((each) => ({
            text: each.text,
            sentByUser: each.senderId === userId
        }));

        return res.status(200).json({
            status: true,
            messages
        });
    } catch (err) {
        return res.status(500).json({
            message: "server error",
            status: false
        });
    }
});


router.post("create-room" , async ( req : Request  , res  : Response) =>{
    const userId = req.user; 
    const groupName = req.body.groupName ;
    if(!groupName || !userId) {
        return res.json({
            status : false , 
            message : "Doesn't get the group Name "
        })
    }
    try{
       const ExistedGroup  = await prisma.group.findFirst({
        where:{
            name:groupName , 
            adminId : userId
        }
       })
       if(!ExistedGroup){
         const NewGroup = await prisma.group.create({
            data :{
                name: groupName , 
                adminId : userId 
            }
         })
         await prisma.groupMember.create({
            data :{
                groupId : NewGroup.id ,
                userId : userId 
            }
         })
         return res.status(200).json({
            status : true , 
            groupId : NewGroup.id,
            message : "successfully created the group"
         })
       }
       return res.json({
         status : false , 
         message : "The Group name is already used by you"
       })
    }catch(err){
      return res.status(500).json({
        status : false  ,
        message : "Internal server error"
      })
    }
})


// join in the group 
router.post("join-group/:groupId" , async(req : Request,res : Response) =>{
    const userId = req.user ; 
    const groupId = req.params.groupId
    if(!groupId){
        return res.json({
            status : false , 
            message : "Doesn't get the groupId"
        })
    }
    try{
       const GroupFound = await prisma.group.findFirst({
        where:{
            id: groupId
        }
       })
       if(!GroupFound){
        return res.json({
            status : false , 
            message : "the Group is not found"
        })
       }

       await prisma.groupMember.create({
        data :{
           userId:userId!, 
           groupId: groupId
        }
       })
       return res.json({
         status : true , 
         groupId : GroupFound.id , 
         message : "Joined the group successfully"
       })
    }catch(err){
          return res.status(500).json({
        status : false  ,
        message : "Internal server error"
      })
    }
})
export default router ; 
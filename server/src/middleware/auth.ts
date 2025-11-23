import type {Response , Request , NextFunction } from "express";
 import jwt from "jsonwebtoken"
export default function auth(req : Request , res : Response  , next : NextFunction){
    const token = req.cookies.token ; 
    if(!token) return res.json({
        message : "token not found " ,
        status : false 
    })
    try{
     const secret = process.env.JWT_SCERET  || "adfasdasdfkjsd;";
    const decoded = jwt.verify(token , secret) as string;
    req.user = decoded ; 
    next();
    }catch(err){
                return res.status(403).json({ message: "Invalid token" });
    }
}


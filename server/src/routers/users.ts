import { Router } from "express";
import type{Request , Response} from "express"
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";
dotenv.config();
const prisma = new PrismaClient();
const router = Router();

type user = {
  username: string;
  email: string;
  password: string;
};

// Test route
router.get("/", (req: Request, res: Response) => {
  res.send("user route is working");
  console.log("user route is called");
});


// REGISTER
router.post("/register", async (req: Request, res: Response) => {
  const userInfo: user = req.body as user;
  if (!userInfo) {
    return res.status(400).json({
      status: false,
      message: "user info is required"
    });
  }

  const { username, email, password } = userInfo;

  try {
    const Existuser = await prisma.user.findUnique({
      where: { username: username }
    });

    if (Existuser) {
      return res.status(200).json({
        status: false,
        message: "user already exists"
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        username: username,
           passwordHash :  hashedPassword,
        email: email
      }
    });

    const secret = process.env.JWT_SCERET  || "adfasdasdfkjsd;";
    console.log(secret);
    if (!secret) {
      return res.status(500).json({
        status: false,
        message: "Server configuration error"
      });
    }

    const token = jwt.sign({ id: newUser.id }, secret, { expiresIn: "7d" });

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    });

    return res.status(201).json({
      status: true,
      message: "User registered successfully"
    });
  } catch (err) {
    console.log(err)
    return res.status(500).json({
      status: false,
      message: "Internal server error"
    });
  }
});


// LOGIN
router.post("/login", async (req: Request, res: Response) => {
  const { email, username, password } = req.body;

  if ((!username && !email) || !password) {
    return res.status(400).json({
      status: false,
      message: "username/email and password are required"
    });
  }

  try {
    const Existuser = await prisma.user.findFirst({
      where: {
        OR: [{ username: username }, { email: email }]
      }
    });

    if (!Existuser) {
      return res.status(404).json({
        status: false,
        message: "user not found, please register first"
      });
    }

    const passwordMatch = await bcrypt.compare(
      password,
      Existuser.passwordHash
    );

    if (!passwordMatch) {
      return res.status(401).json({
        status: false,
        message: "invalid password"
      });
    }

    const secret = process.env.JWT_SECRETn || "adfasdasdfkjsd;" ;
    if (!secret) {
      return res.status(500).json({
        status: false,
        message: "Server configuration error"
      });
    }

    const token = jwt.sign({ id: Existuser.id }, secret, { expiresIn: "7d" });
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000
    });

    return res.status(200).json({
      status: true,
      message: "Login successful",
    });
  } catch (err) {
    return res.status(500).json({
      status: false,
      message: "Internal server error"
    });
  }
});

// Logout 
router.post("/logout", (req: Request, res: Response) => {
  res.clearCookie("token");
  return res.json({
    status: true,
    message: "Logged out successfully"
  });
});


router.put("/profile" , async (req : Request , res : Response )=>{
     const {email , newpassword} = req.body ; 
     if(!email  && !newpassword) return res.status(401).json({
      status : false , 
      message : "the usetname or new password is requisred "
     })
     try{
           
     }catch(err){

     }
})

export default router;

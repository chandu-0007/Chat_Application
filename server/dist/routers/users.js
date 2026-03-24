import { Router } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";
import auth from "../middleware/auth.js";
dotenv.config();
const prisma = new PrismaClient();
const router = Router();
// REGISTER
router.post("/register", async (req, res) => {
    const userInfo = req.body;
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
                passwordHash: hashedPassword,
                email: email
            }
        });
        const secret = process.env.JWT_SECRET;
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
            secure: false,
            sameSite: "lax",
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
        });
        return res.status(201).json({
            status: true,
            message: "User registered successfully"
        });
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({
            status: false,
            message: "Internal server error"
        });
    }
});
// LOGIN
router.post("/login", async (req, res) => {
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
        const passwordMatch = await bcrypt.compare(password, Existuser.passwordHash);
        if (!passwordMatch) {
            return res.status(401).json({
                status: false,
                message: "invalid password"
            });
        }
        const secret = process.env.JWT_SECRET;
        if (!secret) {
            return res.status(500).json({
                status: false,
                message: "Server configuration error"
            });
        }
        const token = jwt.sign({ id: Existuser.id }, secret, { expiresIn: "7d" });
        res.cookie("token", token, {
            httpOnly: true,
            secure: false,
            sameSite: "lax",
            maxAge: 7 * 24 * 60 * 60 * 1000
        });
        return res.status(200).json({
            status: true,
            message: "Login successful",
        });
    }
    catch (err) {
        return res.status(500).json({
            status: false,
            message: "Internal server error"
        });
    }
});
// Logout 
router.get("/logout", (req, res) => {
    try {
        res.clearCookie("token");
        return res.json({
            status: true,
            message: "Logged out successfully"
        });
    }
    catch (error) {
        return res.json({
            status: false,
            message: "internal server errot"
        });
    }
});
router.post("/reset-password", async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({
            status: false,
            message: "Email and new password are required"
        });
    }
    try {
        const user = await prisma.user.findUnique({
            where: { email: email }
        });
        if (!user) {
            return res.status(404).json({
                status: false,
                message: "User not found"
            });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        await prisma.user.update({
            where: { email: email },
            data: { passwordHash: hashedPassword }
        });
        return res.status(200).json({
            status: true,
            message: "Password reset successful"
        });
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({
            status: false,
            message: "Internal server error"
        });
    }
});
// get userinfo 
router.get("/me", auth, async (req, res) => {
    const userId = req.user;
    try {
        const userinfo = await prisma.user.findFirst({ where: {
                id: userId
            },
            select: {
                username: true,
                email: true,
                profileUrl: true
            } });
        return res.status(200).json({
            status: true,
            message: "user Information ",
            userinfo
        });
    }
    catch (err) {
        return res.json({
            status: false,
            message: "server error "
        });
    }
});
router.get("/", auth, async (req, res) => {
    try {
        const allusers = await prisma.user.findMany({
            where: {},
            select: {
                username: true,
                profileUrl: true
            }
        });
        return res.status(200).json({
            allusers,
            message: "list of users "
        });
    }
    catch (err) {
        return res.status(500).json({
            message: "internal server error"
        });
    }
});
export default router;
//# sourceMappingURL=users.js.map
import jwt from "jsonwebtoken";
export default function auth(req, res, next) {
    const token = req.cookies.token;
    if (!token)
        return res.json({
            message: "token not found ",
            status: false
        });
    try {
        const secret = process.env.JWT_SCERET || "adfasdasdfkjsd;";
        const decoded = jwt.verify(token, secret);
        req.user = decoded;
        next();
    }
    catch (err) {
        return res.status(403).json({ message: "Invalid token" });
    }
}
//# sourceMappingURL=auth.js.map
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const protect = async (req, res, next) => {
    let token;

    if (req.headers.authorization?.startsWith("Bearer")) {
        token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
        return res.status(401).json({ message: "Not authorized, no token" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // 🔥 attach full user (not just id)
        const user = await User.findById(decoded.id);

        if (!user) {
            return res.status(401).json({ message: "User not found" });
        }

        if (user.status !== "ACTIVE") {
            return res.status(403).json({ message: "User is inactive" });
        }

        req.user = user;

        next();
    } catch (error) {
        return res.status(401).json({ message: "Invalid token" });
    }
};
import { registerUser, loginUser } from "../services/auth.service.js";
import { generateToken } from "../utils/generateToken.js";

export const register = async (req, res, next) => {
    try {
        const user = await registerUser(req.body);

        const token = generateToken(user);

        res.status(201).json({
            message: "User registered successfully",
            token
        });
    } catch (error) {
        next(error);
    }
};

export const login = async (req, res, next) => {
    try {
        const user = await loginUser(req.body);

        const token = generateToken(user);

        res.status(200).json({
            message: "Login successful",
            token
        });
    } catch (error) {
        next(error);
    }
};
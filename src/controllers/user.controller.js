import User from "../models/user.model.js";
import crypto from "crypto";

// Get all users (Admin only)
export const getAllUsers = async (req, res, next) => {
    try {
        const users = await User.find().select("-password");

        res.json(users);
    } catch (err) {
        next(err);
    }
};

// Get current logged-in user
export const getProfile = async (req, res, next) => {
    try {
        const user = await User.findById(req.user._id).select("-password");

        res.json(user);
    } catch (err) {
        next(err);
    }
};

// Update profile
export const updateProfile = async (req, res, next) => {
    try {
        const { name, email } = req.body;

        const user = await User.findByIdAndUpdate(
            req.user._id,
            { name, email },
            { new: true }
        ).select("-password");

        res.json(user);
    } catch (err) {
        next(err);
    }
};

// Change password
export const changePassword = async (req, res, next) => {
    try {
        const { currentPassword, newPassword } = req.body;

        const user = await User.findById(req.user._id).select("+password");

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const isMatch = await user.comparePassword(currentPassword);

        if (!isMatch) {
            return res.status(400).json({ message: "Incorrect current password" });
        }

        user.password = newPassword;
        await user.save(); // triggers hashing

        res.json({ message: "Password updated successfully" });
    } catch (err) {
        next(err);
    }
};

// Forgot password (generate token)
export const forgotPassword = async (req, res, next) => {
    try {
        const user = await User.findOne({ email: req.body.email });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const resetToken = crypto.randomBytes(20).toString("hex");

        user.resetPasswordToken = resetToken;
        user.resetPasswordExpire = Date.now() + 10 * 60 * 1000; // 10 min

        await user.save();

        res.json({
            message: "Reset token generated",
            resetToken // normally sent via email
        });
    } catch (err) {
        next(err);
    }
};

// Reset password using token
export const resetPassword = async (req, res, next) => {
    try {
        const user = await User.findOne({
            resetPasswordToken: req.params.token,
            resetPasswordExpire: { $gt: Date.now() }
        });

        if (!user) {
            return res.status(400).json({
                message: "Invalid or expired token"
            });
        }

        user.password = req.body.password;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;

        await user.save();

        res.json({ message: "Password reset successful" });
    } catch (err) {
        next(err);
    }
};
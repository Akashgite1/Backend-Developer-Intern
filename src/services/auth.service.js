import User from "../models/user.model.js";

export const registerUser = async ({ name, email, password, role }) => {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        throw new Error("User already exists");
    }

    const user = await User.create({
        name,
        email,
        password,
        role // optional, defaults to VIEWER
    });

    return user;
};

export const loginUser = async ({ email, password }) => {
    const user = await User.findOne({ email }).select("+password");

    if (!user) {
        throw new Error("Invalid credentials");
    }

    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
        throw new Error("Invalid credentials");
    }

    if (user.status !== "ACTIVE") {
        throw new Error("User is inactive");
    }

    return user;
};
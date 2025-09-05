import jwt from "jsonwebtoken";

export const generateToken = (id, res) => {
    const token = jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });
    res.cookie("jwt", token, {
        httpOnly: true,
        secure: true, // Always secure in production
        maxAge: 7 * 24 * 60 * 60 * 1000,
        sameSite: "none", // Allow cross-origin cookies
    });
    return token;
}
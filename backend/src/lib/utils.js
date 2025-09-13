import jwt from "jsonwebtoken";

export const generateToken = (id, res) => {
    const token = jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });
    
    // Cookie configuration for cross-origin and different browsers
    const cookieOptions = {
        httpOnly: true,
        secure: true, // Always true for production
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        sameSite: "none", // Required for cross-origin requests
        domain: undefined, // Let browser handle domain
        path: "/" // Available on all paths
    };
    
    console.log("Setting cookie with options:", cookieOptions);
    res.cookie("jwt", token, cookieOptions);
    return token;
}
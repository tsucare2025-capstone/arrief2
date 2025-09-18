import bcrypt from "bcrypt";
import { db } from "../lib/db.js";
import { generateToken } from "../lib/utils.js";
import jwt from "jsonwebtoken";

export const signup = async (req, res) => {
    const { name, email, password, profession } = req.body;
    
    try {
        if (!name || !email || !password) { 
            return res.status(400).json({ message: "All fields are required" });
        }
        if (password.length < 6) {
            return res.status(400).json({ message: "Password must be at least 6 characters long" });
        }
        if (!email.includes("@")) {
            return res.status(400).json({ message: "Invalid email" });
        }

        // Check if counselor already exists
        const [existingCounselor] = await db.query("SELECT * FROM counselor WHERE email = ?", [email]);
        if (existingCounselor.length > 0) {
            return res.status(400).json({ message: "Counselor already exists" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashpassword = await bcrypt.hash(password, salt);

        // Insert new counselor with required fields only (nullable fields can be NULL)
        const query = "INSERT INTO counselor (name, email, password, profession, is_verified) VALUES (?, ?, ?, ?, ?)";
        const [newCounselor] = await db.query(query, [
            name, 
            email, 
            hashpassword, 
            profession || "Counselor",
            0  // is_verified (0 = false)
        ]);
        
        if (newCounselor.insertId) {
            // Generate token
            const token = generateToken(newCounselor.insertId, res);
            res.status(201).json({
                counselorId: newCounselor.insertId,
                name: name,
                email: email,
                profession: profession || "Counselor",
                counselorImage: null,
                assignedCollege: null,
                is_verified: false,
                token: token,
                message: "Counselor created successfully"
            });
        }
        else {
            res.status(400).json({ message: "Failed to create counselor" });
        }
    } catch (error) {
        console.error("Signup error:", error);
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
}

export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        }

        // Find counselor by email
        const [counselors] = await db.query("SELECT * FROM counselor WHERE email = ?", [email]);
        if (counselors.length === 0) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const counselor = counselors[0];
        const isValidPassword = await bcrypt.compare(password, counselor.password);
        
        if (!isValidPassword) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        // Generate token
        const token = generateToken(counselor.counselorID, res);

        res.status(200).json({
            counselorId: counselor.counselorID,
            name: counselor.name,
            email: counselor.email,
            token: token,
            message: "Login successful"
        });
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const logout = (req, res) => {
    // Clear the JWT cookie with same options as setting
    res.clearCookie('jwt', {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        path: "/"
    });
    
    res.status(200).json({ message: "Logout successful" });
}

export const checkAuth = async (req, res) => {
    try {
        // Get the JWT token from cookies
        const token = req.cookies.jwt;
        
        if (!token) {
            return res.status(401).json({ message: "Unauthorized: No token provided" });
        }
        
        // Verify the JWT token
        jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
            if (err) {
                return res.status(401).json({ message: "Unauthorized: Invalid token" });
            }
            
            try {
                // Get complete counselor data from database
                const [counselors] = await db.query("SELECT counselorID, name, email, profession, counselorImage, assignedCollege, is_verified FROM counselor WHERE counselorID = ?", [decoded.id]);
                
                if (counselors.length === 0) {
                    return res.status(401).json({ message: "Counselor not found" });
                }
                
                const counselor = counselors[0];
                
                // Return complete user info matching login/signup format
                res.status(200).json({ 
                    counselorId: counselor.counselorID,
                    name: counselor.name,
                    email: counselor.email,
                    profession: counselor.profession,
                    counselorImage: counselor.counselorImage,
                    assignedCollege: counselor.assignedCollege,
                    is_verified: counselor.is_verified,
                    message: "Authenticated"
                });
            } catch (dbError) {
                console.error("Database error in checkAuth:", dbError);
                res.status(500).json({ message: "Internal server error" });
            }
        });
    } catch (error) {
        console.error("Check auth error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}
import bcrypt from "bcrypt";
import { db } from "../lib/db.js";
import { generateToken } from "../lib/utils.js";
import jwt from "jsonwebtoken";
import { generateOTP, getOTPExpiryTime, isOTPExpired, compareOTP, isValidOTPFormat } from "../lib/otp.js";
import { sendOTPEmail, sendWelcomeEmail } from "../lib/email.js";

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
        console.log("Login attempt for email:", email);
        
        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        }

        // Find counselor by email
        console.log("Querying database for counselor...");
        const [counselors] = await db.query("SELECT * FROM counselor WHERE email = ?", [email]);
        console.log("Database query result:", counselors.length, "counselors found");
        
        if (counselors.length === 0) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const counselor = counselors[0];
        console.log("Found counselor:", counselor.name, "is_verified:", counselor.is_verified);
        
        const isValidPassword = await bcrypt.compare(password, counselor.password);
        
        if (!isValidPassword) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        // Check if counselor is already verified
        if (counselor.is_verified) {
            console.log("Counselor is verified, generating token...");
            // Generate token for verified counselor
            const token = generateToken(counselor.counselorID, res);

            res.status(200).json({
                counselorId: counselor.counselorID,
                name: counselor.name,
                email: counselor.email,
                is_verified: true,
                token: token,
                message: "Login successful"
            });
        } else {
            console.log("Counselor is not verified, generating OTP...");
            // Generate and send OTP for unverified counselor
            const otp = generateOTP();
            const otpExpiry = getOTPExpiryTime(5); // 5 minutes
            console.log("Generated OTP:", otp);

            // Update counselor with OTP
            console.log("Updating counselor with OTP...");
            await db.query(
                "UPDATE counselor SET otp = ?, otp_expiry = ? WHERE counselorID = ?",
                [otp, otpExpiry, counselor.counselorID]
            );
            console.log("OTP stored in database");

            // Send OTP email
            console.log("Attempting to send OTP email...");
            console.log("Email config - SERVICE:", process.env.EMAIL_SERVICE);
            console.log("Email config - USER:", process.env.EMAIL_USER ? "SET" : "NOT SET");
            console.log("Email config - PASS:", process.env.EMAIL_PASS ? "SET" : "NOT SET");
            
            const emailSent = await sendOTPEmail(counselor.email, otp, counselor.name);
            console.log("Email sent result:", emailSent);
            
            if (!emailSent) {
                console.error("Failed to send OTP email");
                return res.status(500).json({ message: "Failed to send verification email" });
            }

            res.status(200).json({
                counselorId: counselor.counselorID,
                name: counselor.name,
                email: counselor.email,
                is_verified: false,
                message: "OTP sent to your email. Please verify to complete login."
            });
        }
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ message: "Internal server error", error: error.message });
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

export const verifyOTP = async (req, res) => {
    const { counselorId, otp } = req.body;
    
    try {
        console.log("OTP verification attempt for counselorId:", counselorId, "otp:", otp);
        
        if (!counselorId || !otp) {
            return res.status(400).json({ message: "Counselor ID and OTP are required" });
        }

        // Validate OTP format
        if (!isValidOTPFormat(otp)) {
            console.log("Invalid OTP format:", otp);
            return res.status(400).json({ message: "OTP must be 6 digits" });
        }

        // Get counselor with OTP info
        console.log("Querying database for counselor verification...");
        const [counselors] = await db.query(
            "SELECT * FROM counselor WHERE counselorID = ?",
            [counselorId]
        );

        if (counselors.length === 0) {
            console.log("Counselor not found with ID:", counselorId);
            return res.status(400).json({ message: "Counselor not found" });
        }

        const counselor = counselors[0];
        console.log("Found counselor:", counselor.name, "stored OTP:", counselor.otp, "expiry:", counselor.otp_expiry);

        // Check if OTP exists
        if (!counselor.otp) {
            console.log("No OTP found for counselor");
            return res.status(400).json({ message: "No OTP found. Please request a new one." });
        }

        // Check if OTP is expired
        if (isOTPExpired(counselor.otp_expiry)) {
            console.log("OTP expired for counselor");
            return res.status(400).json({ message: "OTP has expired. Please request a new one." });
        }

        // Verify OTP
        console.log("Comparing OTPs - input:", otp, "stored:", counselor.otp);
        if (!compareOTP(otp, counselor.otp)) {
            console.log("OTP mismatch");
            return res.status(400).json({ message: "Invalid OTP" });
        }

        console.log("OTP is valid, updating counselor...");
        // OTP is valid, verify the counselor and clear OTP
        await db.query(
            "UPDATE counselor SET is_verified = 1, otp = NULL, otp_expiry = NULL WHERE counselorID = ?",
            [counselorId]
        );
        console.log("Counselor updated in database");

        // Send welcome email
        console.log("Sending welcome email...");
        await sendWelcomeEmail(counselor.email, counselor.name);

        // Generate token
        console.log("Generating token...");
        const token = generateToken(counselor.counselorID, res);

        const responseData = {
            counselorId: counselor.counselorID,
            name: counselor.name,
            email: counselor.email,
            is_verified: true,
            token: token,
            message: "Account verified successfully"
        };
        
        console.log("Sending response:", responseData);
        res.status(200).json(responseData);

    } catch (error) {
        console.error("OTP verification error:", error);
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
}

export const resendOTP = async (req, res) => {
    const { counselorId } = req.body;
    
    try {
        if (!counselorId) {
            return res.status(400).json({ message: "Counselor ID is required" });
        }

        // Get counselor info
        const [counselors] = await db.query(
            "SELECT * FROM counselor WHERE counselorID = ?",
            [counselorId]
        );

        if (counselors.length === 0) {
            return res.status(400).json({ message: "Counselor not found" });
        }

        const counselor = counselors[0];

        // Check if already verified
        if (counselor.is_verified) {
            return res.status(400).json({ message: "Account is already verified" });
        }

        // Generate new OTP
        const otp = generateOTP();
        const otpExpiry = getOTPExpiryTime(5); // 5 minutes

        // Update counselor with new OTP
        await db.query(
            "UPDATE counselor SET otp = ?, otp_expiry = ? WHERE counselorID = ?",
            [otp, otpExpiry, counselorId]
        );

        // Send OTP email
        const emailSent = await sendOTPEmail(counselor.email, otp, counselor.name);
        
        if (!emailSent) {
            return res.status(500).json({ message: "Failed to send verification email" });
        }

        res.status(200).json({
            message: "OTP resent successfully"
        });

    } catch (error) {
        console.error("Resend OTP error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const checkAuth = (req, res) => {
    try {
        // Get the JWT token from cookies
        const token = req.cookies.jwt;
        
        if (!token) {
            return res.status(401).json({ message: "Unauthorized: No token provided" });
        }
        
        // Verify the JWT token
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                return res.status(401).json({ message: "Unauthorized: Invalid token" });
            }
            
            // Token is valid, return user info
            res.status(200).json({ 
                message: "Authenticated",
                counselorId: decoded.id,
                isAuthenticated: true
            });
        });
    } catch (error) {
        console.error("Check auth error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}
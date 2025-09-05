import express from "express";
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import dotenv from "dotenv";
import { db } from "./lib/db.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import { app, server } from "./lib/socket.js";

dotenv.config();

//middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: [
        "http://localhost:5173", // Local development
        "https://tsucare.netlify.app" // Production frontend
    ],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Cookie'],
    exposedHeaders: ['Set-Cookie']
}));
//routes
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

const PORT = process.env.PORT || 3000;

// Connect to database first, then start server
const startServer = async () => {
    try {
        // Test the database connection
        await db.query('SELECT 1');
        console.log("Connected to MySQL database");
        
        // Start server only after successful database connection
        server.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (error) {
        console.error('Database connection failed:', error);
        process.exit(1);
    }
};

startServer();
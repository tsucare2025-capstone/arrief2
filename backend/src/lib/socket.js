import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
    cors: { 
        origin: [
            "http://localhost:5173", // Local development
            "https://tsucare.netlify.app" // Production frontend
        ],
        credentials: true
    }
})



// Map to store online users and their sockets
const userSocketMap = {}

// Function to get the socket id of the receiver
export function getReceiverSocketId(receiverID) {
    return userSocketMap[receiverID];
}





io.on("connection", (socket) => {
    const counselorID = socket.handshake.query.counselorID;
    if(counselorID) userSocketMap[counselorID] = socket.id;

    // Emit the online users to all clients
    io.emit("getOnlineUsers", Object.keys(userSocketMap));

    socket.on("disconnect", () => {
        delete userSocketMap[counselorID];
        io.emit("getOnlineUsers", Object.keys(userSocketMap));
    })
})

export { io, app, server };
import { create } from "zustand";
import axiosInstance from "../lib/axios";  
import { toast } from "react-hot-toast";
import { io } from "socket.io-client";


const baseURL = process.env.REACT_APP_BACKEND_URL || "http://localhost:3000";

export const useAuthStore = create((set, get) => ({
    authUser: null,
    isCheckAuth: false,
    isSignedUp: false,
    isLoggedIn: false,
    onlineUsers: [],
    socket: null,
    
    checkAuth: async () => {
        set({ isCheckAuth: true });
        try {
            const response = await axiosInstance.get("/auth/check-auth");
            console.log("Auth check response:", response.data);
            set({ authUser: response.data, isCheckAuth: false });
            get().connectSocket();
        } catch (error) {
            // Don't show error toast for authentication checks - this is normal for new users
            // Only log the error for debugging
            console.log("Auth check failed (this is normal for new users):", error.response?.data?.message);
            set({ authUser: null, isCheckAuth: false });
        }
    },

    signup: async (data) => {
        set({ isSignedUp: true });
        try {
            const response = await axiosInstance.post("/auth/signup", data);
            
            // Store token in localStorage as fallback
            if (response.data.token) {
                localStorage.setItem('authToken', response.data.token);
            }
            
            set({ authUser: response.data});
            toast.success(response.data.message || "Signup successful");
            get().connectSocket();
        } catch (error) {
            toast.error(error.response?.data?.message || "Signup failed");
        } finally {
            set({ isSignedUp: false });
        }
    },
    
    login: async (data) => {
        set({ isLoggedIn: true });
        try {
            const response = await axiosInstance.post("/auth/login", data);
            
            // Store token in localStorage as fallback
            if (response.data.token) {
                localStorage.setItem('authToken', response.data.token);
            }
            
            set({ authUser: response.data});
            toast.success(response.data.message || "Login successful");

            get().connectSocket();
        } catch (error) {
            toast.error(error.response?.data?.message || "Login failed");
        } finally {
            set({ isLoggedIn: false });
        }
    },

    logout: async () => {
        try{
            await axiosInstance.post("/auth/logout");
            
            // Clear token from localStorage
            localStorage.removeItem('authToken');
            
            set({ authUser: null, isLoggedIn: false });
            toast.success("Logout successful");
            get().disconnectSocket();
        } catch (error) {
            toast.error(error.response?.data?.message || "Logout failed")
        }
      },

      connectSocket: () => {
        
        const {authUser} = get();
        if(!authUser || get().socket?.connected) return;

        const socket = io(baseURL, {
            query: {
                counselorID: authUser.counselorId
            }
        });
        socket.connect();

        set({socket: socket});

        socket.on("getOnlineUsers", (onlineUsers) => {
            set({onlineUsers: onlineUsers});
        });
      },

      disconnectSocket: () => {
        if(get().socket?.connected) get().socket.disconnect();
      }
}));

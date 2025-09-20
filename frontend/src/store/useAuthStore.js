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
    isVerifyingOTP: false,
    pendingVerification: null, // Stores counselor data when OTP verification is needed
    onlineUsers: [],
    socket: null,
    
    checkAuth: async () => {
        set({ isCheckAuth: true });
        try {
            const response = await axiosInstance.get("/auth/check-auth");
            set({ authUser: response.data, isCheckAuth: false });
            get().connectSocket();
        } catch (error) {
            // Check if it's a token issue (cookies blocked)
            if (error.response?.status === 401) {
                // Check if we have a token in localStorage as fallback
                const token = localStorage.getItem('authToken');
                if (token) {
                    // Try to restore the session using the token
                    try {
                        const response = await axiosInstance.get("/auth/check-auth");
                        set({ authUser: response.data, isCheckAuth: false });
                        get().connectSocket();
                        return;
                    } catch (retryError) {
                        // Token restoration failed, continue with normal error handling
                    }
                }
            }
            
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
            
            // Check if OTP verification is needed
            if (!response.data.is_verified) {
                set({ 
                    pendingVerification: response.data,
                    isLoggedIn: false 
                });
                toast.success(response.data.message || "OTP sent to your email");
                return;
            }
            
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

    verifyOTP: async (counselorId, otp) => {
        set({ isVerifyingOTP: true });
        try {
            const response = await axiosInstance.post("/auth/verify-otp", {
                counselorId,
                otp
            });
            
            // Store token in localStorage as fallback
            if (response.data.token) {
                localStorage.setItem('authToken', response.data.token);
            }
            
            set({ 
                authUser: response.data,
                pendingVerification: null 
            });
            toast.success(response.data.message || "Account verified successfully!");
            
            get().connectSocket();
        } catch (error) {
            toast.error(error.response?.data?.message || "OTP verification failed");
        } finally {
            set({ isVerifyingOTP: false });
        }
    },

    resendOTP: async (counselorId) => {
        try {
            await axiosInstance.post("/auth/resend-otp", { counselorId });
            toast.success("OTP resent successfully!");
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to resend OTP");
        }
    },

    clearPendingVerification: () => {
        set({ pendingVerification: null });
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

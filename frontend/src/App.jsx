import React, { useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import Messages from './pages/Messages'
import StudentProfiles from './pages/StudentProfiles'
import StudentDetail from './pages/StudentDetail'
import SessionDetail from './pages/SessionDetail'
import SessionHistory from './pages/SessionHistory'
import Notifications from './pages/Notifications'
import Calendar from './pages/Calendar'
import { useAuthStore } from './store/useAuthStore'
import { Loader } from "lucide-react";
import { Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast'

const App = () => {
  const { authUser, checkAuth, isCheckAuth, onlineUsers } = useAuthStore();

  useEffect(() => {
    // Check auth status on mount - only run once
    checkAuth();
  }, []); // Empty dependency array to prevent infinite loop
  
  // Show loading spinner while checking auth
  if (isCheckAuth) {
    return (
      <div className='flex justify-center items-center h-screen'>
        <Loader className='animate-spin' />
      </div>
    );
  }

  return (
    <div data-theme="light">
      <Routes>
        <Route path="/" element={authUser ? <HomePage /> : <Navigate to="/login" />} />
        <Route path="/login" element={authUser ? <Navigate to="/" /> : 
          <>
          <Navbar />
          <LoginPage />
          </>
        } />
        <Route path="/signup" element={authUser ? <Navigate to="/" /> : 
          <>
            <Navbar />
            <SignupPage />
          </>
        } />
        <Route path="/messages" element={authUser ? <Messages /> : <Navigate to="/login" />} />
        <Route path="/student-profiles" element={authUser ? <StudentProfiles /> : <Navigate to="/login" />} />
        <Route path="/student-detail/:id" element={authUser ? <StudentDetail /> : <Navigate to="/login" />} />
        <Route path="/session-detail" element={authUser ? <SessionDetail /> : <Navigate to="/login" />} />
        <Route path="/session-history" element={authUser ? <SessionHistory /> : <Navigate to="/login" />} />
        <Route path="/notifications" element={authUser ? <Notifications /> : <Navigate to="/login" />} />
        <Route path="/calendar" element={authUser ? <Calendar /> : <Navigate to="/login" />} />
      </Routes>
      <Toaster />
    </div>
  )
}

export default App
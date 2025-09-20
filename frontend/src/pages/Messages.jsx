import {useChatStore} from '../store/useChatStore'
import ChatContainer from '../components/ChatContainer'
import NoChatSelected from '../components/NoChatSelected'
import Sidebar from '../components/Sidebar'
import { useAuthStore } from '../store/useAuthStore'
import { Link } from 'react-router-dom'
import { Grid3X3, Trophy, Mail, CalendarIcon, Bell, History, LogOut } from 'lucide-react'
import { useState } from 'react'
import CalendarPage from './Calendar'
import Notifications from './Notifications'
import SessionHistory from './SessionHistory'
import StudentProfiles from './StudentProfiles'
import StudentDetail from './StudentDetail'
import SessionDetail from './SessionDetail'

const Messages = () => {
    const {selectedUser} = useChatStore();
    const {authUser, logout} = useAuthStore();
    
    return (
        <div className="messages-page-container">

             {/* Sidebar */}
      <div className="sidebar">
        <div className="logo">
          <img src="/logo-counsel.png" alt="TSU Logo" />
        </div>
        <ul className="nav-links">
          <li>
            <Link to="/">
              <Grid3X3 size={20} />
              Dashboard
            </Link>
          </li>
          <li>
            <Link to="/student-profiles">
              <Trophy size={20} />
              Student Profiles
            </Link>
          </li>
          <li className="active">
            <Link to="/messages">
              <Mail size={20} />
              Messages
            </Link>
          </li>
          <li>
            <Link to="/calendar">
              <CalendarIcon size={20} />
              Calendar
            </Link>
          </li>
          <li>
            <Link to="/notifications">
              <Bell size={20} />
              Notifications
            </Link>
          </li>
          <li>
            <Link to="/session-history">
              <History size={20} />
              Session History
            </Link>
          </li>
          <li className="sign-out">
            {authUser && (
              <Link 
                to="/login" 
                className="text-white hover:text-red-200 transition-colors duration-200" 
                onClick={logout}
              >
                <LogOut size={20} />
                Logout
              </Link>
            )}
          </li>
        </ul>
      </div>
        
         {/* Messages List Section */}
      <div className="messages-list">
        <Sidebar />
      </div>

    {/* Chat Container Section */}
    {selectedUser ? (
        <ChatContainer />
      ) : (
        <div className="chat-container">
          <NoChatSelected />
        </div>
      )}
        </div>
  )
}

export default Messages
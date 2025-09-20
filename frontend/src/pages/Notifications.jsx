import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Grid3X3, Trophy, Mail, CalendarIcon, Bell, History, LogOut } from 'lucide-react';
import { useAuthStore } from '../store/useAuthStore';
import Messages from './Messages'
import CalendarPage from './Calendar'
import SessionHistory from './SessionHistory'
import StudentProfiles from './StudentProfiles'
import StudentDetail from './StudentDetail'
import SessionDetail from './SessionDetail'
const Notifications = () => {
  const {authUser, logout} = useAuthStore();
  
  // Mock data - replace with actual data from API
  const notifications = [
    {
      id: 1,
      type: 'upcoming',
      icon: 'fas fa-bell',
      message: 'Your next session with Student is in 30 minutes.',
      highlight: 'Student'
    },
    {
      id: 2,
      type: 'confirmed',
      icon: 'fas fa-bell',
      message: 'Your session with Student has been confirmed for March 29, 2025 at 3:30 pm.',
      highlight: 'Student'
    },
    {
      id: 3,
      type: 'urgent',
      icon: 'fas fa-exclamation-triangle',
      message: 'Student has reported severe distress. Immediate attention may be needed.',
      highlight: 'Student'
    },
    {
      id: 4,
      type: 'message',
      icon: 'user-stud.png',
      message: 'Student sent you a message. Tap to respond.',
      highlight: 'Student'
    },
    {
      id: 5,
      type: 'feedback',
      icon: 'user-stud.png',
      message: 'Student has submitted feedback on their last session. Tap to review.',
      highlight: 'Student'
    }
  ];

  const getNotificationStyle = (type) => {
    const baseStyle = {
      display: 'flex',
      alignItems: 'center',
      padding: '15px 20px',
      borderRadius: '10px',
      marginBottom: '10px',
      cursor: 'pointer',
      transition: 'all 0.2s ease'
    };

    switch (type) {
      case 'upcoming':
        return {
          ...baseStyle,
          backgroundColor: '#fff3cd',
          borderLeft: '4px solid #ffc107'
        };
      case 'confirmed':
        return {
          ...baseStyle,
          backgroundColor: '#d4edda',
          borderLeft: '4px solid #28a745'
        };
      case 'urgent':
        return {
          ...baseStyle,
          backgroundColor: '#f8d7da',
          borderLeft: '4px solid #dc3545'
        };
      case 'message':
        return {
          ...baseStyle,
          backgroundColor: '#d1ecf1',
          borderLeft: '4px solid #17a2b8'
        };
      case 'feedback':
        return {
          ...baseStyle,
          backgroundColor: '#e2e3e5',
          borderLeft: '4px solid #6c757d'
        };
      default:
        return baseStyle;
    }
  };

  return (
    <div className="dashboard-container">
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
          <li>
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
          <li className="active">
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

      {/* Notifications Container */}
      <div className="notifications-container" style={{ flex: 1, backgroundColor: '#fff', margin: '20px', borderRadius: '20px', boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)', display: 'flex', flexDirection: 'column' }}>
        <div className="notifications-header" style={{ padding: '20px', borderBottom: '1px solid #eee' }}>
          <h2 style={{ color: '#6a040f', margin: 0, fontSize: '24px', textAlign: 'center' }}>NOTIFICATIONS</h2>
        </div>
        
        <div className="notifications-list" style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '15px', overflowY: 'auto', flex: 1 }}>
          {notifications.map((notification) => (
            <div 
              key={notification.id} 
              className={`notification-item ${notification.type}`}
              style={getNotificationStyle(notification.type)}
              onMouseEnter={(e) => {
                e.target.style.transform = 'translateX(5px)';
                e.target.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.1)';
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'translateX(0)';
                e.target.style.boxShadow = 'none';
              }}
            >
              <div className="notification-icon" style={{ marginRight: '15px', flexShrink: 0 }}>
                {notification.icon.startsWith('fas') ? (
                  <i className={notification.icon} style={{ fontSize: '20px', color: '#6a040f' }}></i>
                ) : (
                  <img 
                    src={`/${notification.icon}`} 
                    alt="Notification" 
                    style={{ width: '30px', height: '30px', borderRadius: '50%', objectFit: 'cover' }}
                  />
                )}
              </div>
              <div className="notification-content" style={{ flex: 1 }}>
                <p style={{ margin: 0, fontSize: '14px', color: '#333', lineHeight: '1.4' }}>
                  {notification.message.split(notification.highlight).map((part, index) => (
                    <React.Fragment key={index}>
                      {part}
                      {index < notification.message.split(notification.highlight).length - 1 && (
                        <span className="highlight" style={{ fontWeight: 'bold', color: '#6a040f' }}>
                          {notification.highlight}
                        </span>
                      )}
                    </React.Fragment>
                  ))}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Notifications;

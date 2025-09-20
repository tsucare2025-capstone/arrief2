import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Grid3X3, Trophy, Mail, Calendar, Bell, History, LogOut } from 'lucide-react';
import { useAuthStore } from '../store/useAuthStore';
import axiosInstance from '../lib/axios';

const SessionHistory = () => {
  const {authUser, logout} = useAuthStore();
  const navigate = useNavigate();
  
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentDate, setCurrentDate] = useState(new Date());
  
  // Format current month for display
  const currentMonth = currentDate.toLocaleDateString('en-US', { 
    month: 'long', 
    year: 'numeric' 
  });

  // Fetch sessions data
  useEffect(() => {
    const fetchSessions = async () => {
      try {
        setLoading(true);
        const month = currentDate.getMonth() + 1; // JavaScript months are 0-indexed
        const year = currentDate.getFullYear();
        
        const response = await axiosInstance.get(`/students/sessions/history?month=${month}&year=${year}`);
        setSessions(response.data);
      } catch (error) {
        console.error('Error fetching sessions:', error);
        setError('Failed to load session history');
      } finally {
        setLoading(false);
      }
    };

    fetchSessions();
  }, [currentDate]);

  const handlePreviousMonth = () => {
    setCurrentDate(prevDate => {
      const newDate = new Date(prevDate);
      newDate.setMonth(newDate.getMonth() - 1);
      return newDate;
    });
  };

  const handleNextMonth = () => {
    setCurrentDate(prevDate => {
      const newDate = new Date(prevDate);
      newDate.setMonth(newDate.getMonth() + 1);
      return newDate;
    });
  };

  const handleSessionClick = (studentID) => {
    navigate(`/student-detail/${studentID}`);
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
              <Calendar size={20} />
              Calendar
            </Link>
          </li>
          <li>
            <Link to="/notifications">
              <Bell size={20} />
              Notifications
            </Link>
          </li>
          <li className="active">
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

      {/* Session History Container */}
      <div className="history-container" style={{ flex: 1, backgroundColor: '#fff', margin: '20px', borderRadius: '20px', boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)', display: 'flex', flexDirection: 'column' }}>
        <div className="history-header" style={{ padding: '20px', borderBottom: '1px solid #eee' }}>
          <div className="month-navigation" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '20px' }}>
            <button 
              className="nav-btn" 
              onClick={handlePreviousMonth}
              style={{ 
                backgroundColor: '#6a040f', 
                color: 'white', 
                border: 'none', 
                padding: '10px 15px', 
                borderRadius: '5px', 
                cursor: 'pointer',
                fontSize: '16px',
                fontWeight: 'bold'
              }}
            >
              &lt;
            </button>
            <h2 style={{ margin: 0, fontSize: '24px', color: '#333' }}>{currentMonth}</h2>
            <button 
              className="nav-btn" 
              onClick={handleNextMonth}
              style={{ 
                backgroundColor: '#6a040f', 
                color: 'white', 
                border: 'none', 
                padding: '10px 15px', 
                borderRadius: '5px', 
                cursor: 'pointer',
                fontSize: '16px',
                fontWeight: 'bold'
              }}
            >
              &gt;
            </button>
          </div>
        </div>
        
        <div className="session-list" style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '15px', overflowY: 'auto', flex: 1 }}>
          {loading ? (
            <div style={{ textAlign: 'center', padding: '40px', color: '#666' }}>
              <div style={{ fontSize: '18px' }}>Loading sessions...</div>
            </div>
          ) : error ? (
            <div style={{ textAlign: 'center', padding: '40px', color: '#dc3545' }}>
              <div style={{ fontSize: '18px', marginBottom: '20px' }}>{error}</div>
              <button 
                onClick={() => window.location.reload()}
                style={{ 
                  backgroundColor: '#6a040f', 
                  color: 'white', 
                  border: 'none', 
                  padding: '10px 20px', 
                  borderRadius: '5px', 
                  cursor: 'pointer' 
                }}
              >
                Retry
              </button>
            </div>
          ) : sessions.length > 0 ? (
            sessions.map((session) => (
              <div 
                key={session.sessionID} 
                className="session-item" 
                onClick={() => handleSessionClick(session.studentID)}
                style={{ 
                  display: 'flex', 
                  alignItems: 'flex-start', 
                  backgroundColor: '#f8f9fa', 
                  padding: '20px', 
                  borderRadius: '10px', 
                  gap: '15px',
                  boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
                  cursor: 'pointer',
                  transition: 'transform 0.2s ease, box-shadow 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = 'translateY(-2px)';
                  e.target.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.15)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = '0 2px 5px rgba(0, 0, 0, 0.1)';
                }}
              >
                <div className="session-profile" style={{ flexShrink: 0, marginTop: '5px' }}>
                  <div style={{ 
                    width: '40px', 
                    height: '40px', 
                    borderRadius: '50%', 
                    backgroundColor: '#e9ecef',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: '2px solid #333'
                  }}>
                    <i className="fas fa-user" style={{ fontSize: '16px', color: '#333' }}></i>
                  </div>
                </div>
                <div className="session-details" style={{ flex: 1 }}>
                  <div className="session-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                    <h3 style={{ margin: 0, fontSize: '16px', color: '#ff6b35', fontWeight: 'bold' }}>{session.studentName}</h3>
                    <span className="session-date" style={{ fontSize: '14px', color: '#666' }}>{session.date}</span>
                  </div>
                  <div className={`session-status ${session.status}`} style={{ 
                    marginBottom: '8px',
                    padding: '2px 6px', 
                    borderRadius: '4px', 
                    fontSize: '12px', 
                    fontWeight: 'bold',
                    display: 'inline-block',
                    backgroundColor: session.status === 'Resolved' ? '#d4edda' : '#f8d7da',
                    color: session.status === 'Resolved' ? '#155724' : '#721c24'
                  }}>
                    {session.status === 'Resolved' ? 'Resolved' : 'Cancelled'}
                  </div>
                  <div className="session-feedback" style={{ marginTop: '5px' }}>
                    <p style={{ 
                      margin: 0, 
                      fontSize: '14px', 
                      color: '#666', 
                      fontStyle: session.feedback && session.feedback !== 'No feedback yet' ? 'italic' : 'normal',
                      lineHeight: '1.4'
                    }}>
                      {session.feedback ? `"${session.feedback}"` : 'No feedback yet'}
                    </p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div style={{ textAlign: 'center', padding: '40px', color: '#666' }}>
              <i className="fas fa-calendar-times" style={{ fontSize: '48px', marginBottom: '20px', color: '#ccc' }}></i>
              <p>No sessions found for {currentMonth}.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SessionHistory;

import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Grid3X3, Trophy, Mail, Calendar, Bell, History, LogOut } from 'lucide-react'
import { useAuthStore } from '../store/useAuthStore'
import axiosInstance from '../lib/axios'

const HomePage = () => {
  const {authUser, logout} = useAuthStore();
  const navigate = useNavigate();
  
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch dashboard data
  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get('/students/dashboard/stats');
      setDashboardData(response.data);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      setError('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  // Initial data fetch
  useEffect(() => {
    fetchDashboardData();
  }, []);

  // Real-time updates - refresh data every 30 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      fetchDashboardData();
    }, 30000); // 30 seconds

    return () => clearInterval(interval);
  }, []);

  // Format date for display
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const month = date.toLocaleDateString('en-US', { month: 'short' }).toUpperCase();
    const day = date.getDate().toString().padStart(2, '0');
    return `${month} ${day}`;
  };

  // Format time for display
  const formatTime = (timeString) => {
    const time = new Date(`2000-01-01T${timeString}`);
    return time.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    });
  };

  // Handle session click
  const handleSessionClick = (studentID) => {
    navigate(`/student-detail/${studentID}`);
  };

  if (loading) {
    return (
      <div className="dashboard-container">
        <div className="sidebar">
          <div className="logo">
            <img src="/logo-counsel.png" alt="TSU Logo" />
          </div>
          <ul className="nav-links">
            <li className="active">
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
        <div className="main-content" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '18px', color: '#666' }}>Loading dashboard...</div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="dashboard-container">
        <div className="sidebar">
          <div className="logo">
            <img src="/logo-counsel.png" alt="TSU Logo" />
          </div>
          <ul className="nav-links">
            <li className="active">
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
        <div className="main-content" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '18px', color: '#dc3545', marginBottom: '20px' }}>{error}</div>
            <button 
              onClick={fetchDashboardData}
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
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <div className="sidebar">
        <div className="logo">
          <img src="/logo-counsel.png" alt="TSU Logo" />
        </div>
        <ul className="nav-links">
          <li className="active">
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
          <li>
            <Link to="/session-history">
              <History size={20} />
              Session History
            </Link>
          </li>
          <li className="sign-out">
          {authUser && (
          <>
            <Link 
              to="/login" 
              className="text-white hover:text-red-200 transition-colors duration-200" 
              onClick={logout}
            >
              <LogOut size={20} />
              Logout
            </Link>
          </>
        )}
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="main-content">
        <div className="header">
          <div className="greeting">
            <h1>Good Day,</h1>
            <h2>{dashboardData?.counselor?.name || 'Counselor'}!</h2>
          </div>
        </div>

        <div className="monthly-sessions">
          <h2>Upcoming Sessions</h2>
          <div className="sessions-list">
            {dashboardData?.upcomingSessions?.length > 0 ? (
              dashboardData.upcomingSessions.map((session) => (
                <div 
                  key={session.sessionID} 
                  className="session-item"
                  onClick={() => handleSessionClick(session.studentID)}
                  style={{ cursor: 'pointer' }}
                >
                  <div className="session-time">
                    <span className="date">{formatDate(session.date)}</span>
                    <span className="time">{formatTime(session.time)}</span>
                  </div>
                  <div className="session-info">
                    <img src={session.profileImage} alt={session.studentName} />
                    <div className="student-details">
                      <h3>{session.studentName}</h3>
                      <p>{session.campus}</p>
                      <p style={{ 
                        color: session.status === 'Resolved' ? '#28a745' : '#dc3545',
                        fontWeight: 'bold',
                        fontSize: '12px'
                      }}>
                        {session.status}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div style={{ textAlign: 'center', padding: '40px', color: '#666' }}>
                <i className="fas fa-calendar-times" style={{ fontSize: '48px', marginBottom: '20px', color: '#ccc' }}></i>
                <p>No upcoming sessions for this month.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Right Sidebar */}
      <div className="right-sidebar">
        <div className="counselor-profile">
          <img src={dashboardData?.counselor?.image || '/counsel-prof.png'} alt="Counselor Avatar" />
          <h3>{dashboardData?.counselor?.name || 'Counselor'}</h3>
          <p>{dashboardData?.counselor?.profession || 'Counselor'}</p>
        </div>
        <div className="stats-card">
          <h2>{dashboardData?.stats?.totalStudents || 0}</h2>
          <p>Total Students<br />this month</p>
        </div>
      </div>
    </div>
  );
}

export default HomePage
import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { Grid3X3, Trophy, Mail, Calendar, Bell, History, LogOut } from 'lucide-react';
import { useAuthStore } from '../store/useAuthStore';
import axiosInstance from '../lib/axios';

const StudentDetail = () => {
  const {authUser, logout} = useAuthStore();
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [studentData, setStudentData] = useState(null);
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch student data
  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get(`/students/${id}`);
        setStudentData(response.data);
      } catch (error) {
        console.error('Error fetching student data:', error);
        setError('Student not found or access denied');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchStudentData();
    }
  }, [id]);

  // Fetch student sessions
  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const response = await axiosInstance.get(`/students/${id}/sessions`);
        setSessions(response.data);
      } catch (error) {
        console.error('Error fetching sessions:', error);
        // Don't set error for sessions, just leave empty array
      }
    };

    if (id) {
      fetchSessions();
    }
  }, [id]);

  // Loading state
  if (loading) {
    return (
      <div className="dashboard-container">
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
            <li className="active">
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
        <div className="main-content" style={{ flex: 1, padding: '30px', backgroundColor: 'rgb(255, 255, 255)', boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)', borderRadius: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '18px', color: '#666' }}>Loading student details...</div>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="dashboard-container">
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
            <li className="active">
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
        <div className="main-content" style={{ flex: 1, padding: '30px', backgroundColor: 'rgb(255, 255, 255)', boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)', borderRadius: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '18px', color: '#dc3545', marginBottom: '20px' }}>{error}</div>
            <button 
              onClick={() => navigate('/student-profiles')}
              style={{ 
                backgroundColor: '#6a040f', 
                color: 'white', 
                border: 'none', 
                padding: '10px 20px', 
                borderRadius: '5px', 
                cursor: 'pointer' 
              }}
            >
              Back to Student Profiles
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Format date for display
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const month = date.toLocaleDateString('en-US', { month: 'short' }).toUpperCase();
    const day = date.getDate().toString().padStart(2, '0');
    return { month, day };
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
          <li className="active">
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

      {/* Main Content */}
      <div className="main-content" style={{ flex: 1, padding: '30px', backgroundColor: 'rgb(255, 255, 255)', boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)', borderRadius: '20px' }}>
        {/* Back Button */}
        <div className="back-button" style={{ marginBottom: '20px' }}>
          <button 
            onClick={() => navigate('/student-profiles')}
            style={{ color: '#666', textDecoration: 'none', display: 'flex', alignItems: 'center', background: 'none', border: 'none', cursor: 'pointer' }}
          >
            <i className="fas fa-arrow-left" style={{ marginRight: '5px' }}></i>
            Back to Student Profiles
          </button>
        </div>

        {/* Student Info and Mood Section */}
        <div className="student-detail-container" style={{ display: 'flex', gap: '30px', marginBottom: '40px', marginTop: '20px' }}>
          <div className="student-info-card" style={{ backgroundColor: '#f8f9fa', padding: '20px', borderRadius: '10px', flex: 1, display: 'flex', alignItems: 'center', gap: '20px' }}>
            <img src={studentData?.profileImage || '/user-stud.png'} alt="Student Profile" className="student-profile-img" style={{ width: '80px', height: '80px', borderRadius: '50%', objectFit: 'cover' }} />
            <div className="student-info">
              <h2 style={{ margin: '0 0 10px 0', fontSize: '24px', color: '#333' }}>{studentData?.name || 'Unknown Student'}</h2>
              <p style={{ margin: '5px 0', color: '#666' }}>Program: {studentData?.program || 'N/A'}</p>
              <p style={{ margin: '5px 0', color: '#666' }}>Student No: {studentData?.studentNo || 'N/A'}</p>
              <p style={{ margin: '5px 0', color: '#666' }}>Gender: {studentData?.gender || 'N/A'}</p>
              <p style={{ margin: '5px 0', color: '#666' }}>College: {studentData?.college || 'N/A'}</p>
            </div>
          </div>

          <div className="mood-card" style={{ backgroundColor: '#e3f2fd', padding: '20px', borderRadius: '10px', textAlign: 'center', minWidth: '200px' }}>
            <h3 style={{ margin: '0 0 15px 0', color: '#333' }}>Mood for today</h3>
            <img src="/happiness.png" alt="Happy Mood" className="mood-emoji" style={{ width: '40px', height: '40px', marginBottom: '15px' }} />
            <button 
              className="mood-log-btn" 
              style={{ 
                backgroundColor: '#6a040f', 
                color: 'white', 
                border: 'none', 
                padding: '10px 20px', 
                borderRadius: '5px', 
                cursor: 'pointer',
                opacity: 0.6
              }}
              disabled
            >
              View Mood Log
            </button>
          </div>
        </div>

        {/* Sessions Section */}
        <div className="sessions-section" style={{ marginTop: '30px' }}>
          <h2 style={{ margin: '0 0 20px 0', fontSize: '24px', color: '#333' }}>Session History</h2>
          <div className="session-list" style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            {sessions.length > 0 ? (
              sessions.map((session) => {
                const { month, day } = formatDate(session.sessionDate);
                return (
                  <div key={session.sessionID} className="session-card" style={{ display: 'flex', alignItems: 'center', backgroundColor: '#f8f9fa', padding: '20px', borderRadius: '10px', gap: '20px' }}>
                <div className="session-date" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minWidth: '60px' }}>
                      <span className="month" style={{ fontSize: '12px', fontWeight: 'bold', color: '#666', textTransform: 'uppercase' }}>{month}</span>
                      <span className="day" style={{ fontSize: '24px', fontWeight: 'bold', color: '#333' }}>{day}</span>
                </div>
                <div className="session-details" style={{ flex: 1 }}>
                      <h3 style={{ margin: '0 0 5px 0', fontSize: '18px', color: '#333' }}>Session #{session.sessionID}</h3>
                      <p style={{ margin: '5px 0', color: '#666' }}>Campus: {session.campus || 'N/A'}</p>
                      <p style={{ margin: '5px 0', color: '#666' }}>Time: {session.sessionTime || 'N/A'}</p>
                      {session.sessionNotes && (
                        <p style={{ margin: '5px 0', color: '#666', fontSize: '14px' }}>Notes: {session.sessionNotes}</p>
                      )}
                  <p className={`session-status ${session.status}`} style={{ 
                    margin: '5px 0 0 0', 
                    padding: '4px 8px', 
                    borderRadius: '4px', 
                    fontSize: '12px', 
                    fontWeight: 'bold',
                    display: 'inline-block',
                        backgroundColor: session.status === 'Resolved' ? '#d4edda' : '#f8d7da',
                        color: session.status === 'Resolved' ? '#155724' : '#721c24'
                  }}>
                        {session.status || 'Unknown'}
                  </p>
                </div>
                </div>
                );
              })
            ) : (
              <div style={{ textAlign: 'center', padding: '40px', color: '#666' }}>
                <i className="fas fa-calendar-times" style={{ fontSize: '48px', marginBottom: '20px', color: '#ccc' }}></i>
                <p>No sessions found for this student.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDetail;

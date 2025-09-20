import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Grid3X3, Trophy, Mail, CalendarIcon, Bell, History, LogOut } from 'lucide-react';
import { useAuthStore } from '../store/useAuthStore';
import Messages from './Messages'
import CalendarPage from './Calendar'
import Notifications from './Notifications'
import SessionHistory from './SessionHistory'
import StudentProfiles from './StudentProfiles'
import StudentDetail from './StudentDetail'


const SessionDetail = () => {
  const [notes, setNotes] = useState('');
  const [feedback, setFeedback] = useState('');
  const {authUser, logout} = useAuthStore();

  // Mock data - replace with actual data from props or API
  const studentData = {
    name: 'Student',
    program: 'Program',
    studentNumber: 'Student Number',
    gender: 'Gender',
    profileImage: '/user-stud.png'
  };

  const sessionData = {
    title: 'First Session',
    campus: 'Campus',
    date: 'Date',
    mood: 'Happy',
    moodIcon: '/happiness.png'
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
          <li className="active">
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

      {/* Main Content */}
      <div className="main-content" style={{ flex: 1, padding: '30px', backgroundColor: 'rgb(255, 255, 255)', boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)', borderRadius: '20px' }}>
        {/* Back Button */}
        <div className="back-button" style={{ marginBottom: '20px' }}>
          <a href="/student-detail" style={{ color: '#666', textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
            <i className="fas fa-arrow-left" style={{ marginRight: '5px' }}></i>
          </a>
        </div>

        {/* Student Info and Mood Section */}
        <div className="student-detail-container" style={{ display: 'flex', gap: '30px', marginBottom: '40px', marginTop: '20px' }}>
          <div className="student-info-card" style={{ backgroundColor: '#f8f9fa', padding: '20px', borderRadius: '10px', flex: 1, display: 'flex', alignItems: 'center', gap: '20px' }}>
            <img src={studentData.profileImage} alt="Student Profile" className="student-profile-img" style={{ width: '80px', height: '80px', borderRadius: '50%', objectFit: 'cover' }} />
            <div className="student-info">
              <h2 style={{ margin: '0 0 10px 0', fontSize: '24px', color: '#333' }}>{studentData.name}</h2>
              <p style={{ margin: '5px 0', color: '#666' }}>{studentData.program}</p>
              <p style={{ margin: '5px 0', color: '#666' }}>{studentData.studentNumber}</p>
              <p style={{ margin: '5px 0', color: '#666' }}>{studentData.gender}</p>
            </div>
          </div>

          <div className="mood-card" style={{ backgroundColor: '#e3f2fd', padding: '20px', borderRadius: '10px', textAlign: 'center', minWidth: '200px' }}>
            <h3 style={{ margin: '0 0 15px 0', color: '#333' }}>Mood for today</h3>
            <img src={sessionData.moodIcon} alt="Happy Mood" className="mood-emoji" style={{ width: '40px', height: '40px', marginBottom: '15px' }} />
            <button className="mood-log-btn" style={{ backgroundColor: '#6a040f', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '5px', cursor: 'pointer' }}>
              View Mood Log
            </button>
          </div>
        </div>

        {/* Session Details Section */}
        <div className="session-detail-section" style={{ marginTop: '30px', backgroundColor: '#ffb444', borderRadius: '10px', padding: '25px', height: '45%' }}>
          <div className="session-detail-header" style={{ marginBottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div className="header-content">
              <h2 style={{ margin: '0 0 10px 0', fontSize: '24px', color: '#333' }}>{sessionData.title}</h2>
              <p style={{ margin: '5px 0', color: '#666' }}>{sessionData.campus}</p>
              <p style={{ margin: '5px 0', color: '#666' }}>{sessionData.date}</p>
            </div>
            <div className="minimize-btn">
              <a href="/student-detail" style={{ color: '#666', textDecoration: 'none' }}>
                <i className="fas fa-external-link-alt"></i>
              </a>
            </div>
          </div>

          <div className="session-feedback-container" style={{ display: 'flex', gap: '20px', height: 'calc(100% - 80px)' }}>
            <div className="feedback-box" style={{ flex: 1, backgroundColor: 'white', padding: '20px', borderRadius: '10px' }}>
              <h3 style={{ margin: '0 0 15px 0', color: '#333' }}>Counselee's Feedback</h3>
              <div className="feedback-content" style={{ backgroundColor: '#f8f9fa', padding: '15px', borderRadius: '5px', minHeight: '120px' }}>
                <p style={{ margin: 0, color: '#666' }}>
                  {feedback || "No feedback provided yet."}
                </p>
              </div>
            </div>

            <div className="notes-box" style={{ flex: 1, backgroundColor: 'white', padding: '20px', borderRadius: '10px' }}>
              <h3 style={{ margin: '0 0 15px 0', color: '#333' }}>Notes</h3>
              <div 
                className="notes-content" 
                contentEditable="true" 
                style={{ backgroundColor: '#f8f9fa', padding: '15px', borderRadius: '5px', minHeight: '120px', border: 'none', outline: 'none' }}
                onInput={(e) => setNotes(e.target.textContent)}
              >
                {notes || "Add your session notes here..."}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SessionDetail;

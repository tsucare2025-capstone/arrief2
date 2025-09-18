import React, { useState } from 'react';

const SessionHistory = () => {
  const [currentMonth, setCurrentMonth] = useState('March 2025');

  // Mock data - replace with actual data from API
  const sessions = [
    {
      id: 1,
      studentName: 'Student',
      date: '03 March',
      status: 'resolved',
      feedback: 'I truly appreciate the support I received. The counselor was very understanding...',
      profileImage: '/user-stud.png'
    },
    {
      id: 2,
      studentName: 'Student',
      date: '11 March',
      status: 'resolved',
      feedback: 'Talking to my counselor felt like a safe space where I could be honest about...',
      profileImage: '/user-stud.png'
    },
    {
      id: 3,
      studentName: 'Student',
      date: '18 March',
      status: 'resolved',
      feedback: 'No feedback yet',
      profileImage: '/user-stud.png'
    },
    {
      id: 4,
      studentName: 'Student',
      date: '20 March',
      status: 'resolved',
      feedback: 'This has been one of the best counseling experiences I\'ve had. My counselor...',
      profileImage: '/user-stud.png'
    },
    {
      id: 5,
      studentName: 'Student',
      date: '23 March',
      status: 'cancelled',
      feedback: null,
      profileImage: '/user-stud.png'
    }
  ];

  const handlePreviousMonth = () => {
    // Logic to go to previous month
  };

  const handleNextMonth = () => {
    // Logic to go to next month
  };

  return (
    <div className="container" style={{ display: 'flex', width: '100%', height: '100vh' }}>
      {/* Sidebar */}
      <div className="sidebar" style={{ width: '220px', backgroundColor: '#6a040f', color: 'white', padding: '20px 0', height: '100%' }}>
        <div className="logo" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '0 20px', marginBottom: '30px' }}>
          <img src="/logo.png" alt="TSU Logo" style={{ width: '80px', height: 'auto', display: 'block', margin: '0 auto' }} />
        </div>
        <ul className="nav-links" style={{ listStyle: 'none', padding: 0, margin: 0 }}>
          <li style={{ marginBottom: '10px' }}>
            <a href="/" style={{ color: 'white', textDecoration: 'none', display: 'flex', alignItems: 'center', padding: '10px 20px' }}>
              <i className="fas fa-th-large" style={{ marginRight: '10px' }}></i>Dashboard
            </a>
          </li>
          <li style={{ marginBottom: '10px' }}>
            <a href="/student-profiles" style={{ color: 'white', textDecoration: 'none', display: 'flex', alignItems: 'center', padding: '10px 20px' }}>
              <i className="fas fa-user-graduate" style={{ marginRight: '10px' }}></i>Student Profiles
            </a>
          </li>
          <li style={{ marginBottom: '10px' }}>
            <a href="/messages" style={{ color: 'white', textDecoration: 'none', display: 'flex', alignItems: 'center', padding: '10px 20px' }}>
              <i className="fas fa-envelope" style={{ marginRight: '10px' }}></i>Messages
            </a>
          </li>
          <li style={{ marginBottom: '10px' }}>
            <a href="/calendar" style={{ color: 'white', textDecoration: 'none', display: 'flex', alignItems: 'center', padding: '10px 20px' }}>
              <i className="fas fa-calendar" style={{ marginRight: '10px' }}></i>Calendar
            </a>
          </li>
          <li style={{ marginBottom: '10px' }}>
            <a href="/notifications" style={{ color: 'white', textDecoration: 'none', display: 'flex', alignItems: 'center', padding: '10px 20px' }}>
              <i className="fas fa-bell" style={{ marginRight: '10px' }}></i>Notifications
            </a>
          </li>
          <li className="active" style={{ marginBottom: '10px', backgroundColor: 'rgba(255, 255, 255, 0.1)' }}>
            <a href="/session-history" style={{ color: 'white', textDecoration: 'none', display: 'flex', alignItems: 'center', padding: '10px 20px' }}>
              <i className="fas fa-history" style={{ marginRight: '10px' }}></i>Session History
            </a>
          </li>
          <li className="sign-out" style={{ marginTop: 'auto', paddingTop: '20px' }}>
            <a href="/login" style={{ color: 'white', textDecoration: 'none', display: 'flex', alignItems: 'center', padding: '10px 20px' }}>
              <i className="fas fa-sign-out-alt" style={{ marginRight: '10px' }}></i>Sign out
            </a>
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
                fontSize: '16px'
              }}
            >
              <i className="fas fa-chevron-left"></i>
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
                fontSize: '16px'
              }}
            >
              <i className="fas fa-chevron-right"></i>
            </button>
          </div>
        </div>
        
        <div className="session-list" style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '15px', overflowY: 'auto', flex: 1 }}>
          {sessions.map((session) => (
            <div key={session.id} className="session-item" style={{ 
              display: 'flex', 
              alignItems: 'center', 
              backgroundColor: '#f8f9fa', 
              padding: '20px', 
              borderRadius: '10px', 
              gap: '20px',
              boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)'
            }}>
              <div className="session-profile" style={{ flexShrink: 0 }}>
                <img 
                  src={session.profileImage} 
                  alt="Student" 
                  style={{ width: '60px', height: '60px', borderRadius: '50%', objectFit: 'cover' }}
                />
              </div>
              <div className="session-details" style={{ flex: 1 }}>
                <div className="session-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                  <h3 style={{ margin: 0, fontSize: '18px', color: '#333' }}>{session.studentName}</h3>
                  <span className="session-date" style={{ fontSize: '14px', color: '#666' }}>{session.date}</span>
                </div>
                <div className={`session-status ${session.status}`} style={{ 
                  marginBottom: '10px',
                  padding: '4px 8px', 
                  borderRadius: '4px', 
                  fontSize: '12px', 
                  fontWeight: 'bold',
                  display: 'inline-block',
                  backgroundColor: session.status === 'resolved' ? '#d4edda' : '#f8d7da',
                  color: session.status === 'resolved' ? '#155724' : '#721c24'
                }}>
                  {session.status === 'resolved' ? 'Resolved' : 'Cancelled'}
                </div>
                {session.feedback && (
                  <div className="session-feedback" style={{ marginTop: '10px' }}>
                    <p style={{ margin: 0, fontSize: '14px', color: '#666', fontStyle: 'italic' }}>
                      "{session.feedback}"
                    </p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SessionHistory;

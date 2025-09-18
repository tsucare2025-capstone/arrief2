import React, { useState } from 'react';

const StudentDetail = () => {
  const [sessions] = useState([
    {
      id: 1,
      month: 'MAY',
      day: '03',
      title: 'First Session',
      campus: 'Campus',
      status: 'resolved'
    },
    {
      id: 2,
      month: 'MAY',
      day: '15',
      title: 'Second Session',
      campus: 'Campus',
      status: 'cancelled'
    }
  ]);

  // Mock data - replace with actual data from props or API
  const studentData = {
    name: 'Student',
    program: 'Program',
    studentNumber: 'Student Number',
    gender: 'Gender',
    profileImage: '/user-stud.png'
  };

  const sessionData = {
    mood: 'Happy',
    moodIcon: '/happiness.png'
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
          <li className="active" style={{ marginBottom: '10px', backgroundColor: 'rgba(255, 255, 255, 0.1)' }}>
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
          <li style={{ marginBottom: '10px' }}>
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

      {/* Main Content */}
      <div className="main-content" style={{ flex: 1, padding: '30px', backgroundColor: 'rgb(255, 255, 255)', boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)', borderRadius: '20px' }}>
        {/* Back Button */}
        <div className="back-button" style={{ marginBottom: '20px' }}>
          <a href="/student-profiles" style={{ color: '#666', textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
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

        {/* Sessions Section */}
        <div className="sessions-section" style={{ marginTop: '30px' }}>
          <h2 style={{ margin: '0 0 20px 0', fontSize: '24px', color: '#333' }}>Session</h2>
          <div className="session-list" style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            {sessions.map((session) => (
              <div key={session.id} className="session-card" style={{ display: 'flex', alignItems: 'center', backgroundColor: '#f8f9fa', padding: '20px', borderRadius: '10px', gap: '20px' }}>
                <div className="session-date" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minWidth: '60px' }}>
                  <span className="month" style={{ fontSize: '12px', fontWeight: 'bold', color: '#666', textTransform: 'uppercase' }}>{session.month}</span>
                  <span className="day" style={{ fontSize: '24px', fontWeight: 'bold', color: '#333' }}>{session.day}</span>
                </div>
                <div className="session-details" style={{ flex: 1 }}>
                  <h3 style={{ margin: '0 0 5px 0', fontSize: '18px', color: '#333' }}>{session.title}</h3>
                  <p style={{ margin: '5px 0', color: '#666' }}>{session.campus}</p>
                  <p className={`session-status ${session.status}`} style={{ 
                    margin: '5px 0 0 0', 
                    padding: '4px 8px', 
                    borderRadius: '4px', 
                    fontSize: '12px', 
                    fontWeight: 'bold',
                    display: 'inline-block',
                    backgroundColor: session.status === 'resolved' ? '#d4edda' : '#f8d7da',
                    color: session.status === 'resolved' ? '#155724' : '#721c24'
                  }}>
                    {session.status === 'resolved' ? 'Resolved' : 'Cancelled'}
                  </p>
                </div>
                <div className="session-link">
                  <a href="/session-detail" style={{ color: '#666', textDecoration: 'none' }}>
                    <i className="fas fa-external-link-alt"></i>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDetail;

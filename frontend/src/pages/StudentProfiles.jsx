import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const StudentProfiles = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [genderFilter, setGenderFilter] = useState('');
  const [collegeFilter, setCollegeFilter] = useState('');
  const navigate = useNavigate();

  // Mock data - replace with actual data from API
  const students = [
    {
      id: 1,
      name: 'John Doe',
      program: 'Computer Science',
      studentNumber: '2024-001234',
      gender: 'Male',
      college: 'CCS',
      profileImage: '/user-stud.png'
    },
    {
      id: 2,
      name: 'Jane Smith',
      program: 'Psychology',
      studentNumber: '2024-001235',
      gender: 'Female',
      college: 'CASS',
      profileImage: '/user-stud.png'
    },
    {
      id: 3,
      name: 'Mike Johnson',
      program: 'Business Administration',
      studentNumber: '2024-001236',
      gender: 'Male',
      college: 'CBA',
      profileImage: '/user-stud.png'
    }
  ];

  const colleges = ['CAFA', 'CASS', 'CBA', 'CCJE', 'CCS', 'CIT', 'COE', 'COS', 'COED'];

  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.studentNumber.includes(searchTerm);
    const matchesGender = !genderFilter || student.gender === genderFilter;
    const matchesCollege = !collegeFilter || student.college === collegeFilter;
    
    return matchesSearch && matchesGender && matchesCollege;
  });

  return (
    <div className="container" style={{ display: 'flex', width: '100%', height: '100vh' }}>
      {/* Sidebar */}
      <div className="sidebar" style={{ width: '220px', backgroundColor: '#6a040f', color: 'white', padding: '20px 0', height: '100%' }}>
        <div className="logo" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '0 20px', marginBottom: '30px' }}>
          <img src="/logo.png" alt="TSU Logo" style={{ width: '80px', height: 'auto', display: 'block', margin: '0 auto' }} />
        </div>
        <ul className="nav-links" style={{ listStyle: 'none', padding: 0, margin: 0 }}>
          <li style={{ marginBottom: '10px' }}>
            <Link to="/" style={{ color: 'white', textDecoration: 'none', display: 'flex', alignItems: 'center', padding: '10px 20px' }}>
              <i className="fas fa-th-large" style={{ marginRight: '10px' }}></i>Dashboard
            </Link>
          </li>
          <li className="active" style={{ marginBottom: '10px', backgroundColor: 'rgba(255, 255, 255, 0.1)' }}>
            <Link to="/student-profiles" style={{ color: 'white', textDecoration: 'none', display: 'flex', alignItems: 'center', padding: '10px 20px' }}>
              <i className="fas fa-user-graduate" style={{ marginRight: '10px' }}></i>Student Profiles
            </Link>
          </li>
          <li style={{ marginBottom: '10px' }}>
            <Link to="/messages" style={{ color: 'white', textDecoration: 'none', display: 'flex', alignItems: 'center', padding: '10px 20px' }}>
              <i className="fas fa-envelope" style={{ marginRight: '10px' }}></i>Messages
            </Link>
          </li>
          <li style={{ marginBottom: '10px' }}>
            <Link to="/calendar" style={{ color: 'white', textDecoration: 'none', display: 'flex', alignItems: 'center', padding: '10px 20px' }}>
              <i className="fas fa-calendar" style={{ marginRight: '10px' }}></i>Calendar
            </Link>
          </li>
          <li style={{ marginBottom: '10px' }}>
            <Link to="/notifications" style={{ color: 'white', textDecoration: 'none', display: 'flex', alignItems: 'center', padding: '10px 20px' }}>
              <i className="fas fa-bell" style={{ marginRight: '10px' }}></i>Notifications
            </Link>
          </li>
          <li style={{ marginBottom: '10px' }}>
            <Link to="/session-history" style={{ color: 'white', textDecoration: 'none', display: 'flex', alignItems: 'center', padding: '10px 20px' }}>
              <i className="fas fa-history" style={{ marginRight: '10px' }}></i>Session History
            </Link>
          </li>
          <li className="sign-out" style={{ marginTop: 'auto', paddingTop: '20px' }}>
            <Link to="/login" style={{ color: 'white', textDecoration: 'none', display: 'flex', alignItems: 'center', padding: '10px 20px' }}>
              <i className="fas fa-sign-out-alt" style={{ marginRight: '10px' }}></i>Sign out
            </Link>
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="main-content" style={{ flex: 1, padding: '30px', backgroundColor: 'rgb(255, 255, 255)', boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)', borderRadius: '20px' }}>
        {/* Search Section */}
        <div className="search-section" style={{ marginBottom: '30px' }}>
        <div className="back-button" style={{ marginBottom: '20px' }}>
          <Link to="/" style={{ color: '#666', textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
            <i className="fas fa-arrow-left" style={{ marginRight: '5px' }}></i>
          </Link>
        </div>
          <div className="search-container" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div className="search-box" style={{ position: 'relative', maxWidth: '400px' }}>
              <i className="fas fa-search" style={{ position: 'absolute', left: '15px', top: '50%', transform: 'translateY(-50%)', color: '#666' }}></i>
              <input 
                type="text" 
                placeholder="Search student..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ 
                  width: '100%', 
                  padding: '12px 15px 12px 45px', 
                  border: '2px solid #e0e0e0', 
                  borderRadius: '25px', 
                  fontSize: '16px', 
                  outline: 'none',
                  boxSizing: 'border-box'
                }}
              />
            </div>
            <div className="filters" style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
              <select 
                value={genderFilter}
                onChange={(e) => setGenderFilter(e.target.value)}
                style={{ 
                  padding: '10px 15px', 
                  border: '2px solid #e0e0e0', 
                  borderRadius: '25px', 
                  fontSize: '14px', 
                  outline: 'none',
                  backgroundColor: 'white'
                }}
              >
                <option value="">Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
              <select 
                value={collegeFilter}
                onChange={(e) => setCollegeFilter(e.target.value)}
                style={{ 
                  padding: '10px 15px', 
                  border: '2px solid #e0e0e0', 
                  borderRadius: '25px', 
                  fontSize: '14px', 
                  outline: 'none',
                  backgroundColor: 'white'
                }}
              >
                <option value="">College</option>
                {colleges.map(college => (
                  <option key={college} value={college}>{college}</option>
                ))}
              </select>
              <button 
                className="search-btn" 
                style={{ 
                  backgroundColor: '#6a040f', 
                  color: 'white', 
                  border: 'none', 
                  padding: '10px 20px', 
                  borderRadius: '25px', 
                  fontSize: '14px', 
                  cursor: 'pointer'
                }}
              >
                Search
              </button>
            </div>
          </div>
        </div>

        {/* Students Grid */}
        <div className="students-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
          {filteredStudents.map((student) => (
            <div key={student.id} className="student-card" style={{ 
              backgroundColor: '#f8f9fa', 
              padding: '20px', 
              borderRadius: '10px', 
              boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
              cursor: 'pointer',
              transition: 'transform 0.2s ease'
            }}
            onMouseEnter={(e) => e.target.style.transform = 'translateY(-2px)'}
            onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
            onClick={() => navigate('/student-detail')}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '15px' }}>
                <img 
                  src={student.profileImage} 
                  alt="Student Profile" 
                  style={{ width: '60px', height: '60px', borderRadius: '50%', objectFit: 'cover' }}
                />
                <div>
                  <h3 style={{ margin: '0 0 5px 0', fontSize: '18px', color: '#333' }}>{student.name}</h3>
                  <p style={{ margin: '0', fontSize: '14px', color: '#666' }}>{student.program}</p>
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                <p style={{ margin: '0', fontSize: '14px', color: '#666' }}>Student No: {student.studentNumber}</p>
                <p style={{ margin: '0', fontSize: '14px', color: '#666' }}>Gender: {student.gender}</p>
                <p style={{ margin: '0', fontSize: '14px', color: '#666' }}>College: {student.college}</p>
              </div>
            </div>
          ))}
        </div>

        {filteredStudents.length === 0 && (
          <div style={{ textAlign: 'center', padding: '40px', color: '#666' }}>
            <i className="fas fa-user-graduate" style={{ fontSize: '48px', marginBottom: '20px', color: '#ccc' }}></i>
            <p>No students found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentProfiles;

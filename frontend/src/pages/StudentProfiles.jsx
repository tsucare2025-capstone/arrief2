import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Grid3X3, Trophy, Mail, Calendar, Bell, History, LogOut } from 'lucide-react';
import { useAuthStore } from '../store/useAuthStore';
import axiosInstance from '../lib/axios';

const StudentProfiles = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [genderFilter, setGenderFilter] = useState('');
  const [collegeFilter, setCollegeFilter] = useState('');
  const [students, setStudents] = useState([]);
  const [colleges, setColleges] = useState([]);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalStudents: 0,
    hasNextPage: false,
    hasPrevPage: false
  });
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();
  const {authUser, logout} = useAuthStore();

  // Fetch students data
  const fetchStudents = async (page = 1, search = '', gender = '', college = '') => {
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: '10'
      });
      
      if (search) params.append('search', search);
      if (gender) params.append('gender', gender);
      if (college) params.append('college', college);

      const response = await axiosInstance.get(`/students?${params}`);
      setStudents(response.data.students);
      setPagination(response.data.pagination);
    } catch (error) {
      console.error('Error fetching students:', error);
    }
  };

  // Fetch colleges for filter dropdown
  const fetchColleges = async () => {
    try {
      const response = await axiosInstance.get('/students/colleges');
      setColleges(response.data);
    } catch (error) {
      console.error('Error fetching colleges:', error);
    }
  };

  // Initial load
  useEffect(() => {
    fetchStudents();
    fetchColleges();
  }, []);

  // Handle search and filter changes
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setCurrentPage(1);
      fetchStudents(1, searchTerm, genderFilter, collegeFilter);
    }, 300); // Debounce search

    return () => clearTimeout(timeoutId);
  }, [searchTerm, genderFilter, collegeFilter]);

  // Handle page changes
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    fetchStudents(newPage, searchTerm, genderFilter, collegeFilter);
  };

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Handle gender filter change
  const handleGenderChange = (e) => {
    setGenderFilter(e.target.value);
  };

  // Handle college filter change
  const handleCollegeChange = (e) => {
    setCollegeFilter(e.target.value);
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
                onChange={handleSearchChange}
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
                onChange={handleGenderChange}
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
                onChange={handleCollegeChange}
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
          {students.map((student) => (
            <div key={student.studentID} className="student-card" style={{ 
              backgroundColor: '#f8f9fa', 
              padding: '20px', 
              borderRadius: '10px', 
              boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
              cursor: 'pointer',
              transition: 'transform 0.2s ease'
            }}
            onMouseEnter={(e) => e.target.style.transform = 'translateY(-2px)'}
            onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
            onClick={() => navigate(`/student-detail/${student.studentID}`)}
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
                <p style={{ margin: '0', fontSize: '14px', color: '#666' }}>Student No: {student.studentNo}</p>
                <p style={{ margin: '0', fontSize: '14px', color: '#666' }}>Gender: {student.gender}</p>
                <p style={{ margin: '0', fontSize: '14px', color: '#666' }}>College: {student.college}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        {pagination.totalPages > 1 && (
          <div className="pagination" style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center', 
            gap: '10px', 
            marginTop: '30px',
            padding: '20px 0'
          }}>
            <button 
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={!pagination.hasPrevPage}
              style={{
                padding: '8px 16px',
                border: '1px solid #ddd',
                borderRadius: '5px',
                backgroundColor: pagination.hasPrevPage ? 'white' : '#f5f5f5',
                color: pagination.hasPrevPage ? '#333' : '#999',
                cursor: pagination.hasPrevPage ? 'pointer' : 'not-allowed'
              }}
            >
              Previous
            </button>
            
            <span style={{ 
              padding: '8px 16px',
              backgroundColor: '#6a040f',
              color: 'white',
              borderRadius: '5px'
            }}>
              {pagination.currentPage} of {pagination.totalPages}
            </span>
            
            <button 
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={!pagination.hasNextPage}
              style={{
                padding: '8px 16px',
                border: '1px solid #ddd',
                borderRadius: '5px',
                backgroundColor: pagination.hasNextPage ? 'white' : '#f5f5f5',
                color: pagination.hasNextPage ? '#333' : '#999',
                cursor: pagination.hasNextPage ? 'pointer' : 'not-allowed'
              }}
            >
              Next
            </button>
          </div>
        )}

        {students.length === 0 && (
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

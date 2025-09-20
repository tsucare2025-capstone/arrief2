import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Grid3X3, Trophy, Mail, Calendar, Bell, History, LogOut } from 'lucide-react';
import { useAuthStore } from '../store/useAuthStore';
import Messages from './Messages'
import Notifications from './Notifications'
import SessionHistory from './SessionHistory'
import StudentProfiles from './StudentProfiles'
import StudentDetail from './StudentDetail'
import SessionDetail from './SessionDetail'

const CalendarPage = () => {
  const [currentMonth, setCurrentMonth] = useState('March 2025');
  const [viewMode, setViewMode] = useState('month');
  const {authUser, logout} = useAuthStore();

  // Mock calendar data
  const calendarData = {
    month: 'March 2025',
    days: [
      // Week 1
      { day: 23, isPrevMonth: true },
      { day: 24, isPrevMonth: true },
      { day: 25, isPrevMonth: true },
      { day: 26, isPrevMonth: true },
      { day: 27, isPrevMonth: true },
      { day: 28, isPrevMonth: true },
      { day: 1, isCurrentMonth: true },
      // Week 2
      { day: 2, isCurrentMonth: true },
      { day: 3, isCurrentMonth: true },
      { day: 4, isCurrentMonth: true },
      { day: 5, isCurrentMonth: true },
      { day: 6, isCurrentMonth: true },
      { day: 7, isCurrentMonth: true },
      { day: 8, isCurrentMonth: true },
      // Week 3
      { day: 9, isCurrentMonth: true },
      { day: 10, isCurrentMonth: true },
      { day: 11, isCurrentMonth: true },
      { day: 12, isCurrentMonth: true },
      { day: 13, isCurrentMonth: true },
      { day: 14, isCurrentMonth: true },
      { day: 15, isCurrentMonth: true },
      // Week 4
      { day: 16, isCurrentMonth: true },
      { day: 17, isCurrentMonth: true },
      { day: 18, isCurrentMonth: true },
      { day: 19, isCurrentMonth: true },
      { day: 20, isCurrentMonth: true },
      { day: 21, isCurrentMonth: true },
      { day: 22, isCurrentMonth: true },
      // Week 5
      { day: 23, isCurrentMonth: true },
      { day: 24, isCurrentMonth: true },
      { day: 25, isCurrentMonth: true },
      { day: 26, isCurrentMonth: true },
      { day: 27, isCurrentMonth: true },
      { day: 28, isCurrentMonth: true },
      { day: 29, isCurrentMonth: true, hasEvent: true, event: { time: '3:30 pm', title: 'Student 1' } },
      // Week 6
      { day: 30, isCurrentMonth: true },
      { day: 31, isCurrentMonth: true },
      { day: 1, isNextMonth: true },
      { day: 2, isNextMonth: true },
      { day: 3, isNextMonth: true },
      { day: 4, isNextMonth: true },
      { day: 5, isNextMonth: true }
    ]
  };

  const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  const handlePreviousMonth = () => {
    // Logic to go to previous month
  };

  const handleNextMonth = () => {
    // Logic to go to next month
  };

  const handleCreateEvent = () => {
    // Logic to create new event
  };

  const handleToday = () => {
    // Logic to go to today's date
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

      {/* Calendar Container */}
      <div className="calendar-container" style={{ flex: 1, backgroundColor: '#fff', margin: '20px', borderRadius: '20px', boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)', display: 'flex', flexDirection: 'column' }}>
        {/* Calendar Header */}
        <div className="calendar-header" style={{ padding: '15px 20px', borderBottom: '1px solid #eee', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div className="calendar-nav" style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
            <button 
              className="create-btn" 
              onClick={handleCreateEvent}
              style={{ 
                backgroundColor: '#6a040f', 
                color: 'white', 
                border: 'none', 
                padding: '10px 20px', 
                borderRadius: '5px', 
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              <i className="fas fa-plus"></i>
              Create
            </button>
            <button 
              className="today-btn" 
              onClick={handleToday}
              style={{ 
                backgroundColor: '#f8f9fa', 
                color: '#333', 
                border: '1px solid #ddd', 
                padding: '10px 20px', 
                borderRadius: '5px', 
                cursor: 'pointer'
              }}
            >
              Today
            </button>
            <div className="month-nav" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <button 
                className="nav-btn" 
                onClick={handlePreviousMonth}
                style={{ 
                  backgroundColor: '#6a040f', 
                  color: 'white', 
                  border: 'none', 
                  padding: '8px 12px', 
                  borderRadius: '5px', 
                  cursor: 'pointer'
                }}
              >
                <i className="fas fa-chevron-left"></i>
              </button>
              <button 
                className="nav-btn" 
                onClick={handleNextMonth}
                style={{ 
                  backgroundColor: '#6a040f', 
                  color: 'white', 
                  border: 'none', 
                  padding: '8px 12px', 
                  borderRadius: '5px', 
                  cursor: 'pointer'
                }}
              >
                <i className="fas fa-chevron-right"></i>
              </button>
              <h2 style={{ margin: 0, fontSize: '20px', color: '#333' }}>{currentMonth}</h2>
            </div>
          </div>
          <div className="view-options">
            <select 
              className="view-select" 
              value={viewMode}
              onChange={(e) => setViewMode(e.target.value)}
              style={{ 
                padding: '8px 12px', 
                border: '1px solid #ddd', 
                borderRadius: '5px', 
                fontSize: '14px',
                backgroundColor: 'white'
              }}
            >
              <option value="month">Month</option>
              <option value="week">Week</option>
              <option value="day">Day</option>
            </select>
          </div>
        </div>

        {/* Calendar Grid */}
        <div className="calendar-grid" style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '0 10px', minHeight: 0 }}>
          {/* Days Header */}
          <div className="days-header" style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '1px', marginBottom: '1px' }}>
            {dayNames.map((day) => (
              <div key={day} className="day-name" style={{ 
                padding: '10px', 
                textAlign: 'center', 
                fontWeight: 'bold', 
                color: '#666', 
                backgroundColor: '#f8f9fa',
                fontSize: '14px'
              }}>
                {day}
              </div>
            ))}
          </div>

          {/* Calendar Body */}
          <div className="calendar-body" style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(7, 1fr)', 
            gridTemplateRows: 'repeat(6, 1fr)', 
            flex: 1, 
            gap: '1px'
          }}>
            {calendarData.days.map((day, index) => (
              <div 
                key={index} 
                className={`calendar-cell ${day.isPrevMonth ? 'prev-month' : ''} ${day.isNextMonth ? 'next-month' : ''} ${day.hasEvent ? 'has-event' : ''}`}
                style={{ 
                  backgroundColor: day.isPrevMonth || day.isNextMonth ? '#f8f9fa' : 'white',
                  padding: '6px',
                  fontSize: '14px',
                  color: day.isPrevMonth || day.isNextMonth ? '#ccc' : '#333',
                  position: 'relative',
                  cursor: 'pointer',
                  border: '1px solid #eee',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-start'
                }}
                onMouseEnter={(e) => {
                  if (!day.isPrevMonth && !day.isNextMonth) {
                    e.target.style.backgroundColor = '#f8f8f8';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!day.isPrevMonth && !day.isNextMonth) {
                    e.target.style.backgroundColor = 'white';
                  }
                }}
              >
                <span style={{ fontSize: '16px', fontWeight: 'bold' }}>{day.day}</span>
                {day.hasEvent && (
                  <div className="event" style={{ 
                    fontSize: '10px', 
                    color: '#6a040f', 
                    marginTop: '2px',
                    backgroundColor: '#ffb444',
                    padding: '2px 4px',
                    borderRadius: '3px',
                    width: '100%'
                  }}>
                    <div style={{ fontWeight: 'bold' }}>{day.event.time}</div>
                    <div style={{ fontSize: '9px' }}>{day.event.title}</div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalendarPage;

import React, { useState } from 'react';

const Calendar = () => {
  const [currentMonth, setCurrentMonth] = useState('March 2025');
  const [viewMode, setViewMode] = useState('month');

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
          <li className="active" style={{ marginBottom: '10px', backgroundColor: 'rgba(255, 255, 255, 0.1)' }}>
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

export default Calendar;

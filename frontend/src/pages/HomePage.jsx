import React from 'react'
import { Link } from 'react-router-dom'
import { Grid3X3, Trophy, Mail, Calendar, Bell, History, LogOut } from 'lucide-react'
import { useAuthStore } from '../store/useAuthStore'
import Messages from './Messages'
import Calendar from './Calendar'
import Notifications from './Notifications'
import SessionHistory from './SessionHistory'
import StudentProfiles from './StudentProfiles'
import StudentDetail from './StudentDetail'
import SessionDetail from './SessionDetail'

const HomePage = () => {
  const {authUser, logout} = useAuthStore();

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
            <Link to="/StudentProfiles">
              <Trophy size={20} />
              Student Profiles
            </Link>
          </li>
          <li>
            <Link to="/Messages">
              <Mail size={20} />
              Messages
            </Link>
          </li>
          <li>
            <Link to="/Calendar">
              <Calendar size={20} />
              Calendar
            </Link>
          </li>
          <li>
            <Link to="/Notifications">
              <Bell size={20} />
              Notifications
            </Link>
          </li>
          <li>
            <Link to="/SessionHistory">
              <History size={20} />
              Session History
            </Link>
          </li>
          <li className="sign-out">
          {authUser && (
          <>
            <Link 
              to="/LoginPage" 
              className="text-white hover:text-red-200 transition-colors duration-200" 
              onClick={logout}
            >
              <LogOut className="w-6 h-6" />
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
            <h2>Counselor!</h2>
          </div>
        </div>

        <div className="monthly-sessions">
          <h2>Monthly Session</h2>
          <div className="sessions-list">
            <div className="session-item">
              <div className="session-time">
                <span className="date">MAY 03</span>
                <span className="time">08:00 AM</span>
              </div>
              <div className="session-info">
                <img src="/user-stud.png" alt="Student 1" />
                <div className="student-details">
                  <h3>Student 1</h3>
                  <p>Assigned Counselor</p>
                  <p>College</p>
                </div>
              </div>
            </div>

            <div className="session-item">
              <div className="session-time">
                <span className="date">MAY 08</span>
                <span className="time">10:00 AM</span>
              </div>
              <div className="session-info">
                <img src="/user-stud.png" alt="Student 2" />
                <div className="student-details">
                  <h3>Student 2</h3>
                  <p>Assigned Counselor</p>
                  <p>College</p>
                </div>
              </div>
            </div>

            <div className="session-item">
              <div className="session-time">
                <span className="date">MAY 20</span>
                <span className="time">01:00 PM</span>
              </div>
              <div className="session-info">
                <img src="/user-stud.png" alt="Student 3" />
                <div className="student-details">
                  <h3>Student 3</h3>
                  <p>Assigned Counselor</p>
                  <p>College</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Sidebar */}
      <div className="right-sidebar">
        <div className="counselor-profile">
          <img src="/counsel-prof.png" alt="Counselor Avatar" />
          <h3>Name of the Counselor</h3>
          <p>Counselor</p>
        </div>
        <div className="stats-card">
          <h2>46</h2>
          <p>Total Patients<br />this month</p>
        </div>
      </div>
    </div>
  );
}

export default HomePage
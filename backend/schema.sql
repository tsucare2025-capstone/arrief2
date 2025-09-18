-- TSU Care Database Schema
-- This file contains the database structure for the TSU Care application

-- Counselor table
CREATE TABLE IF NOT EXISTS counselor (
    counselorID INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    profession VARCHAR(255) DEFAULT 'Counselor',
    counselorImage VARCHAR(255) DEFAULT NULL,
    assignedCollege VARCHAR(255) DEFAULT NULL,
    is_verified BOOLEAN DEFAULT FALSE,
    otp VARCHAR(10) DEFAULT NULL,
    otp_expiry DATETIME DEFAULT NULL
);

-- Student table
CREATE TABLE IF NOT EXISTS student (
    studentID INT AUTO_INCREMENT PRIMARY KEY,
    counselorID INT NOT NULL,
    name VARCHAR(50) NOT NULL,
    studentNo INT(50) UNIQUE NOT NULL,
    gender VARCHAR(50) NOT NULL,
    email VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    college VARCHAR(50) NOT NULL,
    program VARCHAR(50) NOT NULL,
    is_verified BOOLEAN DEFAULT FALSE,
    otp VARCHAR(10) DEFAULT NULL,
    otp_expiry DATETIME DEFAULT NULL,
    FOREIGN KEY (counselorID) REFERENCES counselor(counselorID) ON DELETE CASCADE
);

-- Appointment table
CREATE TABLE IF NOT EXISTS appointment (
    appointmentID INT AUTO_INCREMENT PRIMARY KEY,
    studentID INT NOT NULL,
    counselorID INT NOT NULL,
    date DATE NOT NULL,
    time TIME NOT NULL,
    campus VARCHAR(50) NOT NULL,
    FOREIGN KEY (studentID) REFERENCES student(studentID) ON DELETE CASCADE,
    FOREIGN KEY (counselorID) REFERENCES counselor(counselorID) ON DELETE CASCADE
);

-- Session table
CREATE TABLE IF NOT EXISTS session (
    sessionID INT AUTO_INCREMENT PRIMARY KEY,
    appointmentID INT NOT NULL,
    sessionDate DATE NOT NULL,
    sessionTime TIME NOT NULL,
    sessionNotes VARCHAR(255) NOT NULL,
    feedbackID INT DEFAULT NULL,
    status VARCHAR(50) NOT NULL,
    FOREIGN KEY (appointmentID) REFERENCES appointment(appointmentID) ON DELETE CASCADE
);

-- Feedback table
CREATE TABLE IF NOT EXISTS feedback (
    feedbackID INT AUTO_INCREMENT PRIMARY KEY,
    sessionID INT NOT NULL,
    studentID INT NOT NULL,
    comments VARCHAR(255) NOT NULL,
    FOREIGN KEY (sessionID) REFERENCES session(sessionID) ON DELETE CASCADE,
    FOREIGN KEY (studentID) REFERENCES student(studentID) ON DELETE CASCADE
);

-- Add foreign key constraint for session.feedbackID after feedback table is created
ALTER TABLE session ADD FOREIGN KEY (feedbackID) REFERENCES feedback(feedbackID) ON DELETE SET NULL;

-- Messages table (updated to match ERD structure)
CREATE TABLE IF NOT EXISTS messages (
    messageID INT AUTO_INCREMENT PRIMARY KEY,
    counselorID INT NOT NULL,
    studentID INT NOT NULL,
    text VARCHAR(255) NOT NULL,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (counselorID) REFERENCES counselor(counselorID) ON DELETE CASCADE,
    FOREIGN KEY (studentID) REFERENCES student(studentID) ON DELETE CASCADE
);

-- Emergency notification table
CREATE TABLE IF NOT EXISTS emergency_notif (
    emergencyID INT AUTO_INCREMENT PRIMARY KEY,
    studentID INT NOT NULL,
    reason VARCHAR(255) NOT NULL,
    FOREIGN KEY (studentID) REFERENCES student(studentID) ON DELETE CASCADE
);

-- Mood log table
CREATE TABLE IF NOT EXISTS mood_log (
    moodLogID INT AUTO_INCREMENT PRIMARY KEY,
    studentID INT NOT NULL,
    logDate DATE NOT NULL,
    logTime TIME NOT NULL,
    moodStatus VARCHAR(100) NOT NULL,
    notes VARCHAR(255) NOT NULL,
    FOREIGN KEY (studentID) REFERENCES student(studentID) ON DELETE CASCADE
);

-- Indexes for better performance
CREATE INDEX idx_counselor_email ON counselor(email);
CREATE INDEX idx_student_email ON student(email);
CREATE INDEX idx_student_studentNo ON student(studentNo);
CREATE INDEX idx_student_counselor ON student(counselorID);
CREATE INDEX idx_appointment_student ON appointment(studentID);
CREATE INDEX idx_appointment_counselor ON appointment(counselorID);
CREATE INDEX idx_appointment_date ON appointment(date);
CREATE INDEX idx_session_appointment ON session(appointmentID);
CREATE INDEX idx_session_feedback ON session(feedbackID);
CREATE INDEX idx_feedback_session ON feedback(sessionID);
CREATE INDEX idx_feedback_student ON feedback(studentID);
CREATE INDEX idx_messages_counselor ON messages(counselorID);
CREATE INDEX idx_messages_student ON messages(studentID);
CREATE INDEX idx_messages_timestamp ON messages(timestamp);
CREATE INDEX idx_emergency_student ON emergency_notif(studentID);
CREATE INDEX idx_mood_student ON mood_log(studentID);
CREATE INDEX idx_mood_date ON mood_log(logDate);

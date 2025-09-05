-- TSU Care Database Schema
-- Create database if it doesn't exist
CREATE DATABASE IF NOT EXISTS railway;

-- Use the railway database
USE railway;

-- Create counselor table
CREATE TABLE IF NOT EXISTS counselor (
    counselorID INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Create student table
CREATE TABLE IF NOT EXISTS student (
    studentID INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Create messages table
CREATE TABLE IF NOT EXISTS messages (
    messageID INT AUTO_INCREMENT PRIMARY KEY,
    senderID INT NOT NULL,
    receiverID INT NOT NULL,
    message TEXT NOT NULL,
    isRead BOOLEAN DEFAULT FALSE,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (senderID) REFERENCES counselor(counselorID) ON DELETE CASCADE,
    FOREIGN KEY (receiverID) REFERENCES student(studentID) ON DELETE CASCADE
);

-- Create index for better performance
CREATE INDEX idx_messages_sender ON messages(senderID);
CREATE INDEX idx_messages_receiver ON messages(receiverID);
CREATE INDEX idx_messages_created ON messages(createdAt);

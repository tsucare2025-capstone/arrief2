import dotenv from 'dotenv';
import mysql from 'mysql2';

// Load environment variables
dotenv.config();

// Railway MySQL connection string
const urlDB = process.env.DATABASE_URL || "mysql://root:qLdgYsjVHfwfckIOkWUgUaTOJPRibKCz@crossover.proxy.rlwy.net:52018/railway";

console.log('Testing connection to:', urlDB);

// Create connection using URL
const connection = mysql.createConnection(urlDB);

console.log('Attempting to connect...');

connection.connect((err) => {
    if (err) {
        console.error('Connection error:', err);
        console.error('Error code:', err.code);
        console.error('Error message:', err.message);
        return;
    }
    
    console.log('Successfully connected to MySQL!');
    connection.end();
});


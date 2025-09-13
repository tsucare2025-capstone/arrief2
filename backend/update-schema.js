import mysql from 'mysql2';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Railway MySQL connection string
const urlDB = process.env.DATABASE_URL || "mysql://root:qLdgYsjVHfwfckIOkWUgUaTOJPRibKCz@crossover.proxy.rlwy.net:52018/railway";

console.log('Updating database schema...');
console.log('Connection URL:', urlDB);

// Create connection
const connection = mysql.createConnection(urlDB);

// SQL commands to make columns nullable
const updateQueries = [
    "ALTER TABLE counselor MODIFY COLUMN counselorImage BLOB DEFAULT NULL",
    "ALTER TABLE counselor MODIFY COLUMN assignedCollege VARCHAR(50) DEFAULT NULL",
    "ALTER TABLE counselor MODIFY COLUMN otp VARCHAR(10) DEFAULT NULL",
    "ALTER TABLE counselor MODIFY COLUMN otp_expiry DATETIME DEFAULT NULL"
];

connection.connect((err) => {
    if (err) {
        console.error('Connection error:', err);
        return;
    }
    
    console.log('Connected to MySQL!');
    
    let completed = 0;
    const total = updateQueries.length;
    
    updateQueries.forEach((query, index) => {
        connection.query(query, (err, result) => {
            if (err) {
                console.error(`Error executing query ${index + 1}:`, err.message);
            } else {
                console.log(`✓ Query ${index + 1} executed successfully`);
            }
            
            completed++;
            if (completed === total) {
                console.log('\n🎉 Database schema updated successfully!');
                console.log('Updated columns:');
                console.log('- counselorImage: now nullable');
                console.log('- assignedCollege: now nullable');
                console.log('- otp: now nullable');
                console.log('- otp_expiry: now nullable');
                connection.end();
            }
        });
    });
});


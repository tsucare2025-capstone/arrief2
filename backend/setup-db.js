import mysql from 'mysql2';
import dotenv from 'dotenv';
import fs from 'fs';

// Load environment variables
dotenv.config();

// Railway MySQL connection string
const urlDB = process.env.DATABASE_URL || "mysql://root:qLdgYsjVHfwfckIOkWUgUaTOJPRibKCz@crossover.proxy.rlwy.net:52018/railway";

console.log('Setting up database...');
console.log('Connection URL:', urlDB);

// Create connection
const connection = mysql.createConnection(urlDB);

// Read and execute schema
const schema = fs.readFileSync('./schema.sql', 'utf8');

connection.connect((err) => {
    if (err) {
        console.error('Connection error:', err);
        return;
    }
    
    console.log('Connected to MySQL!');
    
    // Split schema into individual statements
    const statements = schema.split(';').filter(stmt => stmt.trim().length > 0);
    
    let completed = 0;
    const total = statements.length;
    
    statements.forEach((statement, index) => {
        connection.query(statement, (err, result) => {
            if (err) {
                console.error(`Error executing statement ${index + 1}:`, err.message);
            } else {
                console.log(`✓ Statement ${index + 1} executed successfully`);
            }
            
            completed++;
            if (completed === total) {
                console.log('\n🎉 Database setup completed!');
                console.log('Tables created:');
                console.log('- counselor');
                console.log('- student');
                console.log('- messages');
                connection.end();
            }
        });
    });
});

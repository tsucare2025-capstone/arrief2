import mysql from "mysql2";
import dotenv from "dotenv";

dotenv.config();

// Railway MySQL connection string
const urlDB = process.env.DATABASE_URL || "mysql://root:qLdgYsjVHfwfckIOkWUgUaTOJPRibKCz@crossover.proxy.rlwy.net:52018/railway";

export const db = mysql.createConnection(urlDB).promise();

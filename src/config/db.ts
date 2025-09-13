import sqlite3 from 'sqlite3';
import dotenv from 'dotenv';

dotenv.config();

export const connectDB = () => {
  const filename = process.env.SQLITE_URI;
  if (!filename) {
    throw new Error('SQLITE_URI is not set');
  }
  try {
    const db = new sqlite3.Database(filename);
    db.run(
      `CREATE TABLE IF NOT EXISTS tasks (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT,
        description TEXT,
        category TEXT,
        completed INTEGER
      )`,
    );
    return db;
  } catch (error) {
    console.error(error);
    throw new Error('Failed to connect to database');
  }
};

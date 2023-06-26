import dotenv from 'dotenv';

dotenv.config();

const CLIENT_URL = process.env.DEV_CLIENT_URL || 'http://localhost:3000';
const SERVER_URL = process.env.DEV_SERVER_URL || 'http://localhost:8080';
const DB_CONNECTION_STRING =
  process.env.DB_CONNECTION_STRING || 'mongodb://127.0.0.1:27017';
const PORT = process.env.PORT || 8080;
const CLIENT_ID = process.env.CLIENT_ID || '';
const CLIENT_SECRET = process.env.CLIENT_SECRET || '';
const SESSION_SECRET = 'poker-secret';

export {
  CLIENT_ID,
  CLIENT_SECRET,
  CLIENT_URL,
  DB_CONNECTION_STRING,
  PORT,
  SERVER_URL,
  SESSION_SECRET,
};

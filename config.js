import dotenv from 'dotenv';

dotenv.config();

export const CLIENT_URL = process.env.DEV_CLIENT_URL || 'http://localhost:3000';

export const HOSTED_CLIENT_URL =
  process.env.HOSTED_CLIENT_URL || 'https://cesplanningpoker.netlify.app';

export const SERVER_URL =
  process.env.DEV_SERVER_URL || 'be-ces-intern-2023.onrender.com';

export const DB_CONNECTION_STRING =
  process.env.DB_CONNECTION_STRING || 'mongodb://127.0.0.1:27017';

export const PORT = process.env.PORT || 8080;

export const CLIENT_ID = process.env.CLIENT_ID || '';

export const CLIENT_SECRET = process.env.CLIENT_SECRET || '';

export const SESSION_SECRET = 'poker-secret';

export const SESSION_NAME = 'session';

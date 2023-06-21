import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import http from 'http';
import route from './app/routes/index.js';
dotenv.config();

const app = express();

import { DBConnect } from './app/services/db.js';
import { CLIENT_URL, PORT } from './config.js';

app.use(
  cors({
    origin: CLIENT_URL,
    methods: 'GET,POST,PUT,DELETE',
    credentials: true,
  }),
);

app.use(express.json());

route(app);

const server = http.Server(app);

DBConnect().then(() => {
  server.listen(PORT);
  console.log(`Started on ${PORT}`);
});

import cors from 'cors';
import express from 'express';
import http from 'http';
import route from './app/routes/index';
import { DBConnect } from './app/services/db';
import { CLIENT_URL, PORT } from './config';

const app = express();

app.use(
  cors({
    origin: CLIENT_URL,
    methods: 'GET,POST,PUT,DELETE',
    credentials: true,
  })
);

app.use(express.json());

route(app);

const server = http.Server(app);

DBConnect().then(() => {
  server.listen(PORT);
  console.log(`Started on ${PORT}`);
});

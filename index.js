require('dotenv').config();
const express = require('express');
const cors = require('cors');
const route = require('./app/routes/index.js');
const { CLIENT_URL, PORT } = require('./configs/env.config.js');

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

const server = require('http').Server(app);

server.listen(PORT);
console.log(`Started on ${PORT}`);

require('dotenv').config();

module.exports = {
	CLIENT_URL: process.env.DEV_CLIENT_URL || 'http://localhost:3000',
	SERVER_URL: process.env.DEV_SERVER_URL || 'http://localhost:8080',
	DB_CONNECTION_STRING:
		process.env.DB_CONNECTION_STRING || 'mongodb://locahost:27017',
	PORT: process.env.PORT || 8080,
	CLIENT_ID: process.env.CLIENT_ID || '',
	CLIENT_SECRET: process.env.CLIENT_SECRET || '',
};

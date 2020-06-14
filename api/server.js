const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

// local imports
const jwtCheck = require('../auth/jwtCheck');
const resourcesRouter = require('../resources/resourcesRouter');
const usersRouter = require('../users/usersRouter');
const errorHandler = require('../middlewares/errorHandler');

const server = express();

// Global Middleware
server.use(cors());
server.use(helmet());
server.use(express.json());

// Routes
server.use('/api/resources', resourcesRouter);
server.use('/api/users', usersRouter);

// Sanity Check
server.use('/', (req, res) => {
  res.json({ message: 'API is up and running!' });
});

// Error handling middleware
server.use(errorHandler());

module.exports = server;

const express = require('express');
const logger = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
require('dotenv');

const server = express();

// third party middlewares
server.use(logger('dev'));
server.use(helmet());
server.use(express.json());
server.use(cors());

// routes
const userRoutes = require('./Users/userRoutes');
const interestRoutes = require('./Interests/interestsRoutes');
const authRoutes = require('./Auth/authRoutes');
const friendsRoutes = require('./Friends/friendsRoutes');

server.use('/user', userRoutes);
server.use('/interests', interestRoutes);
server.use('/auth', authRoutes);
server.use('/friends', friendsRoutes);




// Sanity check
server.get('/', async (req, res) => {

    return res.status(200).send('<h1>Welcome to the server</h1>');
});


module.exports = server;
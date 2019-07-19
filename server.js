const express = require('express');
const logger = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
require('dotenv');

const server = express();

server.use(logger('dev'));
server.use(helmet());
server.use(express.json());
server.use(cors());

const userRoutes = require('./Users/userRoutes');
const interestRoutes = require('./Interests/interestsRoutes');
const authRoutes = require('./Auth/authRoutes');
const friendsRoutes = require('./Friends/friendsRoutes');


server.get('/', async (req, res) => {

    return res.status(200).send('<h1>Welcome to the server</h1>');
});

server.use('/user', userRoutes);
server.use('/interests', interestRoutes);
server.use('/auth', authRoutes);
server.use('/friends', friendsRoutes);


module.exports = server;
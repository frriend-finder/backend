const express = require('express');
const logger = require('morgan');
const helmet = require('helmet');

const { Pool, Client } = require('pg');

const server = express();

server.use(logger('dev'));
server.use(helmet());
server.use(express.json());

const keys = require('./keys/keys');

const userRoutes = require('./Users/userRoutes');
const interestRoutes = require('./Interests/interestsRoute');


server.get('/', async (req, res) => {

    return res.status(200).send('<h1>Welcome to the server</h1>');
});

server.use('/user', userRoutes);
server.use('/interests', interestRoutes);


module.exports = server;
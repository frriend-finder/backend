const express = require('express');
const logger = require('morgan');
const helmet = require('helmet');

const server = express();

server.use(logger('dev'));
server.use(helmet());

server.get('/', (req, res) => {
    return res.status(200).send('<h1>Welcome to the server</h1>');
});

module.exports = server;
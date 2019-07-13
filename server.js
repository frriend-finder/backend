const express = require('express');
const logger = require('morgan');
const helmet = require('helmet');

const { Pool, Client } = require('pg');

const server = express();

server.use(logger('dev'));
server.use(helmet());

const keys = require('./keys/keys');

const pgConfig = {
    user: keys.pgUserName,
    host: keys.pgHost,
    database: keys.pgDBName,
    password: keys.pgUserPW,
    port: keys.pgDBPort
};

const pool = new Pool({ ...pgConfig });

server.get('/', async (req, res) => {
    // await pool.connect((err, client, release) => {
    //     if (err) {
    //         console.log(err);
    //     } else {
    //         return console.log("no error");
    //     }
    // });

    return res.status(200).send('<h1>Welcome to the server</h1>');
});

module.exports = server;
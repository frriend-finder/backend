const knex = require('knex');
const knexConfig = require('../knexfile');
let knexMode;

// keys.js - determine correct credentials
if (process.env.DB_ENV === "production") {
    // in prod
    knexMode = "production"
} else {
    // in dev
    knexMode = "development"
}

const db = knex(knexConfig[knexMode]);

module.exports = db;
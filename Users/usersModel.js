const knexConfig = require('../knexfile');
let knexMode;

// keys.js - determine correct credentials
if (process.env.NODE_ENV === "production") {
    // in prod
    knexMode = "production"
} else {
    // in dev
    knexMode = "development"
}

const db = knexConfig()[knexMode];

const getUsers = () => {
    return db('users');
}

module.exports = {
    getUsers,
    getUserByEmail,
    getUserByID,
    addUser,
    deleteUser,
    updateUser
}
const knex = require('knex');
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

const db = knex(knexConfig[knexMode]);

const getUsers = () => {
    return db('users');
}

const getUserByEmail = (email) => {
    return db('users').where({ email });
}

const getUserByID = (id) => {
    return db('users').where('id', Number(id)).first();
}

const addUser = async user => {
    try {
        const id = await db('users').insert(user);

        return id;
    } catch(err) {
        console.log(`*** addUser failed to insert data ***
            ${err}
        `);
        return -1;
    }
}

const deleteUserByID = async id => {
    console.log(id);
    try {
        const result = await db('users')
            .where({ id })
            .delete();
        console.log(result);
        return result;
    } catch(err) {
        console.log(`*** deleteUser failed to insert data ***
            ${err}
        `);

        return -1;
    }
}

const updateUser = async (id, user) => {
    try {
        const result = await db('users')
            .where({ id })
            .update({ ...user });

        return result;
    } catch(err) {
        console.log(`*** updateUser failed to insert data ***
            ${err}
        `);

        return -1;
    }
}


module.exports = {
    getUsers,
    getUserByEmail,
    getUserByID,
    addUser,
    deleteUserByID,
    updateUser
}
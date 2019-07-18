const db = require('../helpers/dbHelper');

const getUsers = () => {
    return db('users');
}

const getUserByEmail = async (email) => {
    const id = await db('users').pluck('id').where({ email });

    return id[0];
}

const getUserByID = async (id) => {
    const user = await db('users').where('id', Number(id)).first();
    let interests = await db('user_interests').pluck('interest_id').where( 'user_id', id );

    interests = await db('interests').pluck('name').whereIn('id', interests);

    return ({ ...user, interests });
}

const addUser = async (user, interests) => {
    try {
        const id = await db('users').insert(user).returning('id');

        //console.log("id", id);

        interests.forEach(async interest => {
            await db('user_interests').insert({ user_id: id[0], interest_id: interest});
        });

        return id[0];
    } catch(err) {
        console.log(`*** addUser failed to insert data ***
            ${err}
        `);
        return -1;
    }
}

const deleteUserByID = async id => {
    try {
        const result = await db('users')
            .where({ id })
            .delete();

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
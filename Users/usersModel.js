const db = require('../helpers/dbHelper');

/**
 * Helper method to get all users from the database
 * @returns an array of user objects
 */
const getUsers = () => {
    return db('users');
}

/**
 * Helper method to find a user in the database using their email address
 * @param email
 * @returns the users id
 */
const getUserByEmail = async (email) => {
    const id = await db('users').pluck('id').where({ email });

    return id[0];
}

/**
 * Helper method to get a user from the database using their user id
 * @param id
 * @returns the complete user object with the interests attached
 */
const getUserByID = async (id) => {
    const user = await db('users').where('id', Number(id)).first();
    let interests = await db('user_interests').pluck('interest_id').where( 'user_id', id );

    if (interests)
        interests = await db('interests').pluck('name').whereIn('id', interests);

    return ({ ...user, interests });
}

/**
 * Helper method to add a user to the database, along with adding their interest associations to the user_interests table
 * @param user
 * @param interests
 * @returns the id of the newly created user
 */
const addUser = async (user, interests) => {
    try {
        const id = await db('users').insert(user).returning('id');

        // add the interests associated to the user_interest table
        if (interests.length > 0)
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

/**
 * Helper method to delete a user from the database
 * @param id
 * @returns number of rows deleted
 */
const deleteUserByID = async id => {
    try {
        // remove all traces of user from the database
        await db('user_interests').where({ user_id: id }).delete();
        await db('user_friends').where({ user_id: id}).delete();
        await db('user_friends').where({ friend_id: id}).delete();
        await db('auth').where({ user_id: id }).delete();

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

/**
 * Helper method to update a user in the database
 * @param id
 * @param user
 * @returns number of rows changed
 */
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
const db = require('../helpers/dbHelper');

/**
 * Get all friends for the user with user id user_id
 * @param user_id
 * @returns an array of user ids for all friends
 */
const getFriends = async user_id => {
    const friends = await db('user_friends').pluck('friend_id').where({ user_id });

    return friends;
}

/**
 * Add a friend to a user
 * @param user_id
 * @param friend_id
 * @returns number of rows inserted
 */
const addFriend = async (user_id, friend_id) => {
    const result = await db('user_friends').insert({ user_id, friend_id});

    return result;
}

/**
 * Remove a friend from a user
 * @param user_id
 * @param friend_id
 * @returns number of rows deleted
 */
const removeFriend = async (user_id, friend_id) => {
    const result = await db('user_friends').where({ user_id, friend_id }).delete();

    return result;
}

module.exports = {
    getFriends,
    addFriend,
    removeFriend
}
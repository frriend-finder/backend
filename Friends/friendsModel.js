const db = require('../helpers/dbHelper');

const getFriends = async user_id => {
    const friends = await db('user_friends').pluck('friend_id').where({ user_id });

    return friends;
}

const addFriend = async (user_id, friend_id) => {
    const result = await db('user_friends').insert({ user_id, friend_id});

    return result;
}

const removeFriend = async (user_id, friend_id) => {
    const result = await db('user_friends').where({ user_id, friend_id }).delete();

    return result;
}

module.exports = {
    getFriends,
    addFriend,
    removeFriend
}
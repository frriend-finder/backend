const db = require('../helpers/dbHelper');

const getInterests = _ => {
    return db('interests');
}

const getInterest = id => {
    return db('interests').pluck('name').where({ id });
}

const addInterest = async interest => {
    try {
        const result = await db('interests').insert(interest);

        if (result > 0)
            return result;
        else
            return -1;
    } catch(err) {
        console.log(`*** addInterest failed to insert data ***
            ${err}
        `);
        return -1;
    }
}

const getInterestsOf = async (user_id) => {
    const interests = await db('user_interests').pluck('interest_id').where({ user_id });

    return interests;
}

const getUsersWithInterest = async interest_id => {
    const users = await db('user_interests').pluck('user_id').where({ interest_id });

    return users;
}

const addInterestToUser = async (user_id, interest_id) => {
    const result = await db('user_interests').insert({ user_id, interest_id });

    return result;
}

module.exports = {
    getInterests,
    getInterest,
    addInterest,
    getInterestsOf,
    getUsersWithInterest,
    addInterestToUser
}
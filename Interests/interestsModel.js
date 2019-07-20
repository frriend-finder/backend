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
    try {
        const interests = await db('user_interests').pluck('interest_id').where({user_id});

        return interests;
    } catch(err) {
        console.log(`*** getInterestOf failed to retreive user's interests ***
            ${err}
        `);
        return -1;
    }
}

const getUsersWithInterest = async interest_id => {
    try {
        const users = await db('user_interests').pluck('user_id').where({interest_id});

        return users;
    } catch(err) {
        console.log(`*** getUsersWithInterest failed to retreive users ***
            ${err}
        `);
        return -1;
    }
}

const addInterestToUser = async (user_id, interest_id) => {
    try {
        const result = await db('user_interests').insert({user_id, interest_id});

        return result;
    } catch(err) {
        console.log(`*** addInterestToUser failed to insert data ***
            ${err}
        `);
        return -1;
    }
}

const removeInterestFromUser = async (user_id, interest_id) => {
    try {
        const result = await db('user_interests').where({ user_id, interest_id }).delete();

        return result;
    } catch(err) {
        console.log(`*** removeInterestFromUser failed to remove data ***
            ${err}
        `);
        return -1;
    }
}

const removeInterest = async (id) => {
    try {
        await db('user_interests').where({ interest_id: id }).delete();
        const result = await db('interests').where({ id }).delete();

        return result;
    } catch(err) {
        console.log(`*** removeInterest failed to remove data ***
            ${err}
        `);
        return -1;
    }
}

module.exports = {
    getInterests,
    getInterest,
    addInterest,
    getInterestsOf,
    getUsersWithInterest,
    addInterestToUser,
    removeInterestFromUser,
    removeInterest
}
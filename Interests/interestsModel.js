const db = require('../helpers/dbHelper');

/**
 * Helper methods to get all interests from the database
 * @param _
 * @returns an array of objects with keys id and name for each interest
 */
const getInterests = () => {
    return db('interests');
}

/**
 * Helper method returns the human readable name of the interest with the specified ID
 * @param id
 * @returns resolves to a string with the interest name
 */
const getInterest = id => {
    return db('interests').pluck('name').where({ id });
}


/**
 * Helper method to add an interest to the database
 * @param interest
 * @returns number of rows inserted into the database
 */
const addInterest = async interest => {
    try {
        const {rowCount} = await db('interests').insert(interest);

        console.log(rowCount);

        if (rowCount > 0)
            return rowCount;
        else
            return -1;
    } catch(err) {
        console.log(`*** addInterest failed to insert data ***
            ${err}
        `);
        return -1;
    }
}

/**
 * Helper method to get all interests for the specified user
 * @param user_id
 * @returns an array of all interest ids
 */
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

/**
 * Helper method to get all users with the specified interest
 * @param interest_id
 * @returns array of user ids
 */
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

/**
 * Helper method to add an interest to the specified user
 * @param user_id
 * @param interest_id
 * @returns number of rows inserted
 */
const addInterestToUser = async (user_id, interest_id) => {
    try {
        const existingInterest = await db('user_interests').pluck(user_id).where({ user_id, interest_id });

        if (existingInterest.length == 0) {
            const {rowCount} = await db('user_interests').insert({user_id, interest_id});

            return rowCount;
        } else
            return -1;
    } catch(err) {
        console.log(`*** addInterestToUser failed to insert data ***
            ${err}
        `);
        return -1;
    }
}

/**
 * Helper method to remove an interest from the user
 * @param user_id
 * @param interest_id
 * @returns number of rows deleted
 */
const removeInterestFromUser = async (user_id, interest_id) => {
    try {
        const result = await db('user_interests').where({ user_id, interest_id }).delete();

        console.log(result);

        return result;
    } catch(err) {
        console.log(`*** removeInterestFromUser failed to remove data ***
            ${err}
        `);
        return -1;
    }
}

/**
 * Helper method to delete an interest from the database. __Not currently implemented__
 * @param id
 * @returns number of rows deleted
 */
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
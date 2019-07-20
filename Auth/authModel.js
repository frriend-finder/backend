const db = require('../helpers/dbHelper');

const expTime = 10 * 60000;

/**
 * helper method that inserts a auth code into the database
 * @param user_id
 * @param code
 * @returns number of rows inserted
 */
const insertCode = async (user_id, code) => {
    const existingCode = await db('auth').where({ user_id });

    // If the user had a code already, delete it and insert the new code
    if(Object.keys(existingCode).length > 0) {
        await db('auth').where({ user_id }).delete();
    }

    console.log('user_id in insertCode', user_id);

    const result = await db('auth').insert({ user_id, code });

    return result;
}

/**
 * Helper function that verifies a user has a valid code that is not expired
 * @param user_id
 * @returns {Promise<boolean>}
 */
const hasCode = async user_id => {
    console.log('checking for code...', user_id);

    try {
        // get the created_at timestamp from the datbase and the current time
        let timestamp = await db('auth').pluck('created_at').where({ user_id });
        const currentTime = new Date().getTime();

        console.log(timestamp);

        if(timestamp === undefined || timestamp.length === 0) return false;

        // convert timestamp to milliseconds and compare it to the current time to verify
        // it is not expired
        timestamp = new Date(timestamp).getTime();
        if(currentTime - timestamp >= expTime) return false;

        return true;
    } catch(err) {
        console.log("*** Error in hasCode ***", err);
        return true;
    }
}

/**
 * Helper function to retreive a user's auth code from the database
 * @param user_id
 * @returns the hashed code
 */
const getCode = async user_id => {
    const code = await db('auth').pluck('code').where({ user_id });

    return code[0];
}

module.exports = {
    insertCode,
    getCode,
    hasCode
}
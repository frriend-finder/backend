const db = require('../helpers/dbHelper');

const expTime = 10 * 60000;

const insertCode = async (user_id, code) => {
    const existingCode = await db('auth').where({ user_id });

    if(Object.keys(existingCode).length > 0) {
        await db('auth').where({ user_id }).delete();
    }

    console.log('user_id in insertCode', user_id);

    const result = await db('auth').insert({ user_id, code });

    return result;
}

const hasCode = async user_id => {
    console.log('checking for code...', user_id);

    try {
        let timestamp = await db('auth').pluck('created_at').where({ user_id });
        const currentTime = new Date().getTime();

        timestamp = new Date(timestamp).getTime();
        console.log("timestamp", timestamp, currentTime, currentTime - timestamp, expTime);

        if(timestamp === undefined) return false;
        if(currentTime - timestamp >= expTime) return false;

        console.log('hasCode is true');

        return true;
    } catch(err) {
        console.log("*** Error in hasCode ***", err);
        return true;
    }
}

const getCode = async user_id => {
    const code = await db('auth').pluck('code').where({ user_id });

    return code[0];
}

module.exports = {
    insertCode,
    getCode,
    hasCode
}
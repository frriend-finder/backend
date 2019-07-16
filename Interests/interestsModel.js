const db = require('../helpers/dbHelper');

const getInterests = _ => {
    return db('interests');
}

module.exports = {
    getInterests
}
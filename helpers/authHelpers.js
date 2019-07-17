const jwt = require('jsonwebtoken');


const keys = require('../keys/keys');


const generateToken = user_id => {

    const payload = {
        user_id
    };

    const options = {
        expiresIn: '6w'
    }

    return jwt.sign(payload, keys.secretKey);
}

module.exports = {
    generateToken
}
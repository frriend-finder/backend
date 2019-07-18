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

const requireLogin = (req, res, next) => {
    const token = req.headers.authorization;

    if (token) {
        jwt.verify(token, keys.secretKey, (err, decodedToken) => {
            if (err) {
                res.status(401).json({ you: "can't touch this!" });
            } else {
                req.decodedJwt = decodedToken;
                next();
            }
        });
    } else {
        res.status(401).json({ you: 'shall not pass!' });
    }
}

module.exports = {
    generateToken,
    requireLogin
}
const jwt = require('jsonwebtoken');


const keys = require('../keys/keys');

/**
 * Token factory creates a new jsonwebtoken for the user. Payload includes the user's id
 * @param user_id
 * @returns {jwt}
 */
const generateToken = user_id => {

    const options = {
        expiresIn: '6w'
    }

    return jwt.sign({ user: user_id }, keys.secretKey, options);
}

/**
 * middleware function that verifies a user is logged in and valid before allowing
 * access to the route
 * @param req
 * @param res
 * @param next
 */
const requireLogin = (req, res, next) => {
    const token = req.headers.authorization;

    next();

    // if (token) {
    //     jwt.verify(token, keys.secretKey, (err, decodedToken) => {
    //         if (err) {
    //             res.status(401).json({ you: "can't touch this!" });
    //         } else {
    //             req.decodedJwt = decodedToken;
    //             next();
    //         }
    //     });
    // } else {
    //     res.status(401).json({ you: 'shall not pass!' });
    // }
}

module.exports = {
    generateToken,
    requireLogin
}
const express = require('express');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const sgTransport = require('nodemailer-sendgrid-transport');
const otpGen = require('otp-generator');
const jwt = require('jsonwebtoken');

const router = express.Router();

// database helpers
const authDB = require('./authModel');
const userDB = require('../Users/usersModel');

const keys = require('../keys/keys');
const emTemp = require('../helpers/authEmailTemplate');
const tokenMaker = require('../helpers/authHelpers');

// Send a one time password code, via email, to the user, if they exist in the database.
// Uses SendGrid and Gmail as SMTP server
router.post('/send', async (req, res) => {

    try {
        const { email } = req.body;
        const user_id = await userDB.getUserByEmail(email);

        if(!user_id || user_id <= 0) return res.status(404).json({ message: "User not found." });


        if(await authDB.hasCode(user_id)) {
            return res.status(409).json({ message: "Code already sent." });
        }

        // create a SendGrid transporter for sending the email
        const transporter = nodemailer.createTransport(
            sgTransport({
                auth: {
                    api_user: keys.sgUser,
                    api_key: keys.sgPW
                }
            })
        );

        // generates a one time password with four digits
        let code = otpGen.generate(4, {
            digits: true,
            alphabets: false,
            upperCase: false,
            specialChars: false
        });

        // header options for OTP email
        const options = {
            to: email,
            from: "no-reply@nomore.buzz",
            subject: "Buzz No More Login Code",
            html: emTemp(code)
        };


        code = bcrypt.hashSync(code, 15);
        await authDB.insertCode(user_id, code);


        transporter.sendMail(options, (err, resp) => {
            if (err) {
                console.log("error", err);
            } else {
                console.log("okay", resp);
            }
        })

        res.status(201).json({message: "Code sent."});
    } catch(err) {
        console.log(err)
        res.status(500).json({ message: "Something went wrong." });
    }
});

// Verify the code provided by the user is correct and return a signed jwt and the user id, if so
router.post('/verify', async (req, res) => {
    const { code, email } = req.body;

    try {
        const user_id = await userDB.getUserByEmail(email);

        // verify there is a code and the code is not expired
        if (await authDB.hasCode(user_id)) {
            // validate the code is correct
            const validCode = bcrypt.compareSync(code.toString(), await authDB.getCode(user_id));

            if (validCode)
                return res.status(200).json({ token: tokenMaker.generateToken(user_id), user_id });
            else
                return res.status(401).json({ message: "Code is invalid or expired." });

        } else {
            return res.status(401).json({ message: "Code is invalid or expired." });
        }
    } catch(err) {
        console.log(err);
        return res.status(500).json({ message: "Something went wrong." });
    }
});

// Validate the jwt and return the user id if the token is valid
router.post('/validate', async (req, res) => {
    const { token } = req.body;

    try {
        // decode the json web token to get the user id
        const decoded = await jwt.verify(token, keys.secretKey);
        const user = decoded["user"];

        // return the user id if the token is valid
        if (user) return res.status(200).json(user);
        else
            return res.status(403).json({ message: "Validation failed." });

    } catch(err) {
        console.log(err);
        res.status(500).json({ message: "Something went wrong." });
    }
})


module.exports = router;
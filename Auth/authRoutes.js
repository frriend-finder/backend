const express = require('express');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const sgTransport = require('nodemailer-sendgrid-transport');
const otpGen = require('otp-generator');

const router = express.Router();

const authDB = require('./authModel');
const userDB = require('../Users/usersModel');
const keys = require('../keys/keys');
const emTemp = require('../helpers/authEmailTemplate');
const tokenMaker = require('../helpers/authHelpers').generateToken;

router.post('/send', async (req, res) => {

    const { email } = req.body;
    const user_id = await userDB.getUserByEmail(email);

    console.log("user_id", user_id);

    //console.log(req.body);
    if(user_id <= 0) return res.status(404).json({ message: "User not found." });

    //console.log(authDB.hasCode(user_id));

    if(await authDB.hasCode(user_id)) {
        return res.status(409).json({ message: "Code already sent." });
    }

    const transporter = nodemailer.createTransport(
        sgTransport({
            auth: {
                api_user: keys.sgUser,
                api_key: keys.sgPW
            }
        })
    );

    let code = otpGen.generate(4, {
        digits: true,
        alphabets: false,
        upperCase: false,
        specialChars: false
    });

    const options = {
        to: email,
        from: "no-reply@nomore.buzz",
        subject: "Buzz No More Login Code",
        html: emTemp(code)
    };

    try {
        code = bcrypt.hashSync(code, 15);
        await authDB.insertCode(user_id, code);
        transporter.sendMail(options, (err, resp) => {
            if (err) {
                console.log("error", err);
            } else {
                console.log("okay", resp);
            }
        })

        res.status(200).json({message: "Code sent."});
    } catch(err) {
        res.status(500).send("Nope: "+err);
    }
});

router.post('/verify', async (req, res) => {
    const { code, email } = req.body;
    const user_id = await userDB.getUserByEmail(email);

    try {

        if (authDB.hasCode(user_id)) {
            console.log(code, await authDB.getCode(user_id));
            const validCode = bcrypt.compareSync(code, await authDB.getCode(user_id));

            if (validCode) {
                return res.status(200).json({ token: tokenMaker(), user_id });
            } else {
                return res.status(404).json({ message: "Code is invalid or expired." });
            }
        } else {
            return res.status(404).json({ message: "Code is invalid or expired." });
        }
    } catch(err) {
        console.log(err);
        return res.status(500).json({ message: "Something went wrong." });
    }
});


module.exports = router;
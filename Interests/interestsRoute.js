const express = require('express');

const router = express.Router();
const interestDB = require('./interestsModel');

router.get('/', async (req, res) => {
    try {
        const interests = await interestDB.getInterests();

        if (interests.length > 0)
            return res.status(200).json(interests);
        else
            return res.status(404).json({ message: "No interests found." });
    } catch(err) {
        console.log(err);
        return res.status(500).json({ message: "Something went wrong." });
    }
})

module.exports = router;
const express = require('express');

const router = express.Router();
const interestDB = require('./interestsModel');

const { requireLogin } = require('../helpers/authHelpers');

router.get('/', requireLogin, async (req, res) => {
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
});

router.get('/:id', requireLogin, async (req, res) => {
    const { id } = req.params;

    try {
        const interest = await interestDB.getInterest(Number(id));

        if (interest.length > 0)
            return res.status(200).json(interest);
        else
            return res.status(404).json({ message: "No interests found." });
    } catch(err) {
        console.log(err);
        return res.status(500).json({ message: "Something went wrong." });
    }
});

router.post('/', requireLogin, async (req, res) => {
   const interest = req.body;

   try {
       const result = await interestDB.addInterest(interest);

       if (result > 0)
           return res.status(200).json({ message: "Interest inserted" });
       else
           return res.status(400).json({ message: "Could not insert interest."});
   } catch(err) {
       console.log(err)
       return res.status(500).json({ message: "Something went wrong." });
   }
});

router.get('/user/:user_id', requireLogin, async (req, res) => {
    const { user_id } = req.params;

    try
    {
        const interests = await interestDB.getInterestsOf(user_id);

        res.status(200).json(interests);
    } catch(err) {
        console.log(err);
        res.status(500).json({ message: "Something went wrong" });
    }
});

router.get('/:interest_id/users', requireLogin, async (req, res) => {
    const { interest_id } = req.params;

    try
    {
        const users = await interestDB.getUsersWithInterest(interest_id);

        res.status(200).json(users);
    } catch(err) {
        console.log(err);
        res.status(500).json({ message: "Something went wrong" });
    }
});

router.post('/user/', requireLogin, async (req, res) => {
    const { interest, user } = req.body;

    try
    {
        const result = await interestDB.addInterestToUser(user, interest);

        if (result)
            return res.status(200).json({ message: "Interest added." });
        else
            return res.status(400).json({ message: "Unable to add interest." });
    } catch(err) {
        console.log(err);
        return res.status(500).json({ message: "Something went wrong." });
    }
});

module.exports = router;
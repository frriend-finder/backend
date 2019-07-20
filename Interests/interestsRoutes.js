const express = require('express');

const router = express.Router();
const interestDB = require('./interestsModel');

const { requireLogin } = require('../helpers/authHelpers');

// Get a list of all interests. Returns an array of objects containing the name and id of each interest
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

// Get the human readable name of an interest with :id
router.get('/:id', requireLogin, async (req, res) => {
    const { id } = req.params;

    try {
        const interest = await interestDB.getInterest(Number(id));

        if (interest.length > 0)
            return res.status(200).json(interest);
        else
            return res.status(404).json({ message: "No interest found with this ID." });
    } catch(err) {
        console.log(err);
        return res.status(500).json({ message: "Something went wrong." });
    }
});

// Add a new interest to the database, interest name should be sent in the body. ID is auto generated.
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

// Get all interests for the user with :user_id. Returns an array of interest ids
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

// Get all users who have :interest_id. Returns an array of user ids.
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

// Add an interest to a user. User id and interest id should be sent in the body of the request
router.post('/user', requireLogin, async (req, res) => {
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

// Remove an interest from a yser. User id and interest id should be sent in the body of the request
router.delete('/user', requireLogin, async (req, res) => {
   const { user, interest } = req.body;

    try {
       const result = await interestDB.removeInterestFromUser(user, interest);

       if (result)
           return res.status(200).json({ message: "Interest removed from user." });
       else
           return res.status(400).json({ message: "Could not remove interest." });
    } catch(err) {
       console.log(err);
       return res.status(500).json({ message: "Something went wrong." });
    }
});

module.exports = router;
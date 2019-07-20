const express = require('express');

const friendsDB = require('./friendsModel');

const router = express.Router();

router.get('/', (req, res) => {
    res.status(200).send("<h1>Friend zone</h1>");
});

// get all friends for the user with :id
router.get('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const friends = await friendsDB.getFriends(id);

        if(friends.length > 0) return res.status(200).json(friends);

        else return res.status(404).json({ message: "User has no friends." });
    } catch(err) {
        console.log(err);
        res.status(500).json({ message: "Could not get friends." });
    }
});

// add a new friend to a user, user and friend ids sent in the body
router.post('/', async (req, res) => {
    const { user, friend } = req.body;

    try {
        const result = await friendsDB.addFriend(user, friend);

        if(result) return res.status(200).json({ message: "Friend added." });
        else return res.status(400).json({ message: "Could not add friend." });
    } catch(err) {
        console.log(err);
        res.status(500).json({ message: "Could not get friends." });
    }
});

// remove a friend from a user, user and friend ids sent in the body
router.delete('/', async(req, res) => {
    const { user, friend } = req.body;

    try {
        const result = await friendsDB.removeFriend(user, friend);

        if(result) {
            res.status(200).json({ message: "Friend removed." });
        } else {
            res.status(404).json({ message: "User is not friends with them." });
        }
    } catch(err) {
        console.log(err);
        res.status(500).json({ message: "Could not remove friend." });
    }
});


module.exports = router;
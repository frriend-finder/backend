const express = require('express');

const friendsDB = require('./friendsModel');
const { requireLogin } = require('../helpers/authHelpers');

const router = express.Router();

router.get('/', (req, res) => {
    res.status(200).send("<h1>Friend zone</h1>");
});

// get all friends for the user with :id
router.get('/:id', requireLogin, async (req, res) => {
    let { id } = req.params;

    id = Number(id);

    if (!id)
        return res.status(400).json({ message: "An id number must be sent as a parameter." });

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
router.post('/', requireLogin, async (req, res) => {
    let { user, friend } = req.body;

    user = Number(user);
    friend = Number(friend);

    if(!user || !friend)
        return res.status(400).json({ message: "A user id and a friend id must be sent in the body of the request." });


    try {
        const result = await friendsDB.addFriend(user, friend);

        if (result > 0) return res.status(200).json({ message: "Friend added." });
        if (result === -1) return res.status(400).json({ message: "Users are already friends." });
        else return res.status(400).json({ message: "Could not add friend." });
    } catch(err) {
        console.log(err);
        res.status(500).json({ message: "Could not get friends." });
    }
});

// remove a friend from a user, user and friend ids sent in the body
router.delete('/', requireLogin, async(req, res) => {
    let { user, friend } = req.body;

    user = Number(user);
    friend = Number(friend);

    if(!user || !friend)
        return res.status(400).json({ message: "A user id and a friend id must be sent in the body of the request." });

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
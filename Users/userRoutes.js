const express = require('express');

const router = express.Router();

const userDB = require('./usersModel');
const { requireLogin } = require('../helpers/authHelpers');

// Get all users in the database
router.get('/', requireLogin, async (req, res) => {
    try {
        const users = await userDB.getUsers();

        if(Array.isArray(users))
            return res.status(200).json( users );
        else
            return res.status(400).json({ message: "No users found." });

    } catch(err) {
        console.log(err);
        return res.status(500).json({ message: "Something went wrong." });
    }

});


// Get the user with :id
router.get('/:id', requireLogin, async (req, res) => {
    const { id } = req.params;

    try {
        const user = await userDB.getUserByID(id);

        if(user && (Object.keys(user).length > 0))
            return res.status(200).json( user );
        else
            return res.status(404).json({ message: "User not found" });
    } catch(err) {
        console.log(err);
        return res.status(500).json({ message: "Something went wrong." });
    }
});


// Add a user to the database. User sent as object on the body of the request
router.post('/', async (req, res) => {
    let baseUser = req.body;
    // get the interests off of the body of the request
    let { interests } = req.body;

    // Remove the interests from the baseUser object, as these are handled differently
    delete baseUser["interests"];

    try {
        const id = await userDB.addUser(baseUser, interests);


        if(id > 0) {
            const user = await userDB.getUserByID(id);

            return res.status(200).json(user);
        }
        else
            return res.status(404).json({ message: "Could not add user." });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Something went wrong" });
    }
});

// Remove a user from the database
router.delete('/:id', requireLogin, async (req, res) => {
    let { id } = req.params;
    let result;

    if (!id) {
        return res.status(400).json({ message: "An address must be provided"});
    }

    try {
        id = Number(id);
        result = userDB.deleteUserByID(id);
        if (result > 0)
            return res.status(200).json({ message: "User deleted." });
        else
            return res.status(400).json({ message: "User could not be deleted." });
    } catch(err) {
        console.log(err);

        return res.status(500).json({ message: "Something went wrong" });
    }
});

// Update user data in databse
router.put('/:id', requireLogin, async (req, res) => {
    let { id } = req.params;
    const user = req.body;

    id = Number(id);

    try {
        const result = await userDB.updateUser(id, user);

        if(result)
            return res.status(200).json({ result });
        else
            return res.status(400).json({ message: "Could not update user." });
    } catch(err) {
        console.log(err);
        return res.status(500).json({ message: "Something went wrong." });
    }
});


module.exports = router;
const express = require('express');

const router = express.Router();
const userDB = require('./usersModel');

router.get('/', async (req, res) => {
    try {
        const users = await userDB.getUsers();

        if(Array.isArray(users))
            return res.status(200).json({ users });
        else
            return res.status(400).json({ message: "No users found." });

    } catch(err) {
        console.log(err);
        return res.status(500).json({ message: "Something went wrong." });
    }

});

router.get('/:email', async (req, res) => {
    const { email } = req.params;

    try {
        const user = await userDB.getUserByEmail(email);

        if(user && (Object.keys(user).length > 0))
            return res.status(200).json({ user });
        else
            return res.status(404).json({ message: "User not found" });
    } catch(err) {
        console.log(err);
        return res.status(500).json({ message: "Something went wrong." });
    }
});

router.get('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const user = await userDB.getUserByID(id);

        if(user && (Object.keys(user).length > 0))
            return res.status(200).json({ user });
        else
            return res.status(404).json({ message: "User not found" });
    } catch(err) {
        console.log(err);
        return res.status(500).json({ message: "Something went wrong." });
    }
});

router.post('/', async (req, res) => {
    const input = req.body;

    console.log("add user", req.body);

    try {
        const id = await userDB.addUser(input);

        if(id > 0) {
            const user = await userDB.getUserByID(id);

            return res.status(200).json({user});
        }
        else
            return res.status(404).json({ message: "Could not add user." });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Something went wrong" });
    }
});

router.delete('/:id', async (req, res) => {
    let { id } = req.params;
    let result;

    console.log(req.params);

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

router.put('/:id', async (req, res) => {
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
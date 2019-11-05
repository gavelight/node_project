const express = require('express');
const User = require('../models/user');

// Getting router object
const router = express.Router();

// Getting all users
router.get('/', async (req, res) => {
    try {

        // Get all the users
        const users = await User.find();
        res.json(users);

    // If there was an error
    } catch (error) {

        // Status code 500 - Error due to server
        res.status(500).json({ message: error.message });
    }
});

// Creating one
router.post('/', async (req, res) => {

    // Our post request has two modes
    // "login": Returns the requested user's info
    // "register": Registers the user to the system

    // If we are in login mode
    if(req.body.operation === "login") {

        // Initialize search conditions according to the given params
        const conditions = { email: req.body.email, 
                             password: req.body.password};

        try {

            // Get user according to requested params
            const user = await User.findOne(conditions);
            res.json(user);

        // If there was an error
        } catch (error) {

            // Status code 500 - Error due to server
            res.status(500).json({ message: error.message });
        }
    }

    // If we are in register mode
    else if(req.body.operation === "register") {

        // Create a user object with the information from the request's body
        const user = new User({        
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: req.body.password
        });

        try {

            // Save the new user 
            const newUser = await user.save();

            // Status code 201 - Successfully created an object
            res.status(201).json(newUser);

        } catch (error) {

            // Status code 400 - Error due to user bad data
            res.status(400).json({ message: error.message });
        }
    }
});

// Getting one user by id
router.get('/:id', getUser, (req, res) => {
    res.json(res.user);
});

// Updating one
router.patch('/:id', getUser, async (req,res) => {

    console.log(res.user);

    // If first name parameter was sent
    if(req.body.firstName != null) {

        // Update the value in the user model object
        res.user.firstName = req.body.firstName;
    }

    // If last name parameter was sent
    if(req.body.lastName != null) {

        // Update the value in the user model object
        res.user.lastName = req.body.lastName;
    }

    // If email parameter was sent
    if(req.body.email != null) {

        // Update the value in the user model object
        res.user.email = req.body.email;
    }
    
    // If last name parameter was sent
    if(req.body.password != null) {

        // Update the value in the user model object
        res.user.password = req.body.password;
    }    

    try {

        // Save the updated user 
        const updatedUser = await res.user.save();
        res.json(updatedUser);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }

});

// Deleting one
router.delete('/:id', getUser, async (req,res) => {
    try {

        // Try to remove the user from the database
        await res.user.remove();   
        res.json({ message: 'Deleted user'});

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Middleware function to get user
async function getUser(req, res, next) {
    let subscriber;

    try {     

        // Find the user by id
        user = await User.findById(req.params.id)        

        // If couldn't find user
        if (user == null) {

            // Status code 404 - Resource could not be found
            return res.status(404).json({ message: 'Cannot find user' });

        }

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }

    res.user = user;
    next();
}

module.exports = router;
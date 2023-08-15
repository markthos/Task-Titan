const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();

const User = require('../../models/user');

// GET post route for signup with First Name, Last Name, Email, and Password
router.post('/signup', async (req, res) => {
    console.log('post route')
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        console.log('hashedPassword', hashedPassword)   
        
        // Collect user data from the request body
        const userData = {
            first_name: req.body.firstName,
            last_name: req.body.lastName,
            email: req.body.email,
            password: hashedPassword
        };
        
        // Create a new user using the collected data
        const user = await User.create(userData);
        console.log('user', user) 
        res.status(201).send(user);
    } catch (error) {
        console.log('error', error)
        res.render('signup', { error: 'Error creating user' });
    }
});

module.exports = router;


const express = require('express');
// Adjust the path to your User model
const User = require('../models').User;

const router = express.Router();

router.post('/login', async (req, res) => {
  console.log('Login route');
  const email = req.body.email;
  const password = req.body.password;
  console.log('User submitted:', email, password)

  try {
    const user = await User.findOne({ where: { email: email } });
    console.log(user);

    if (user && user.password === password) {
      req.session.userId = user.id; // Store user ID in session
      res.redirect(`/boards/${user.id}`); // Redirect to associated page
      console.log('User logged in:', user.email);
    } else {
      res.render('login', { error: 'Invalid credentials' }); // Display error message
    }
  } catch (error) {
    console.error('Error during login:', error);
    res.render('login', { error: 'An error occurred' }); // Display error message
  }
});

module.exports = router;
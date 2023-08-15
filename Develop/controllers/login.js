const express = require("express");
const bcrypt = require("bcrypt");

// Adjust the path to your User model
const User = require("../models").User;

const router = express.Router();

router.post("/login", async (req, res) => {
  //console.log('Login route');
  const email = req.body.email;
  const password = req.body.password;
  //console.log('User submitted:', email, password)

  try {
    const user = await User.findOne({ where: { email: email } });

    const id = user.dataValues.id;

    console.log("id " + id);

    if (user && bcrypt.compareSync(password, user.password)) {
      req.session.save(() => {
        req.session.user_id = id;
        req.session.logged_in = true;
      });
      // Store user ID in session
      //console.log('User ID stored in session:', user.id);
      res.redirect(`/boards/${user.id}`); // Redirect to associated page

      //console.log('User logged in:', user.email);
    } else {
      res.render("login", { error: "Invalid credentials" }); // Display error message
      //console.log('Invalid login');
    }
  } catch (error) {
    //console.error('Error during login:', error);
    res.render("login", { error: "An error occurred" }); // Display error message
    //console.log('Error during login:', error);
  }
});

module.exports = router;

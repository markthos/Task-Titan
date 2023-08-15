const router = require("express").Router();
const { User } = require("../../models");
const bcrypt = require('bcrypt');

router.post("/", async (req, res) => {
  try {
    const userData = await User.create(req.body);

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.status(200).json(userData);
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post("/login", async (req, res) => {
  try {
    const userData = await User.findOne({ where: { email: req.body.email } });

    if (!userData) {
      res
        .status(400)
        .json({ message: "Incorrect email or password, please try again" });
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: "Incorrect email or password, please try again" });
      return;
    }

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.json({ user: userData, message: "You are now logged in!" });
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post("/logout", (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});


//to signup

router.post('/signup', async (req, res) => {
  try {
    const userData = await User.create({
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email,
      password: req.body.password,
    });

    // Automatically log in the newly signed up user
    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      res.status(200).json({ user: userData, message: 'Signup successful' });
    });
  } catch (err) {
    res.status(400).json(err);
  }
});


//to get user profile

router.get("/profile", async (req, res) => {
  try {
    if (req.session.logged_in) {
      const user = await User.findByPk(req.session.user_id);
      res.status(200).json(user);
    } else {
      res.status(401).json({ message: "Not authorized" });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//to update user profile

router.put("/profile", async (req, res) => {
  try {
    if (req.session.logged_in) {
      const [affectedRows] = await User.update(req.body, {
        where: {
          id: req.session.user_id,
        },
      });
      if (affectedRows > 0) {
        res.status(200).end();
      } else {
        res.status(404).json({ message: "Not found" });
      }
    } else {
      res.status(401).json({ message: "Not authorized" });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//to delete user profile
router.delete("/profile", async (req, res) => {
  try {
    if (req.session.logged_in) {
      const userData = await User.destroy({
        where: {
          id: req.session.user_id,
        },
      });
      if (!userData) {
        res.status(404).json({ message: "No user found with this id!" });
        return;
      }
      res.status(200).json(userData);
    } else {
      res.status(401).json({ message: "Not authorized" });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//to change password

router.put("/profile/password", async (req, res) => {
  try {
    if (req.session.logged_in) {
      const user = await User.findByPk(req.session.user_id);
      if (user.checkPassword(req.body.currentPassword)) {
        const hashedNewPassword = await bcrypt.hash(req.body.newPassword, 10);
        await user.update({ password: hashedNewPassword });
        res.status(200).json({ message: "Password changed successfully" });
      } else {
        res.status(400).json({ message: "Current password is incorrect" });
      }
    } else {
      res.status(401).json({ message: "Not authorized" });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;

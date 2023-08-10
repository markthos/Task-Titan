const router = require('express').Router();
const { User } = require('../../models');

// CREATE user
router.post('/', async (req, res) => {
    try {
        const titanUserData = await User.create(req.body);

        req.session.save(() => {
            req.session.user_id = titanUserData.id;
            req.session.loggedIn = true;

            req.status(200).json(titanUserData);
        });
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
});

// Logging in
router.post('/login', async (req, res) => {
    try {
        const titanUserData = await User.findOne({
            where: {
                email: req.body.email,
            },
        });

        if (!titanUserData) {
            res.status(400).json({
                message: 'Your email or password was incorrect. Please try again.'
            });
            return;
        }

        const validPassword = await titanUserData.checkPassword(req.body.password);

        if (!validPassword) {
            res.status(400).json({
                message: 'Your email or password was incorrect. Please try again.'
            });
            return;
        }

        req.session.save(() => {
            req.session.user_id = titanUserData.id;
            req.session.loggedIn = true;
            res.status(200).json({
                user: titanUserData,
                message: 'Go forth and CRUSH IT'
            });
        });
    } catch (error) {
        console.log(error);
        res.status(400).json(error);
    }
});

// Logging out
router.post('/logout', (req, res) => {
    if (req.session.loggedIn) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(404).end();
    }
});

module.exports = router;
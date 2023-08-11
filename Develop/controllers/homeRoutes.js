const router = require('express').Router();
const { Project, User, Ticket } = require('../models');


router.get('/', async (req, res) => {
    //try {
    // Get all projects and JOIN with user data
    //const projectData = await Project.findAll({
        //include: [
        //{
            //model: User,
           // attributes: ['name'],
        //},
        //],
    //});

    // Serialize data so the template can read it
    // const projects = projectData.map((project) => project.get({ plain: true }));

    // Pass serialized data and session flag into template
    res.render('homepage')
});

module.exports = router;
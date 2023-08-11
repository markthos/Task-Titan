const router = require('express').Router();
const { Project, User, Ticket } = require('../models');


router.get('/', async (req, res) => {
    try {
        res.render('homepage');
    } catch (error) {
        console.log(error)
        res.status(500).send("Fly you fools. Server Error")
    }
});

router.get('/login', async (req, res) => {
    try {
        res.render('login');
    } catch (error) {
        console.log(error)
        res.status(500).send("Fly you fools. Server Error")
    }
});

router.get('/boards', async (req, res) => {
    try {
        res.render('boards');
    } catch (error) {
        console.log(error)
        res.status(500).send("Fly you fools. Server Error")
    }
});

router.get('/client', async (req, res) => {
    try {
        res.render('homepage');
    } catch (error) {
        console.log(error)
        res.status(500).send("Fly you fools. Server Error")
    }
});


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
    




module.exports = router;
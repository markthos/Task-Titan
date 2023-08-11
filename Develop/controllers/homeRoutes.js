const router = require("express").Router();
const Sequelize = require('sequelize')
const { Project, User, Ticket } = require("../models");

router.get("/", async (req, res) => {
  try {
    res.render("homepage", {
      logged_in: req.session.logged_in,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send("Fly you fools. Server Error");
  }
});

router.get("/login", async (req, res) => {
  try {
    res.render("login", {
      logged_in: req.session.logged_in,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send("Fly you fools. Server Error");
  }
});

router.get("/boards/:id", async (req, res) => {
  try {
 
    // map all of this user's projects and the tickets associated with the user and their projects and render them to the page
    const projectData = await Project.findAll({
        where: {
            user_id: req.params.id,
        },
        include: {
            model: Ticket,
        },
    });

    const projects = projectData.map((project) => project.get({ plain: true }));
    console.log(projects);
    console.log(projects[0].tickets);

    res.render("boards", {
      user,
      logged_in: req.session.logged_in,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send("Fly you fools. Server Error");
  }
});

router.get("/client", async (req, res) => {
  try {
    res.render("homepage", {
      logged_in: req.session.logged_in,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send("Fly you fools. Server Error");
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

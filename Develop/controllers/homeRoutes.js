const router = require("express").Router();
const Sequelize = require("sequelize");
const { Project, User, Ticket } = require("../models");
const withAuth = require("../utils/auth");

// Takes you to the homepage
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

// Takes you to the about page
router.get("/about", async (req, res) => {
  try {
    res.render("about", {
      logged_in: req.session.logged_in,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send("Fly you fools. Server Error");
  }
});

// Takes you to the login page
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

// Takes you to the signup page
router.get("/signup", async (req, res) => {
  try {
    res.render("signup", {
      logged_in: req.session.logged_in,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send("Fly you fools. Server Error");
  }
});

router.get("/boards", async (req, res) => {
  try {
    // We know the user id at this time.
    // generate the tickets from a fetch on the JS attached to the boards page
    //req.params in this sence is Project ID. That ID will tell what tickets to fetch

    // map all of this user's projects and the tickets associated with the user and their projects and render them to the page
    const projectData = await Project.findAll({
      where: {
        owner_id: req.session.user_id,
      },
    });

    const projects = projectData.map((project) => project.get({ plain: true }));
    console.log(projects);

    res.render("boards", {
      projects,
      logged_in: req.session.logged_in,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send("Fly you fools. Server Error");
  }
});

router.get("/boards/:id", async (req, res) => {
  try {
    // We know the user id at this time.
    // generate the tickets from a fetch on the JS attached to the boards page
    //req.params in this sence is Project ID. That ID will tell what tickets to fetch

    // map all of this user's projects and the tickets associated with the user and their projects and render them to the page
    const projectData = await Project.findAll({
      where: {
        owner_id: req.params.id,
      },
    });

    console.log(req.session.user_id)
    
    const projects = projectData.map((project) => project.get({ plain: true }));
    console.log(projects);

    res.render("boards", {
      projects,
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


// Serialize data so the template can read it
// const projects = projectData.map((project) => project.get({ plain: true }));

// Pass serialized data and session flag into template

module.exports = router;

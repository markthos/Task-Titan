const router = require("express").Router();
const Sequelize = require("sequelize");
const { Project, User, Ticket, Collaborator } = require("../models");
const withAuth = require("../utils/auth");
const dayjs = require("dayjs")

// Takes you to the homepage
router.get("/", async (req, res) => {
  try {
    console.log("last logged: " + dayjs(req.session.last_logged, 'MM/DD/YYYY'))

    res.render("homepage", {
      user_name: req.session.user_name,
      logged_in: req.session.logged_in,
      last_logged: req.session.last_logged,
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
      user_name: req.session.user_name,
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
      user_name: req.session.user_name,
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
      user_name: req.session.user_name,
      logged_in: req.session.logged_in,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send("Fly you fools. Server Error");
  }
});

// takes you to the logout page after you logout
router.get("/logout", async (req, res) => {
  try {
    res.render("logout");
  } catch (error) {
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
      user_id: req.session.user_id,
      user_name: req.session.user_name,
      logged_in: req.session.logged_in,
      last_logged: req.session.last_logged,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send("Fly you fools. Server Error");
  }
});

router.get("/boards/:id", withAuth, async (req, res) => {
  try {
    const projectData = await Project.findAll({
      where: {
        owner_id: req.params.id,
      },
      include: [
        {
          model: Ticket,
          include: {
            model: User, // Include the User model for creator_id
            attributes: ["first_name", "last_name"],
          },
        },
      ],
    });

    const last_logged = dayjs(req.session.last_logged).unix();

    const projects = projectData.map((project) => project.get({ plain: true }));



    for (let i = 0; i < projects.length; i++) {
      projects[i].todo = [];
      projects[i].doing = [];
      projects[i].review = [];
      projects[i].done = [];
      
      let ticketsArray = projects[i].tickets.length
        ? projects[i].tickets.length
        : 0;
      for (let j = 0; j < ticketsArray; j++) {
        projects[i].tickets[j].isOwner = true;
        const date_created = dayjs(projects[i].tickets[j].date_created).unix()
        if (date_created > last_logged) {
          projects[i].tickets[j].new_item = true;
        } else {
          projects[i].tickets[j].new_item = false;
        }
        if (projects[i].tickets[j].status === "todo") {
          projects[i].todo.push(projects[i].tickets[j]);
        } else if (projects[i].tickets[j].status === "doing") {
          projects[i].doing.push(projects[i].tickets[j]);
        } else if (projects[i].tickets[j].status === "review") {
          projects[i].review.push(projects[i].tickets[j]);
        } else if (projects[i].tickets[j].status === "done") {
          projects[i].done.push(projects[i].tickets[j]);
        }
      }
    }

    const now = dayjs();

    req.session.save(() => {
      req.session.last_logged = now;
    })

    console.log("Session user_name: " + req.session.user_name);

    res.render("boards", {
      projects,
      user_id: req.session.user_id,
      user_name: req.session.user_name,
      logged_in: req.session.logged_in,
      last_logged: req.session.last_logged,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send("Fly you fools. Server Error");
  }
});

router.get("/client", async (req, res) => {
  try {
    res.render("homepage", {
      user_name: req.session.user_name,
      logged_in: req.session.logged_in,
      last_logged: req.session.last_logged,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send("Fly you fools. Server Error");
  }
});

module.exports = router;

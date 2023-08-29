const router = require("express").Router();
const { Project, User, Collaborator, Ticket } = require("../../models");
const withAuth = require("../../utils/auth");
const { Op } = require("sequelize");
const dayjs = require('dayjs')

router.post("/", async (req, res) => {
  try {
    const { name, date_started, type } = req.body;
    let newProject;
    let newCollaborator;

    if (req.session.user_id) {
      // If user is logged in, create a project with user_id
      newProject = await Project.create({
        name,
        date_started,
        type,
        owner_id: req.session.user_id,
      });

      newCollaborator = await Collaborator.create({
        user_id: req.session.user_id,
        project_id: newProject.id,
        access_level: 'admin',
      })
      return res.redirect(`/boards/${newProject.id}`);
    } else {
      // FUNCTIONS WITHOUT A USER ID PURELY FOR TESTING PURPOSES
      newProject = await Project.create({
        name,
        date_started,
        type,
      });
    }

    res.status(200).json(newProject);
  } catch (err) {
    res.status(400).json(err);
  }
});


router.get("/admin", async (req, res) => {
  try {
    const projects = await Project.findAll();

    if (projects.length === 0) {
      res.status(404).json({ message: "No projects found" });
      return;
    }

    res.status(200).json(projects);
  } catch (err) {
    res.status(500).json(err);
  }
});


// to update a project

router.put("/:id", async (req, res) => {
  try {
    const [affectedRows] = await Project.update(req.body, {
      where: {
        id: req.params.id,
        user_id: req.session.user_id, // Ensure only the owner can update
      },
    });

    if (affectedRows === 0) {
      res.status(404).json({ message: "Project not found or unauthorized" });
      return;
    }

    res.status(200).json({ message: "Project updated successfully" });
  } catch (err) {
    res.status(500).json(err);
  }
});

// to delete a project
router.delete("/:id", async (req, res) => {
  console.log("Delete route hit for project:", req.params.id);
  try {
    console.log("Attempting to delete project for user:", req.session.user_id);
    const projectData = await Project.destroy({
      where: {
        id: req.params.id,
        owner_id: req.session.user_id,
      },
    });
    console.log("Project deletion result:", projectData);
    if (!projectData) {
      console.log("No project found with this id!");
      res.status(404).json({ message: "No project found with this id!" });
      return;
    }
    res.status(200).json(projectData);
  } catch (err) {
    console.error("Error encountered:", err);
    res.status(500).json(err);
  }
});



// to get all projects for a user
router.get("/", async (req, res) => {
  try {
    const projectData = await Project.findAll({
      where: {
        owner_id: req.session.user_id,
      },
    });


    if (projects.length === 0) {
      res.status(404).json({ message: "No projects found for this user" });
      return;
    }
    
    const projects = projectData.map((project) => project.get({ plain: true }));
    console.log(projects);

    res.status(200).json({
      projects,
      user_id: req.session.user_id,
      user_name: req.session.user_name,
      logged_in: req.session.logged_in,
      last_logged: req.session.last_logged,
    });


    res.status(200).json(projects);
  } catch (err) {
    res.status(500).json(err);
  }
});


// to get one project for a user

router.get("/:id", async (req, res) => {
  try {
    const project = await Project.findOne({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!project) {
      res.status(404).json({ message: "Project not found" });
      return;
    }
    res.status(200).json(project);
  } catch (err) {
    res.status(500).json(err);
  }
});



router.post("/:id/addCollaborator", async (req, res) => {
  try {
    const project = await Project.findOne({
      where: {
        id: req.params.id,
        owner_id: req.session.user_id,
      },
    });

    if (!project) {
      res.status(404).json({ message: "Project not found" });
      return;
    }

    const user = await User.findOne({
      where: {
        email: req.body.email, 
      },
    });

    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    const collaborator = await Collaborator.create({
      user_id: user.id,
      project_id: project.id,
      access_level: req.body.access_level,
    });

    res.redirect(`/boards/${req.params.id}`)
  } catch (err) {
    res.status(500).json(err);
  }
});

// Express Route
// DOES NOT WORK WITH ROUTER.DELETE
router.post('/:id/removeCollaborator', async (req, res) => {
  console.log('we tried');
  try {
    const project = await Project.findOne({
      where: {
        id: req.params.id,
        owner_id: req.session.user_id,
      },
    });

    if (!project) {
      res.status(404).json({ message: "Project not found" });
      return;
    }

    // Assuming you have a Collaborator model and want to remove the collaborator by user_id
    const collaborator = await Collaborator.findOne({
      where: {
        user_id: req.body.collaborator,
        project_id: project.id,
      },
    });

    if (!collaborator) {
      res.status(404).json({ message: "Collaborator not found" });
      return;
    }

    // Now, remove the collaborator
    await collaborator.destroy();

    res.status(200).redirect(`/boards/${req.params.id}`);
  } catch (err) {
    res.status(500).json(err);
  }
});



router.get("/progress/:id", async (req, res) => {
  try {

    console.log("you made it here")

    const projectData = await Project.findAll({
      where: {
        id: req.params.id,
      },
      include: [
        {
          model: Ticket,
        },
      ],
    });
  
    const projects = projectData.map((project) => project.get({ plain: true }));

    let ticketsArray = [];

    for (let i = 0; i < projects.length; i++) {
      projects[i].todo = [];
      projects[i].doing = [];
      projects[i].review = [];
      projects[i].done = [];
      
      
      ticketsArray = projects[i].tickets.length
        ? projects[i].tickets.length
        : 0;
      for (let j = 0; j < ticketsArray; j++) {
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

    const progress_data = Math.round((projects[0].done.length / ticketsArray) * 100)

    projects[0].progress_data = progress_data

    const data = progress_data

    console.log(progress_data)

    req.io.emit("message", data)

    res.status(200).json({
      progress_data
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Fly you fools. Server Error"});
  }
});

router.post("/:id/projectDelete", async (req, res) => {
  console.log("Delete route hit for project:", req.body.selectedProject);

  try {
    const projectData = await Project.destroy({
      where: {
        id: req.body.selectedProject,
      },
    });

    console.log("Project deletion result:", projectData);
    if (!projectData) {
      console.log("No project found with this id!");
      res.status(404).json({ message: "No project found with this id!" });
      return;
    }
    res.status(200).redirect("/boards")
  } catch (err) {
    console.error("Error encountered:", err);
    res.status(500).json(err);
  }
});



module.exports = router;

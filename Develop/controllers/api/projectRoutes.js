const router = require("express").Router();
const { Project } = require("../../models");
const withAuth = require("../../utils/auth");
const { Collaborator } = require("../../models");

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


//! to get all projects NEED A SUPER ADMIN APPROVAL HELPER ** IF WE ADD SUPERADMIN

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

module.exports = router;

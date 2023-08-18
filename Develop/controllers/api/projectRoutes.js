const router = require("express").Router();
const { Project } = require("../../models");
const withAuth = require("../../utils/auth");
/*
router.post("/", async (req, res) => {
  try {
    const newProject = await Project.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newProject);
  } catch (err) {
    res.status(400).json(err);
  }
});
*/
// ARUN, THIS IS OUR (MARK AND AVERY) POST ROUTE FOR MAKING PROJECTS
router.post("/", async (req, res) => {
  try {
    const { name, date_started, type } = req.body;
    let newProject;

    if (req.session.user_id) {
      // If user is logged in, create a project with user_id
      newProject = await Project.create({
        name,
        date_started,
        type,
        owner_id: req.session.user_id,
      });
      return res.redirect(`/boards/${req.session.user_id}`);
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
  try {
    const projectData = await Project.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!projectData) {
      res.status(404).json({ message: "No project found with this id!" });
      return;
    }

    res.status(200).json(projectData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// to get all projects for a user

router.get("/", async (req, res) => {
  try {
    const projects = await Project.findAll({
      where: {
        user_id: req.session.user_id,
      },
    });

    if (projects.length === 0) {
      res.status(404).json({ message: "No projects found for this user" });
      return;
    }

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

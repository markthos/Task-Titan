const { Project } = require("../models");

// Middleware function to check if user is logged in
const withAuth = async (req, res, next) => {

  const id = req.params.id;

  const project = await Project.findAll({
    where: {
      id: id,
      user_id: req.session.user_id
    },
  });

  console.log(id)
  console.log(req.session.user_id)

  console.log("project: " + project)

  if (!project) {
    res.status(403).send("You do not have permission to view this project.");
    return;
  }



    // If user is not logged in, redirect to login page
    if (!req.session.logged_in) {
      res.redirect("/login");
    } else if (req.params.id !== req.session.user_id.toString()) {
      res.status(403).send("You do not have permission to view this page");
    }
    else {
      // If user is logged in, continue to next middleware or route
      next();
     }
  };

  // Exporting withAuth middleware function
  module.exports = withAuth;
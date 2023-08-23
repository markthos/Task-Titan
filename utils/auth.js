const { col } = require("sequelize");
const { Project, Collaborator, User, Ticket } = require("../models");

// Middleware function to check if user is logged in
const withAuth = async (req, res, next) => {

  const project_id = req.params.id;
  const collaborators = await Collaborator.findAll({
    where: {
      project_id: req.params.id,
    },
    include: [
      {
        model: User,
        attributes: ["first_name", "last_name"],
      },
    ],
  });

  console.log("this is the project_id:" + project_id)
  console.log("this is the req.session.user_id:" + req.session.user_id)
  console.log("this is the collaborators:" + collaborators)
  
    // If user is not logged in, redirect to login page
    if (!req.session.logged_in) {
      res.redirect("/login");
    } 
      // Check to see if the user is a collaborator on the project
      else if (collaborators.some((collaborator) => collaborator.user_id === req.session.user_id)) {
      // If user is logged in and is a collaborator, continue to next middleware or route
      next();
    } else {
      // If user is logged in but is not a collaborator, redirect to boards page
      console.log("You do not have permission to view this project.");
      res.redirect("/boards");
    }
  };

  // Exporting withAuth middleware function
  module.exports = withAuth;
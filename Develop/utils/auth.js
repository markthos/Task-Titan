// Middleware function to check if user is logged in
const withAuth = async (req, res, next) => {
  try {
    // If user is not logged in, redirect to login page
    if (!req.session.logged_in) {
      res.redirect("/login");
    } 
    
    // Get the project id from the url
    const fetchProjectById = window.location.pathname.split("/").pop();
    // Fetch the project data from the database
    const projectData = await fetch(`/api/projects/${fetchProjectById}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    const project = await projectData.json();
    // Check if the logged in user is the owner of the project
    if (project.owner_id !== req.session.user_id) {
      res.status(403).send("You do not have permission to view this page");
    }
    // If user is logged in, continue to next middleware or route
    next();
  } catch (err) {
    res.status(400).json(err);
  }
};



  // Exporting withAuth middleware function
  module.exports = withAuth;
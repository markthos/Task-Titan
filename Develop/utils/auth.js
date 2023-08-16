// Middleware function to check if user is logged in
const withAuth = (req, res, next) => {
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
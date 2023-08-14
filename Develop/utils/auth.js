// Middleware function to check if user is logged in
const withAuth = (req, res, next) => {
    // If user is not logged in, redirect to login page
    if (!req.session.logged_in) {
      res.redirect("/login");
    } else {
      // If user is logged in, continue to next middleware or route
      next();
     }
  };

  // Exporting withAuth middleware function
  module.exports = withAuth;
const dayjs = require("dayjs");
const Handlebars = require('handlebars')

const compare = (ticket) => {
  console.log("this", ticket)
  return ticket
}

const format_date = (date) => {
  return dayjs(date).format("MM/DD/YYYY");
};





Handlebars.registerHelper('hasFullAccess', function(collaborator, project, user, options) {
  console.log('collaborator:', collaborator);
  console.log('project:', project);
  console.log('user:', user);
  if (collaborator.access_level === 'admin' || project.owner_id === user.id) {
      return options.fn(this); 
  } else {
      return options.inverse(this); 
  }
});


module.exports = { compare, format_date};

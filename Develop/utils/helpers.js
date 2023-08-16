const dayjs = require("dayjs");
const Handlebars = require('handlebars')

const compare = (leftValue, operator, rightValue, options) => {
  switch (operator) {
    case '==':
      return leftValue == rightValue ? options.fn(this) : options.inverse(this);
    case '===':
      return leftValue === rightValue ? options.fn(this) : options.inverse(this);
    case '!=':
      return leftValue != rightValue ? options.fn(this) : options.inverse(this);
    case '!==':
      return leftValue !== rightValue ? options.fn(this) : options.inverse(this);
    case '<':
      return leftValue < rightValue ? options.fn(this) : options.inverse(this);
    case '<=':
      return leftValue <= rightValue ? options.fn(this) : options.inverse(this);
    case '>':
      return leftValue > rightValue ? options.fn(this) : options.inverse(this);
    case '>=':
      return leftValue >= rightValue ? options.fn(this) : options.inverse(this);
    default:
      return options.inverse(this);
  }
};

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

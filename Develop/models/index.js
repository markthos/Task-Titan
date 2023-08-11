const User = require('./user');
const Project = require('./project');
const Ticket = require('./ticket')

User.hasMany(Project, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

Project.belongsTo(User, {
  foreignKey: 'user_id'
});

Ticket.belongsTo(Project, {
    foreignKey: 'project_id'
});

Ticket.belongsTo(User, {
    foreignKey: 'creator_id'
});

module.exports = { User, Project, Ticket };


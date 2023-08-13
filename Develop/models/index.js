const User = require('./user');
const Project = require('./project');
const Ticket = require('./ticket')
const Comment = require('./comment')

User.hasMany(Project, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

Project.belongsTo(User, {
  foreignKey: 'user_id'
});

Project.hasMany(Ticket, {
  foreignKey: 'project_id'
});

Ticket.belongsTo(Project, {
    foreignKey: 'project_id'
});

Ticket.belongsTo(User, {
    foreignKey: 'creator_id'
});

Project.hasMany(Comment,{
    foreignKey: 'project_id'
})

Comment.belongsTo(Project,{
  foreignKey: 'project_id'
});





module.exports = { User, Project, Ticket, Comment };


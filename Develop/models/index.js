const User = require('./user');
const Project = require('./project');
const Ticket = require('./ticket')
const Comment = require('./comment');
const Collaborator = require('./collaborator');

const User = require('./user');
const Project = require('./project');
const Ticket = require('./ticket')
const Comment = require('./comment');
const Collaborator = require('./collaborator');

User.belongsToMany(Project, {
  through:{
      model: Collaborator,
      foreignKey: 'user_id',
    },
  onDelete: 'CASCADE',
  as: 'collaborations'
});

Project.belongsToMany(User, {
  through: {
    model: Collaborator,
    foreignKey: 'project_id',
  },
  onDelete: 'CASCADE',
  as: 'collaborators'
});

Project.belongsTo(User, {
  foreignKey: 'owner_id' // Will changed this, is it right? it was user_id
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

Collaborator.belongsTo(User,{
  foreignKey: 'user_id'
})

Collaborator.belongsTo(Project,{
  foreignKey: 'project_id'
});

module.exports = { User, Project, Ticket, Comment, Collaborator };



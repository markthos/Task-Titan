const User = require("./user");
const Project = require("./project");
const Ticket = require("./ticket");
const BoardComment = require("./board_comment");
const Collaborator = require("./collaborator");
const TicketComment = require("./ticket_comment");

User.hasMany(Project, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});

User.hasMany(Ticket, {
  foreignKey: "ticket_id",
});

User.hasMany(BoardComment, {
  foreignKey: "creator_id",
});

User.hasMany(TicketComment, {
  foreignKey: "creator_id",
});

User.belongsToMany(Project, {
  through: {
    model: Collaborator,
    foreignKey: "user_id",
  },
  onDelete: "CASCADE",
  as: "collaborations",
});

Project.belongsToMany(User, {
  through: {
    model: Collaborator,
    foreignKey: "project_id",
  },
  onDelete: "CASCADE",
  as: "collaborators",
});

Project.belongsTo(User, {
  foreignKey: "owner_id", 
});

Project.hasMany(Ticket, {
  foreignKey: "project_id",
});

Ticket.belongsTo(Project, {
  foreignKey: "project_id",
});

Ticket.belongsTo(User, {
  foreignKey: "creator_id",
});

Ticket.hasMany(TicketComment, {
  foreignKey: "ticket_id",
});

Project.hasMany(BoardComment, {
  foreignKey: "project_id",
});

BoardComment.belongsTo(Project, {
  foreignKey: "project_id",
});

Collaborator.belongsTo(User, {
  foreignKey: "user_id",
});

Collaborator.belongsTo(Project, {
  foreignKey: "project_id",
});

TicketComment.belongsTo(Ticket, {
  foreignKey: "ticket_id",
});

TicketComment.belongsTo(User, {
  foreignKey: "creator_id",
});

module.exports = {
  User,
  Project,
  Ticket,
  BoardComment,
  TicketComment,
  Collaborator,
};

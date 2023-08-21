const sequelize = require("../config/connection");
const {
  User,
  Project,
  Ticket,
  BoardComment,
  TicketComment,
  Collaborator,
} = require("../models");
const userData = require("./userData.json");
const projectData = require("./projectData.json");
const ticketData = require("./ticketData.json");
const boardCommentData = require("./boardCommentData.json");
const ticketCommentData = require("./ticketCommentData.json");
const collaboratorData = require("./collaboratorData.json");

const seedDatabase = async () => {
  await sequelize.sync({ force: true });
  try {
    const users = [];
    for (const userDataItem of userData) {
      const user = await User.create(userDataItem);
      users.push(user);
    }
    console.log("\n----- SEEDED -----\n");
    await Project.bulkCreate(projectData);
    console.log("\n----- PROJECTS SEEDED -----\n");
    await Ticket.bulkCreate(ticketData);
    console.log("\n----- TICKETS SEEDED -----\n");
    await BoardComment.bulkCreate(boardCommentData);
    console.log("\n----- Board Comments SEEDED -----\n");
    await TicketComment.bulkCreate(ticketCommentData);
    console.log("\n----- Ticket Comments SEEDED -----\n");
    await Collaborator.bulkCreate(collaboratorData);
    console.log("\n----- COLLABORATORS SEEDED -----\n");
    console.log("\n----- DB SEEDED! -----\n");
  } catch (error) {
    console.error("Error seeding db", error);
  } finally {
    await sequelize.close();
  }
};

seedDatabase();

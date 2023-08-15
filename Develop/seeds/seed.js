const sequelize = require('../config/connection');
const { User, Project, Ticket, Comment, Collaborator } = require('../models');
const userData = require('./userData.json');
const projectData = require('./projectData.json');
const ticketData = require('./ticketData.json')
const commentData = require('./commentData.json')
const collaboratorData = require('./collaboratorData.json')



const seedDatabase = async () => {
  await sequelize.sync ({ force: true })
  try{
    const users = [];
    for (const userDataItem of userData) {
      const user = await User.create(userDataItem);
      users.push(user);
    }
    console.log('\n----- SEEDED -----\n');
    await Project.bulkCreate(projectData);
    console.log('\n----- PROJECTS SEEDED -----\n');
    await Ticket.bulkCreate(ticketData);
    console.log('\n----- TICKETS SEEDED -----\n');
    await Comment.bulkCreate(commentData);
    console.log('\n----- COMMENTS SEEDED -----\n');
    console.log(Collaborator)
    await Collaborator.bulkCreate(collaboratorData);
    console.log('\n----- COLLABORATORS SEEDED -----\n');
    console.log('\n----- DB SEEDED! -----\n');
  } catch (error){
    console.error('Error seeding db', error);
  } finally {
    await sequelize.close();
  }
}

seedDatabase()

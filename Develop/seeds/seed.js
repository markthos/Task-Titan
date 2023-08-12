const sequelize = require('../config/connection');
const { User, Project, Ticket, Comment } = require('../models');
const userData = require('./userData.json');
const projectData = require('./projectData.json');
const ticketData = require('./ticketData.json')
const commentData = require('./commentData.json')




const seedDatabase = async () => {
  await sequelize.sync ({ force: true })
  try{
    const users = [];
    for (const userDataItem of userData) {
      const user = await User.create(userDataItem);
      users.push(user);
    }
    const projects = [];
        for (const projectDataItem of projectData) {
            const project = await Project.create(projectDataItem);
            projects.push(project);
        }
    await Ticket.bulkCreate(ticketData);
    await Comment.bulkCreate(commentData)

    console.log('DB seeded successfully!')
  } catch (error){
    console.error('Error seeding db', error)
  } finally {
    await sequelize.close()
  }
}

seedDatabase()

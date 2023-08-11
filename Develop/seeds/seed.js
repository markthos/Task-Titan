const sequelize = require('../config/connection');
const { User, Project, Ticket } = require('../models');
const userData = require('./userData.json');
const projectData = require('./projectData.json');
const ticketData = require('./ticketData.json')


const seedDatabase = async () => {
    await sequelize.sync({ force: true });
  
    const users = [];
    for (const userDataItem of userData) {
      const user = await User.create(userDataItem);
      users.push(user);
    }
    const projects = await Project.bulkCreate(projectData, {
      returning: true,
    });
  
    for (let i = 0; i < projects.length; i++) {
      const project = projects[i];
      const userIndex = i % users.length;
    
      await project.setUser(users[userIndex]);
    
      const ticketsForProject = ticketData.filter(
        (ticket) => ticket.project_id === project.id
      );
    
      for (const ticket of ticketsForProject) {
        await Ticket.create({
          ...ticket,
          creator_id: users[userIndex].id,
          project_id: project.id,
        });
      }
    }
    process.exit(0);
  };

seedDatabase()
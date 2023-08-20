const express = require('express');
const router = express.Router();
const { Client } = require("../../models");
const withAuth = require("../../utils/auth");

// POST route to add a new client

const project_id = parseInt('Product Launch');
router.post('/client', async (req, res) => {
  try {
    const { user_id, project_id } = req.body;

    // Create a new client instance with user_id and project_id

      const newClient = await Client.create({
      user_id,
      project_id,
    });

    res.status(201).json(newClient);
  } catch (error) {
    console.error('Error creating client:', error);
    res.status(500).json({ message: 'Error creating client' });
  }
});



// PUT route to associate a client with a project
router.put('/client/:user_id/projects/:project_id', async (req, res) => {
  try {
    const { user_id, project_id } = req.params;
    const client = await Client.findByPk(user_id);
    const project = await Project.findByPk(project_id);

    if (!client || !project) {
      return res.status(404).json({ message: 'Client or Project not found' });
    }

    await client.addProject(project);
    res.status(200).json({ message: 'Client associated with project successfully' });
  } catch (error) {
    console.error('Error associating client with project:', error);
    res.status(500).json({ message: 'Error associating client with project' });
  }
});

// GET route to get all clients

router.get('/client', async (req, res) => {
  try {
    const clientData = await Client.findAll({
      include: [{ model: Project, include: [Ticket] }]
    });
    res.status(200).json(clientData);
  } catch (error) {
    console.error('Error getting clients:', error);
    res.status(500).json({ message: 'Error getting clients' });
  }
});

module.exports = router;

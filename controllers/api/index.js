const router = require('express').Router();
const userRoutes = require('./userRoutes');
const projectRoutes = require('./projectRoutes');
const ticketsRoutes = require('./ticketsRoutes');
const collaboratorRoutes = require("./collaboratorRoutes");

router.use('/users', userRoutes);
router.use('/projects', projectRoutes);
router.use('/tickets', ticketsRoutes);
router.use("/collaborator", collaboratorRoutes);

module.exports = router;


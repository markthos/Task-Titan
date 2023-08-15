const router = require('express').Router();
const userRoutes = require('./userRoutes');
const projectRoutes = require('./projectRoutes');
const ticketsRoutes = require('./ticketsRoutes');

router.use('/users', userRoutes);
router.use('/projects', projectRoutes);
router.use('/tickets', ticketsRoutes);

module.exports = router;


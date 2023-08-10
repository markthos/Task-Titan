const router = require('express').Router();

const projectRoutes = require('./projectRoutes');
const userRoutes = require('./userRoutes');

router.use('/users', userRoutes);
router.use('/projects', projectRoutes);

module.exports = router;
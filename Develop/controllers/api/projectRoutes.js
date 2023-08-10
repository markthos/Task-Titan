const router = require('express').Router();
const { Project } = require('../../models');

router.post('/', async (req, res) => {
    try {
        const newProject = await Project.create({
            ...req.body,
            user_id: req.session.user_id,
        });

        res.status(200).json(newProject);
    } catch (error) {
        console.log(error);
        res.status(400).json(error);
    }
});

router.delete('/:id', async (req, res) => {
    try {  
        const projectData = await Project.destroy({
            where: {
                id: req.params.id,
                user_id: req.session.user_id,
            },
        });
    
        if (!projectData) {
            res.status(404).json({
                message: 'There are no projects with this id'
            });
            return;
        }

        res.status(200).json(projectData);
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
});

module.exports = router;
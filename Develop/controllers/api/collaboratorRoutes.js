const router = require("express").Router();
const { Collaborator } = require("../../models");

router.post("/", async (req, res) => {
    try {
      const projects = await Collaborator.findAll({
        where: {
          project_id: req.body.project_id,
          user_id: req.body.user_id
        },
      });
  
      res.status(200).json(projects);
    } catch (err) {
      res.status(500).json(err);
    }
  });

module.exports = router;

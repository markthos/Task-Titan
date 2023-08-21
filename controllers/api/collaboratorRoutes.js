const router = require("express").Router();
const { Collaborator } = require("../../models");

router.post("/validate", async (req, res) => {
    try {
      const colabData = await Collaborator.findAll({
        where: {
          project_id: req.body.project_id,
          user_id: req.body.user_id
        },
      });

      const collaborator = colabData.map((colab)=>colab.get({plain:true}))
  
      console.log(collaborator)

      const access_level = collaborator[0].access_level
    
      if (access_level === "admin") {
        console.log("ello admin");
      } else if (access_level === "worker") {
        console.log("ello worker")
      } else if (access_level === "client") {
        console.log("ello client")
      } else {
        console.log("Not Authorized")
      }

      res.status(200).json(access_level);
    } catch (err) {
      res.status(500).json(err);
    }
  });

module.exports = router;

const router = require("express").Router();
const { Tickets } = require("../../models");

//to view user tickets

router.get("/tickets", async (req, res) => {
  try {
    if (req.session.logged_in) {
      const tickets = await Ticket.findAll({
        where: { creator_id: req.session.user_id },
      });
      res.status(200).json(tickets);
    } else {
      res.status(401).json({ message: "Not authorized" });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;

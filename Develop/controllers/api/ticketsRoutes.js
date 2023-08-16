// ticketRoutes.js
const router = require("express").Router();
const { Ticket } = require("../../models");
const withAuth = require("../../utils/auth");


// Get all tickets
router.get('/', async (req, res) => {
  try {
    const tickets = await Ticket.findAll();
    res.status(200).json(tickets);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Create a new ticket
router.post('/', withAuth, async (req, res) => {
  try {
    const newTicket = await Ticket.create({
      ...req.body,
      creator_id: req.session.user_id,
    });

    res.status(200).json(newTicket);
  } catch (err) {
    res.status(400).json(err);
  }
});


// Get tickets created by the currently logged-in user
router.get("/tickets", withAuth, async (req, res) => {
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


// Get a single ticket by ID
router.get("/:id", withAuth, async (req, res) => {
 try {
    if (req.session.logged_in) {
      const ticket = await Ticket.findOne({
        where: {
          id: req.params.id,
          creator_id: req.session.user_id,
        },
      });

      if (!ticket) {
        res.status(404).json({ message: "Ticket not found" });
        return;
      }

      res.status(200).json(ticket);
    } else {
      res.status(401).json({ message: "Not authorized" });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// Update a ticket by ID
router.put("/tickets/:id", withAuth, async (req, res) => {
  try {
    const updatedTicket = await Ticket.update(req.body, {
      where: {
        id: req.params.id,
        creator_id: req.session.user_id,
      },
    });

    if (!updatedTicket[0]) {
      res.status(404).json({ message: "Ticket not found" });
      return;
    }

    res.status(200).json(updatedTicket);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Delete a ticket by ID
router.delete("/tickets/:id", withAuth, async (req, res) => {
  try {
    const deletedTicket = await Ticket.destroy({
      where: {
        id: req.params.id,
        creator_id: req.session.user_id,
      },
    });

    if (!deletedTicket) {
      res.status(404).json({ message: "Ticket not found" });
      return;
    }

    res.status(200).json(deletedTicket);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;

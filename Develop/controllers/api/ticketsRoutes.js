// ticketRoutes.js
const router = require("express").Router();
const { Ticket, TicketComment, User } = require("../../models");
const withAuth = require("../../utils/auth");

// Get all tickets
router.get("/", async (req, res) => {
  try {
    const tickets = await Ticket.findAll();
    res.status(200).json(tickets);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Create a new ticket
router.post("/", async (req, res) => {
  try {
    const newTicket = await Ticket.create({
      ...req.body,
      creator_id: req.session.user_id,
    });
    if (!newTicket) {
      res.status(404).json({ message: "Ticket not found" });
      return;
    }
    res.status(200).json(newTicket);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get tickets created by the currently logged-in user
router.get("/", async (req, res) => {
  try {
    const tickets = await Ticket.findAll({
      where: { creator_id: req.session.user_id },
    });
    res.status(200).json(tickets);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get a single ticket by ID
router.get("/:id", async (req, res) => {
  try {
    const ticket = await Ticket.findOne({
      where: {
        id: req.params.id,
      },
    });

    if (!ticket) {
      res.status(404).json({ message: "Ticket not found" });
      return;
    }

    res.status(200).json({ message: "ticket found", ticket });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Update a ticket by ID
router.put("/:id", async (req, res) => {
  try {
    console.log("here");
    const updatedTicket = await Ticket.update(req.body, {
      where: {
        id: req.params.id,
      },
    });

    if (!updatedTicket[0]) {
      res.status(404).json({ message: "Ticket not found" });
      return;
    }

    console.log("hitting here");

    res.status(200).json(updatedTicket);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Delete a ticket by ID
router.delete("/:id", async (req, res) => {
  try {
    const deletedTicket = await Ticket.destroy({
      where: {
        id: req.params.id,
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

router.get("/:id/ticketcomments", async (req, res) => {
  try {
    const request = await TicketComment.findAll({
      where: {
        ticket_id: req.params.id,
      },
      include: {
        model: User, //! can not get the user name to pass through!
      },
    });

    if (!request) {
      return res.status(400).json({ message: "No comments found." });
    }

    const comments = request.map((comment) => {
      return comment.get({ plain: true });
    });

    console.log(comments);

    res.status(200).json({ message: "success", comments });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "server Error" });
  }
});

router.post("/:id/ticketcomments", async (req, res) => {
  try {
    const comment = await TicketComment.create({
      ...req.body,
      author_id: req.session.user_id,
    });

    console.log(comment);

    if (!comment) {
      return res.status(404).json({ message: "comment not found" });
    }

    const ticketcomments = request.map((comment) => {
      return comment.get({ plain: true });
    });

    console.log(ticketcomments);

    res.status(200).json({ message: "success", ticketcomments });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "server Error" });
  }
});

module.exports = router;

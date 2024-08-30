const express = require('express');
const router = express.Router();
const Event = require('../models/Event');

// Create event
router.post('/', (req, res) => {
  const { title, location, time } = req.body;
  const newEvent = new Event({
    title,
    location,
    time,
    user: req.user.id
  });

  newEvent.save()
    .then(event => res.json(event))
    .catch(err => res.status(400).json('Error: ' + err));
});

// Get events
router.get('/', (req, res) => {
  Event.find({ user: req.user.id })
    .then(events => res.json(events))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;

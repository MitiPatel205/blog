const express = require('express');
const router = express.Router();

const notifications = [
  {
    _id: "1",
    message: "Welcome to My Blog!",
    date: new Date("2025-06-23T11:00:00Z"),
    read: false
  },
  {
    _id: "2",
    message: "New post published: React Tips",
    date: new Date("2025-06-22T15:30:00Z"),
    read: true
  }
];

router.get('/', (req, res) => {
  res.json(notifications);
});

module.exports = router;

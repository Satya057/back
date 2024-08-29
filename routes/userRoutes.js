// userRoutes.js
const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Example route for adding a new user
router.post('/users', async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  // Simple validation
  if (!firstName || !lastName || !email || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const newUser = new User({ firstName, lastName, email, password });
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;

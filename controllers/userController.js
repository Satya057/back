const User = require('../models/userModel');
const { createObjectCsvWriter } = require('csv-writer');

// List all users
exports.getUsers = async (req, res) => {
  try {
    const users = await User.find({ deleted: false });
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Add a new user
exports.addUser = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  try {
    const newUser = new User({ firstName, lastName, email, password });
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a user
exports.deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    await User.findByIdAndUpdate(id, { deleted: true });
    res.status(200).json({ message: 'User deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Export users to CSV
exports.exportUsers = async (req, res) => {
  const csvWriter = createObjectCsvWriter({
    path: 'users.csv',
    header: [
      { id: '_id', title: 'ID' },
      { id: 'email', title: 'EMAIL' },
      { id: 'firstName', title: 'FIRST_NAME' },
      { id: 'lastName', title: 'LAST_NAME' }
    ]
  });

  try {
    const users = await User.find({ deleted: false });
    await csvWriter.writeRecords(users);
    res.download('users.csv');
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const User = require('../models/User');
const { exportUsersToCSV } = require('../Utils/csvExporter');

// Get all users
exports.getUsers = async (req, res) => {
  try {
    const users = await User.find({ deleted: false });
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Add new user
exports.addUser = async (req, res) => {
  const { email, firstName, lastName, password } = req.body;

  const newUser = new User({
    email,
    firstName,
    lastName,
    password,
  });

  try {
    const user = await newUser.save();
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete user
exports.deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findById(id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    user.deleted = true;
    await user.save();

    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Export users to CSV
exports.exportUsers = async (req, res) => {
  const { ids } = req.body;

  try {
    const users = await User.find({ _id: { $in: ids }, deleted: false });
    const csv = exportUsersToCSV(users);

    res.setHeader('Content-Disposition', 'attachment; filename=users.csv');
    res.set('Content-Type', 'text/csv');
    res.status(200).send(csv);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


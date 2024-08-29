const mongoose = require('mongoose');
require('dotenv').config(); // Load environment variables from .env file

const connectionString = process.env.MONGO_URI; // Retrieve the URI from environment variables

if (!connectionString) {
  console.error('Missing MONGO_URI environment variable');
  process.exit(1); // Exit if MONGO_URI is not set
}

mongoose.connect(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Connection error:', err));

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Database connection established');
});

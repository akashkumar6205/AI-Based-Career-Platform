const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Successfully connected to MongoDB.');
  } catch (err) {
    console.error('\n⚠️  MongoDB connection warning:', err.message);
    console.error('👉 The server is still running, but database features (login/signup) will fail.');
    console.error('👉 Please make sure local MongoDB is running or configure your MONGODB_URI env variable.\n');
  }
};

module.exports = connectDB;

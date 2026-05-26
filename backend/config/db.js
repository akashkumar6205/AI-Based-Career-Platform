const mongoose = require('mongoose');

const connectDB = async () => {
  const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/careershield_ai';
  try {
    await mongoose.connect(MONGODB_URI, { serverSelectionTimeoutMS: 5000 });
    console.log('Successfully connected to MongoDB.');
  } catch (err) {
    console.error('\n⚠️  MongoDB connection warning:', err.message);
    console.error('👉 The server is still running, but database features (login/signup) will fail.');
    console.error('👉 Please make sure local MongoDB is running or configure your MONGODB_URI env variable.\n');
  }
};

module.exports = connectDB;

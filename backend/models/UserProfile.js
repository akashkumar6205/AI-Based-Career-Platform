const mongoose = require('mongoose');

const userProfileSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      trim: true,
      default: '',
    },
    middleName: {
      type: String,
      trim: true,
      default: '',
    },
    lastName: {
      type: String,
      trim: true,
      default: '',
    },
    userId: {
      type: String,
      trim: true,
      unique: true,
      sparse: true, // allows multiple docs with empty userId without conflict
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      default: '',
    },
    mobile: {
      type: String,
      trim: true,
      default: '',
    },
  },
  {
    timestamps: true, // adds createdAt & updatedAt
  }
);

module.exports = mongoose.model('UserProfile', userProfileSchema);

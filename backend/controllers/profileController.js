const UserProfile = require('../models/UserProfile');

/**
 * POST /api/profile
 * Create or update a user profile (upsert by userId).
 */
exports.saveProfile = async (req, res) => {
  try {
    const { firstName, middleName, lastName, userId, email, mobile } = req.body;

    if (!userId || !userId.trim()) {
      return res.status(400).json({ error: 'User ID is required.' });
    }

    const trimmedUserId = userId.trim();

    // Upsert: find by userId and update, or create if it doesn't exist
    const profile = await UserProfile.findOneAndUpdate(
      { userId: trimmedUserId },
      {
        firstName: firstName?.trim() || '',
        middleName: middleName?.trim() || '',
        lastName: lastName?.trim() || '',
        userId: trimmedUserId,
        email: email?.trim() || '',
        mobile: mobile?.trim() || '',
      },
      {
        new: true,           // return the updated document
        upsert: true,        // create if not found
        runValidators: true,  // enforce schema validations
      }
    );

    res.status(200).json({
      message: 'Profile saved successfully.',
      profile,
    });
  } catch (err) {
    console.error('Error saving profile:', err);

    // Handle duplicate key error (userId already taken by another doc)
    if (err.code === 11000) {
      return res.status(409).json({ error: 'This User ID is already taken.' });
    }

    res.status(500).json({ error: 'Failed to save profile. Please try again.' });
  }
};

/**
 * GET /api/profile/:userId
 * Fetch a user profile by userId.
 */
exports.getProfile = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId || !userId.trim()) {
      return res.status(400).json({ error: 'User ID is required.' });
    }

    const profile = await UserProfile.findOne({ userId: userId.trim() });

    if (!profile) {
      return res.status(404).json({ error: 'Profile not found.' });
    }

    res.status(200).json({ profile });
  } catch (err) {
    console.error('Error fetching profile:', err);
    res.status(500).json({ error: 'Failed to fetch profile. Please try again.' });
  }
};

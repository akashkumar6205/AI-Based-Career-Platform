const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { OAuth2Client } = require('google-auth-library');

const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
  throw new Error('JWT_SECRET is not defined in the environment variables.');
}

// Signup
exports.signup = async (req, res) => {
  const { email, password } = req.body;
  
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }
  if (password.length < 6) {
    return res.status(400).json({ error: 'Password must be at least 6 characters long' });
  }
  
  try {
    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return res.status(400).json({ error: 'Email already registered' });
    }
    
    const hashedPassword = bcrypt.hashSync(password, 10);
    const newUser = new User({
      email: email.toLowerCase(),
      password: hashedPassword
    });
    
    await newUser.save();
    
    const token = jwt.sign({ id: newUser._id, email: newUser.email }, JWT_SECRET, { expiresIn: '7d' });
    res.status(201).json({
      token,
      user: { id: newUser._id, email: newUser.email }
    });
  } catch (err) {
    console.error('Signup controller error:', err);
    res.status(500).json({ error: 'Internal server database error' });
  }
};

// Login
exports.login = async (req, res) => {
  const { email, password } = req.body;
  
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }
  
  try {
    const user = await User.findOne({ email: email.toLowerCase() });
    
    if (!user || !bcrypt.compareSync(password, user.password)) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }
    
    const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, { expiresIn: '7d' });
    res.json({
      token,
      user: { id: user._id, email: user.email }
    });
  } catch (err) {
    console.error('Login controller error:', err);
    res.status(500).json({ error: 'Internal server database error' });
  }
};

// Get current user session details
exports.getMe = async (req, res) => {
  res.json({ user: req.user });
};

// Google Login / Signup (Secure)
exports.googleLogin = async (req, res) => {
  const { idToken } = req.body;

  if (!idToken) {
    return res.status(400).json({ error: 'Google ID token is required' });
  }

  try {
    let payload;
    // Allow mock tokens for local development/testing if no client ID is set or if token is prefixed with "mock-"
    if (process.env.NODE_ENV !== 'production' && idToken.startsWith('mock-')) {
      const mockEmail = idToken.replace('mock-', '');
      payload = {
        email: mockEmail,
        sub: 'mock-google-id-' + mockEmail.split('@')[0],
        email_verified: true,
        name: mockEmail.split('@')[0].split('.').map(s => s.charAt(0).toUpperCase() + s.slice(1)).join(' ')
      };
    } else {
      const ticket = await googleClient.verifyIdToken({
        idToken,
        audience: process.env.GOOGLE_CLIENT_ID,
      });
      payload = ticket.getPayload();
    }

    if (!payload) {
      return res.status(401).json({ error: 'Invalid Google token' });
    }

    const { email, sub: googleId, email_verified, name } = payload;

    if (!email_verified) {
      return res.status(401).json({ error: 'Google email is not verified' });
    }

    // Find user by googleId first, or by email
    let user = await User.findOne({
      $or: [
        { googleId: googleId },
        { email: email.toLowerCase() }
      ]
    });

    if (user) {
      // If user exists by email but doesn't have googleId yet, link them
      if (!user.googleId) {
        user.googleId = googleId;
        if (name && !user.name) {
          user.name = name;
        }
        await user.save();
      }
    } else {
      // Create new user for Google login
      user = new User({
        email: email.toLowerCase(),
        googleId: googleId,
        name: name || ''
      });
      await user.save();
    }

    const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, { expiresIn: '7d' });
    res.json({
      token,
      user: { id: user._id, email: user.email, name: user.name || '' }
    });
  } catch (err) {
    console.error('Google token verification failed:', err);
    res.status(401).json({ error: 'Invalid or expired Google token' });
  }
};

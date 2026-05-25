const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'careershield_ai_super_secret_key_12345';

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

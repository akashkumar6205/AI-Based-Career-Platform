const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const authenticateToken = require('../middleware/auth');

// POST /api/auth/signup
router.post('/signup', authController.signup);

// POST /api/auth/login
router.post('/login', authController.login);

// POST /api/auth/google
router.post('/google', authController.googleLogin);

// GET /api/auth/me
router.get('/me', authenticateToken, authController.getMe);

module.exports = router;

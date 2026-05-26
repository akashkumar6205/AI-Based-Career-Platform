require('dotenv').config();

const express = require('express');
const path = require('path');
const cors = require('cors');
const fs = require('fs');
const mongoose = require('mongoose');
const connectDB = require('./config/db');

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB Database
connectDB();

// Auto-create uploads directory
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Global Middlewares
// Global Middlewares & CORS Protection
const allowedOrigins = [
  process.env.FRONTEND_URL || 'http://localhost:5173',
  'http://localhost:3000'
];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Blocked by CORS policy: Origin not allowed'));
    }
  },
  credentials: true
}));

app.use(express.json());
// Serve frontend static assets if they exist (for unified local deployments)
const distPath = path.join(__dirname, '../frontend/dist');
if (fs.existsSync(distPath)) {
  app.use(express.static(distPath));
}

// API Routes
const authRoutes = require('./routes/authRoutes');
const analysisRoutes = require('./routes/analysisRoutes');

app.use('/api/auth', authRoutes);
app.use('/api', analysisRoutes);

// Root Health Route & SPA Fallback Handler
app.get('*', (req, res) => {
  const indexHtmlPath = path.join(__dirname, '../frontend/dist/index.html');
  if (fs.existsSync(indexHtmlPath)) {
    res.sendFile(indexHtmlPath);
  } else {
    // Return a clean API Health Status JSON response for backend-only deployments (like Render)
    res.json({
      status: 'active',
      api: 'CareerShield AI Express Backend API',
      database: mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected',
      environment: process.env.NODE_ENV || 'production'
    });
  }
});

// Listen
app.listen(PORT, () => {
  console.log(`CareerShield AI server running on http://localhost:${PORT}`);
});

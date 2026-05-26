const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const analysisController = require('../controllers/analysisController');
const authenticateToken = require('../middleware/auth');

const fs = require('fs');

// Multer upload configurations
const uploadsDir = path.join(__dirname, '../uploads');

// Smart Multer storage engine selection (diskStorage with memoryStorage fallback)
let storage;
try {
  if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
  }
  fs.accessSync(uploadsDir, fs.constants.W_OK);
  storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, uploadsDir),
    filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
  });
} catch (err) {
  console.log('Upload directory not writable. Falling back to Memory Storage (Serverless friendly).');
  storage = multer.memoryStorage();
}

const upload = multer({ 
  storage, 
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    if (['.pdf', '.docx', '.doc', '.txt'].includes(ext)) {
      cb(null, true);
    } else {
      cb(new Error('Only PDF, DOCX, DOC, and TXT files are allowed'));
    }
  }
});

const uploadSingle = upload.single('resume');

// POST /api/analyze-resume (Secured with authenticateToken)
router.post('/analyze-resume', authenticateToken, (req, res, next) => {
  uploadSingle(req, res, (err) => {
    if (err) {
      return res.status(400).json({ error: err.message });
    }
    next();
  });
}, analysisController.analyzeResume);

module.exports = router;

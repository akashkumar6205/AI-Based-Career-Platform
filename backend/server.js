const express = require('express');
const path = require('path');
const multer = require('multer');
const cors = require('cors');
const fs = require('fs');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = process.env.PORT || 3000;

// Auto-create uploads directory
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../frontend/dist')));

const USERS_FILE = path.join(__dirname, 'users.json');
const JWT_SECRET = process.env.JWT_SECRET || 'careershield_ai_super_secret_key_12345';

// Helper to read users
function readUsers() {
  if (!fs.existsSync(USERS_FILE)) {
    fs.writeFileSync(USERS_FILE, JSON.stringify([]));
  }
  try {
    const data = fs.readFileSync(USERS_FILE, 'utf8');
    return JSON.parse(data || '[]');
  } catch (error) {
    return [];
  }
}

// Helper to write users
function writeUsers(users) {
  fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
}

// Auth Middleware
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  
  if (!token) return res.status(401).json({ error: 'Access token required' });
  
  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: 'Invalid or expired token' });
    req.user = user;
    next();
  });
}

// Auth Endpoints
app.post('/api/auth/signup', (req, res) => {
  const { email, password } = req.body;
  
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }
  if (password.length < 6) {
    return res.status(400).json({ error: 'Password must be at least 6 characters long' });
  }
  
  const users = readUsers();
  const existingUser = users.find(u => u.email.toLowerCase() === email.toLowerCase());
  if (existingUser) {
    return res.status(400).json({ error: 'Email already registered' });
  }
  
  const hashedPassword = bcrypt.hashSync(password, 10);
  const newUser = {
    id: Date.now().toString(),
    email: email.toLowerCase(),
    password: hashedPassword,
    createdAt: new Date().toISOString()
  };
  
  users.push(newUser);
  writeUsers(users);
  
  const token = jwt.sign({ id: newUser.id, email: newUser.email }, JWT_SECRET, { expiresIn: '7d' });
  res.status(201).json({
    token,
    user: { id: newUser.id, email: newUser.email }
  });
});

app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }
  
  const users = readUsers();
  const user = users.find(u => u.email.toLowerCase() === email.toLowerCase());
  
  if (!user || !bcrypt.compareSync(password, user.password)) {
    return res.status(401).json({ error: 'Invalid email or password' });
  }
  
  const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '7d' });
  res.json({
    token,
    user: { id: user.id, email: user.email }
  });
});

app.get('/api/auth/me', authenticateToken, (req, res) => {
  res.json({ user: req.user });
});

// File upload config
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadsDir),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});
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

// Resume analysis endpoint
app.post('/api/analyze-resume', (req, res) => {
  uploadSingle(req, res, (err) => {
    if (err) {
      return res.status(400).json({ error: err.message });
    }

    const jobDescription = req.body.jobDescription || '';
    if (!req.file) return res.status(400).json({ error: 'No resume uploaded' });
    if (jobDescription.trim().length < 20) return res.status(400).json({ error: 'Job description too short (minimum 20 characters)' });

    // Simulated analysis
    const jd = jobDescription.toLowerCase();
    const keywords = ['python','javascript','react','node','sql','java','html','css','api','git','agile','data','cloud','aws'];
    let hits = 0;
    keywords.forEach(k => { if (jd.includes(k)) hits++; });
    const score = Math.min(Math.round(40 + Math.random() * 20 + Math.min(hits * 4, 30)), 95);

    const categories = [
      { name: 'Technical Skills', pct: 40 + Math.round(Math.random() * 45) },
      { name: 'Soft Skills', pct: 50 + Math.round(Math.random() * 40) },
      { name: 'Industry Keywords', pct: 30 + Math.round(Math.random() * 50) },
      { name: 'Action Verbs', pct: 55 + Math.round(Math.random() * 35) },
      { name: 'Experience Match', pct: 35 + Math.round(Math.random() * 45) },
    ];

    const allMissing = ['Cross-functional','Stakeholder Management','CI/CD','Data-driven','Scalable','Mentorship','KPI','Revenue Growth','Sprint Planning','A/B Testing','Cloud Architecture','Agile','REST API','Microservices','DevOps'];
    const missing = allMissing.sort(() => Math.random() - 0.5).slice(0, 5 + Math.floor(Math.random() * 3));

    const allTips = [
      'Add a professional summary tailored to this role.',
      'Quantify achievements with numbers (e.g., "Increased sales by 30%").',
      'Mirror the exact job title from the posting in your resume header.',
      'Replace generic verbs with power verbs like "orchestrated" and "spearheaded."',
      'Include a dedicated "Skills" section with keywords from the job description.',
      'Remove graphics, tables, and multi-column layouts for ATS compatibility.',
      'Ensure contact info is in plain text, not in headers/footers.',
      'Use standard section headings like "Experience," "Education," "Skills."',
      'Tailor bullet points to address the top 3 job requirements.',
      'Save as .docx — some older ATS systems struggle with PDFs.',
    ];
    const tipCount = score >= 80 ? 4 : score >= 60 ? 6 : 8;
    const tips = allTips.sort(() => Math.random() - 0.5).slice(0, tipCount);

    let verdict, verdictClass;
    if (score >= 85) { verdict = '🎯 Excellent Match'; verdictClass = 'excellent'; }
    else if (score >= 70) { verdict = '✅ Good Match'; verdictClass = 'good'; }
    else if (score >= 50) { verdict = '⚡ Average — Needs Work'; verdictClass = 'average'; }
    else { verdict = '🚨 Poor Match — Major Gaps'; verdictClass = 'poor'; }

    // Auto-cleanup uploaded file after analysis to avoid storage leaks
    try {
      if (req.file && req.file.path) {
        fs.unlinkSync(req.file.path);
      }
    } catch (unlinkErr) {
      console.error('Error deleting uploaded file:', unlinkErr);
    }

    res.json({ score, verdict, verdictClass, categories, missing, tips, fileName: req.file.originalname });
  });
});

// Serve frontend for all routing (SPA setup)
app.get('*', (req, res) => res.sendFile(path.join(__dirname, '../frontend/dist/index.html')));

app.listen(PORT, () => console.log(`CareerShield AI server running on http://localhost:${PORT}`));

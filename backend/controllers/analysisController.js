const fs = require('fs');

exports.analyzeResume = (req, res) => {
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
    console.error('Error deleting uploaded file in controller:', unlinkErr);
  }

  res.json({ score, verdict, verdictClass, categories, missing, tips, fileName: req.file.originalname });
};

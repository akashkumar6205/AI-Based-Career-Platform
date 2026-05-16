// ===== DOM ELEMENTS =====
const resumeUploadZone = document.getElementById('resumeUploadZone');
const resumeFileInput = document.getElementById('resumeFileInput');
const uploadContent = document.getElementById('uploadContent');
const uploadSuccess = document.getElementById('uploadSuccess');
const fileName = document.getElementById('fileName');
const fileSize = document.getElementById('fileSize');
const fileRemove = document.getElementById('fileRemove');
const jobDescription = document.getElementById('jobDescription');
const charCount = document.getElementById('charCount');
const analyzeBtn = document.getElementById('analyzeBtn');
const resultsEmpty = document.getElementById('resultsEmpty');
const resultsLoading = document.getElementById('resultsLoading');
const resultsContent = document.getElementById('resultsContent');
const loadingStep = document.getElementById('loadingStep');
const loadingBarFill = document.getElementById('loadingBarFill');
const scoreRingProgress = document.getElementById('scoreRingProgress');
const scoreNumber = document.getElementById('scoreNumber');
const scoreVerdict = document.getElementById('scoreVerdict');
const keywordBars = document.getElementById('keywordBars');
const missingKeywords = document.getElementById('missingKeywords');
const tipsList = document.getElementById('tipsList');
const downloadReport = document.getElementById('downloadReport');
const resetBtn = document.getElementById('resetBtn');

let uploadedFile = null;

// ===== MOBILE MENU =====
const mobileToggle = document.getElementById('mobileToggle');
const navLinks = document.getElementById('navLinks');
mobileToggle.addEventListener('click', () => {
  mobileToggle.classList.toggle('active');
  navLinks.classList.toggle('active');
  document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
});

// ===== FILE UPLOAD HANDLING =====
resumeUploadZone.addEventListener('click', () => {
  if (!uploadedFile) resumeFileInput.click();
});

resumeFileInput.addEventListener('change', (e) => {
  if (e.target.files.length) handleFile(e.target.files[0]);
});

['dragenter', 'dragover'].forEach(evt => {
  resumeUploadZone.addEventListener(evt, (e) => {
    e.preventDefault();
    resumeUploadZone.classList.add('dragover');
  });
});
['dragleave', 'drop'].forEach(evt => {
  resumeUploadZone.addEventListener(evt, (e) => {
    e.preventDefault();
    resumeUploadZone.classList.remove('dragover');
  });
});
resumeUploadZone.addEventListener('drop', (e) => {
  const files = e.dataTransfer.files;
  if (files.length) handleFile(files[0]);
});

function handleFile(file) {
  const validTypes = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'application/msword'];
  if (!validTypes.includes(file.type) && !file.name.match(/\.(pdf|docx|doc)$/i)) {
    alert('Please upload a PDF or DOCX file.');
    return;
  }
  if (file.size > 5 * 1024 * 1024) {
    alert('File size must be under 5MB.');
    return;
  }
  uploadedFile = file;
  fileName.textContent = file.name;
  fileSize.textContent = formatFileSize(file.size);
  uploadContent.style.display = 'none';
  uploadSuccess.style.display = 'flex';
  checkReady();
}

fileRemove.addEventListener('click', (e) => {
  e.stopPropagation();
  uploadedFile = null;
  resumeFileInput.value = '';
  uploadContent.style.display = '';
  uploadSuccess.style.display = 'none';
  checkReady();
});

function formatFileSize(bytes) {
  if (bytes < 1024) return bytes + ' B';
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
  return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
}

// ===== JOB DESCRIPTION =====
jobDescription.addEventListener('input', () => {
  charCount.textContent = jobDescription.value.length + ' characters';
  checkReady();
});

// ===== ENABLE/DISABLE ANALYZE =====
function checkReady() {
  analyzeBtn.disabled = !(uploadedFile && jobDescription.value.trim().length > 20);
}

// ===== ANALYZE =====
analyzeBtn.addEventListener('click', runAnalysis);

async function runAnalysis() {
  resultsEmpty.style.display = 'none';
  resultsContent.style.display = 'none';
  resultsLoading.style.display = '';

  const steps = [
    { text: 'Parsing document structure...', pct: 15 },
    { text: 'Extracting keywords & skills...', pct: 35 },
    { text: 'Matching against job description...', pct: 55 },
    { text: 'Scoring ATS compatibility...', pct: 75 },
    { text: 'Generating optimization tips...', pct: 90 },
    { text: 'Finalizing report...', pct: 100 },
  ];

  for (const step of steps) {
    loadingStep.textContent = step.text;
    loadingBarFill.style.width = step.pct + '%';
    await delay(600 + Math.random() * 400);
  }

  await delay(400);
  resultsLoading.style.display = 'none';
  showResults();
}

function delay(ms) { return new Promise(r => setTimeout(r, ms)); }

// ===== SIMULATED RESULTS =====
function showResults() {
  const jd = jobDescription.value.toLowerCase();
  const score = generateScore(jd);

  resultsContent.style.display = '';

  // Animate score ring
  const circumference = 2 * Math.PI * 70; // ~440
  const offset = circumference - (score / 100) * circumference;
  scoreRingProgress.style.strokeDashoffset = offset;

  // Animate score number
  animateNumber(scoreNumber, score);

  // Verdict
  let verdictText, verdictClass;
  if (score >= 85) { verdictText = '🎯 Excellent Match'; verdictClass = 'excellent'; }
  else if (score >= 70) { verdictText = '✅ Good Match'; verdictClass = 'good'; }
  else if (score >= 50) { verdictText = '⚡ Average — Needs Work'; verdictClass = 'average'; }
  else { verdictText = '🚨 Poor Match — Major Gaps'; verdictClass = 'poor'; }
  scoreVerdict.textContent = verdictText;
  scoreVerdict.className = 'score-verdict ' + verdictClass;

  // Keyword bars
  const categories = generateKeywordCategories(jd);
  keywordBars.innerHTML = '';
  categories.forEach(cat => {
    const cls = cat.pct >= 70 ? '' : cat.pct >= 40 ? 'medium' : 'low';
    keywordBars.innerHTML += `
      <div class="keyword-bar-item">
        <div class="keyword-bar-label"><span>${cat.name}</span><span>${cat.pct}%</span></div>
        <div class="keyword-bar-track"><div class="keyword-bar-fill ${cls}" style="width:0%"></div></div>
      </div>`;
  });
  // Animate bars
  setTimeout(() => {
    document.querySelectorAll('.keyword-bar-fill').forEach((bar, i) => {
      bar.style.width = categories[i].pct + '%';
    });
  }, 100);

  // Missing keywords
  const missing = generateMissingKeywords(jd);
  missingKeywords.innerHTML = missing.map(k => `<span class="missing-keyword">${k}</span>`).join('');

  // Tips
  const tips = generateTips(score);
  tipsList.innerHTML = tips.map(t => `<li>${t}</li>`).join('');

  // Scroll to results on mobile
  if (window.innerWidth <= 968) {
    resultsContent.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

function animateNumber(el, target) {
  let current = 0;
  const step = Math.ceil(target / 60);
  const timer = setInterval(() => {
    current += step;
    if (current >= target) { current = target; clearInterval(timer); }
    el.textContent = current;
  }, 20);
}

function generateScore(jd) {
  // Simulate a score based on JD length & common keywords
  const techKeywords = ['python', 'javascript', 'react', 'node', 'sql', 'java', 'html', 'css', 'api', 'git', 'agile', 'data', 'machine learning', 'cloud', 'aws'];
  let hits = 0;
  techKeywords.forEach(k => { if (jd.includes(k)) hits++; });
  const base = 40 + Math.random() * 20;
  const bonus = Math.min(hits * 4, 30);
  return Math.min(Math.round(base + bonus), 95);
}

function generateKeywordCategories(jd) {
  const cats = [
    { name: 'Technical Skills', pct: 40 + Math.round(Math.random() * 45) },
    { name: 'Soft Skills', pct: 50 + Math.round(Math.random() * 40) },
    { name: 'Industry Keywords', pct: 30 + Math.round(Math.random() * 50) },
    { name: 'Action Verbs', pct: 55 + Math.round(Math.random() * 35) },
    { name: 'Experience Match', pct: 35 + Math.round(Math.random() * 45) },
  ];
  return cats;
}

function generateMissingKeywords(jd) {
  const allKeywords = ['Cross-functional', 'Stakeholder Management', 'CI/CD', 'Data-driven', 'Scalable', 'Mentorship', 'KPI', 'Revenue Growth', 'Sprint Planning', 'A/B Testing', 'Cloud Architecture', 'Agile', 'REST API', 'Microservices', 'DevOps'];
  // Pick 5-8 random ones
  const shuffled = allKeywords.sort(() => Math.random() - 0.5);
  return shuffled.slice(0, 5 + Math.floor(Math.random() * 3));
}

function generateTips(score) {
  const allTips = [
    'Add a professional summary section tailored to this specific role — ATS bots look for it first.',
    'Quantify your achievements with numbers (e.g., "Increased sales by 30%") to boost impact scoring.',
    'Mirror the exact job title from the posting in your resume header for direct keyword matching.',
    'Replace generic verbs like "helped" and "worked on" with power verbs like "orchestrated" and "spearheaded."',
    'Include a dedicated "Skills" section with keywords pulled directly from the job description.',
    'Remove graphics, tables, and multi-column layouts — most ATS parsers cannot read them correctly.',
    'Ensure your contact information is in plain text, not embedded in a header or footer element.',
    'Use standard section headings like "Experience," "Education," and "Skills" for maximum ATS compatibility.',
    'Tailor your bullet points to address the top 3 requirements listed in the job description.',
    'Save your resume as a .docx file — some older ATS systems struggle with PDF parsing.',
  ];
  const count = score >= 80 ? 4 : score >= 60 ? 6 : 8;
  return allTips.sort(() => Math.random() - 0.5).slice(0, count);
}

// ===== RESET =====
resetBtn.addEventListener('click', () => {
  resultsContent.style.display = 'none';
  resultsEmpty.style.display = '';
  scoreRingProgress.style.strokeDashoffset = 440;
  uploadedFile = null;
  resumeFileInput.value = '';
  uploadContent.style.display = '';
  uploadSuccess.style.display = 'none';
  jobDescription.value = '';
  charCount.textContent = '0 characters';
  analyzeBtn.disabled = true;
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ===== DOWNLOAD REPORT (simulated) =====
downloadReport.addEventListener('click', () => {
  const score = scoreNumber.textContent;
  const verdict = scoreVerdict.textContent;
  const missingEls = document.querySelectorAll('.missing-keyword');
  const tipsEls = document.querySelectorAll('.tips-list li');

  let report = `CAREERSHIELD AI — ATS COMPATIBILITY REPORT\n${'='.repeat(50)}\n\n`;
  report += `File: ${fileName.textContent}\n`;
  report += `Date: ${new Date().toLocaleDateString()}\n\n`;
  report += `ATS SCORE: ${score}/100 — ${verdict}\n\n`;
  report += `MISSING KEYWORDS:\n`;
  missingEls.forEach(el => { report += `  • ${el.textContent}\n`; });
  report += `\nOPTIMIZATION TIPS:\n`;
  tipsEls.forEach((el, i) => { report += `  ${i + 1}. ${el.textContent}\n`; });
  report += `\n${'='.repeat(50)}\nGenerated by CareerShield AI — careershield.ai\n`;

  const blob = new Blob([report], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `ATS_Report_${Date.now()}.txt`;
  a.click();
  URL.revokeObjectURL(url);
});

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import API_BASE from '../config/api';

const ResumeScanner = () => {
  const [file, setFile] = useState(null);
  const [jd, setJd] = useState('');
  const [status, setStatus] = useState('idle'); // idle, loading, results
  const [loadingStep, setLoadingStep] = useState(0);
  const [score, setScore] = useState(0);
  const [analysisData, setAnalysisData] = useState(null);
  const [error, setError] = useState(null);

  const { token } = useAuth();

  const handleFileDrop = (e) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer?.files[0] || e.target.files[0];
    if (droppedFile) {
      const ext = droppedFile.name.split('.').pop().toLowerCase();
      if (['pdf', 'doc', 'docx', 'txt'].includes(ext)) {
        setFile(droppedFile);
        setError(null);
      } else {
        setError('Only PDF, DOC, DOCX, and TXT files are allowed');
      }
    }
  };

  const handleAnalyze = async () => {
    if (!file) {
      setError('Please upload a resume first');
      return;
    }
    if (jd.trim().length < 20) {
      setError('Job description must be at least 20 characters long');
      return;
    }

    setStatus('loading');
    setError(null);
    setLoadingStep(0);

    const steps = [
      'Uploading document safely...',
      'Parsing resume structure...',
      'Extracting skills & context...',
      'Matching against job requirements...',
      'Formulating ATS score & improvements...'
    ];

    let currentStep = 0;
    const interval = setInterval(() => {
      currentStep++;
      if (currentStep < steps.length) {
        setLoadingStep(currentStep);
      }
    }, 1000);

    const formData = new FormData();
    formData.append('resume', file);
    formData.append('jobDescription', jd);

    try {
      const response = await fetch(`${API_BASE}/api/analyze-resume`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      });

      clearInterval(interval);

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.error || 'Failed to scan resume. Please try again.');
      }

      const data = await response.json();
      setAnalysisData(data);
      setStatus('results');
      animateScore(data.score);
    } catch (err) {
      clearInterval(interval);
      console.error(err);
      setError(err.message);
      setStatus('idle');
    }
  };

  const animateScore = (targetScore) => {
    let current = 0;
    const timer = setInterval(() => {
      current += 2;
      if (current >= targetScore) {
        setScore(targetScore);
        clearInterval(timer);
      } else {
        setScore(current);
      }
    }, 15);
  };

  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    in: { opacity: 1, y: 0, transition: { duration: 0.6 } },
    out: { opacity: 0, y: -20, transition: { duration: 0.6 } }
  };

  return (
    <motion.div 
      initial="initial" animate="in" exit="out" variants={pageVariants}
      className="pt-24 pb-20 min-h-screen bg-gray-950 text-gray-200"
    >
      <div className="container mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          className="text-center mb-12"
        >
          <div className="text-emerald-400 font-semibold uppercase tracking-wider mb-2 text-sm">AI Resume & ATS Optimizer</div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Beat the Bots.<br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400">Land the Interview.</span></h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">Upload your resume and paste a job description — our AI will score your ATS compatibility, find missing keywords, and give you an actionable optimization plan in seconds.</p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Inputs */}
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }} className="space-y-6">
            <div className="bg-gray-800/40 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-6 shadow-xl">
              <div className="flex items-center gap-3 mb-4">
                <span className="material-symbols-rounded text-emerald-400 text-2xl">description</span>
                <h3 className="text-xl font-bold text-white">Upload Your Resume</h3>
              </div>
              
              <AnimatePresence mode="wait">
                {!file ? (
                  <motion.div 
                    key="upload"
                    initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
                    whileHover={{ scale: 1.01, borderColor: "#10b981", backgroundColor: "rgba(16, 185, 129, 0.03)" }}
                    className="border-2 border-dashed border-gray-700 bg-gray-900/40 rounded-xl p-8 text-center cursor-pointer transition-all duration-200"
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={handleFileDrop}
                    onClick={() => document.getElementById('file-upload').click()}
                  >
                    <motion.span whileHover={{ y: -3 }} className="material-symbols-rounded text-4xl text-gray-500 mb-3 block">upload_file</motion.span>
                    <p className="text-white font-medium mb-1">Drag & drop your resume here</p>
                    <p className="text-gray-400 text-sm mb-3">or click to browse</p>
                    <p className="text-gray-500 text-xs font-medium">PDF, DOCX, DOC, TXT — Max 5MB</p>
                    <input type="file" id="file-upload" className="hidden" accept=".pdf,.doc,.docx,.txt" onChange={handleFileDrop} />
                  </motion.div>
                ) : (
                  <motion.div 
                    key="file"
                    initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
                    className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-4 flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <span className="material-symbols-rounded text-emerald-400 text-2xl flex-shrink-0 animate-bounce">description</span>
                      <div className="min-w-0">
                        <p className="text-white font-medium truncate pr-4">{file.name}</p>
                        <p className="text-gray-400 text-xs">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                      </div>
                    </div>
                    <motion.button 
                      whileHover={{ scale: 1.15, color: "#f87171" }} 
                      onClick={() => { setFile(null); setError(null); }} 
                      className="text-gray-400 transition-colors cursor-pointer"
                    >
                      <span className="material-symbols-rounded text-lg">close</span>
                    </motion.button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="bg-gray-800/40 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-6 shadow-xl">
              <div className="flex items-center gap-3 mb-4">
                <span className="material-symbols-rounded text-emerald-400 text-2xl">work</span>
                <h3 className="text-xl font-bold text-white">Paste Job Description</h3>
              </div>
              <textarea 
                className="w-full bg-gray-900/60 border border-gray-700 rounded-xl p-4 text-white focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/50 min-h-[200px] transition-all text-sm leading-relaxed"
                placeholder="Paste the full job description here to get a tailored ATS match score and keyword suggestions..."
                value={jd}
                onChange={(e) => setJd(e.target.value)}
              ></textarea>
              <div className="text-right text-xs text-gray-500 mt-2">{jd.length} characters (min 20)</div>
            </div>

            {error && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }} 
                animate={{ opacity: 1, y: 0 }}
                className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-xl text-sm text-center font-medium"
              >
                {error}
              </motion.div>
            )}

            <motion.button 
              whileHover={file && jd.trim().length >= 20 && status !== 'loading' ? { scale: 1.02, boxShadow: "0 0 25px rgba(16,185,129,0.4)" } : {}}
              whileTap={file && jd.trim().length >= 20 && status !== 'loading' ? { scale: 0.98 } : {}}
              className={`w-full py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition-all cursor-pointer ${file && jd.trim().length >= 20 && status !== 'loading' ? 'bg-emerald-500 text-white shadow-[0_0_15px_rgba(16,185,129,0.2)]' : 'bg-gray-800 text-gray-500 cursor-not-allowed shadow-none'}`}
              disabled={!file || jd.trim().length < 20 || status === 'loading'}
              onClick={handleAnalyze}
            >
              <span className="material-symbols-rounded">psychology</span>
              Analyze My Resume
            </motion.button>
          </motion.div>

          {/* Results Area */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }} 
            animate={{ opacity: 1, x: 0 }} 
            transition={{ delay: 0.6 }} 
            className="bg-gray-800/40 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-8 flex flex-col min-h-[500px] shadow-xl"
          >
            <AnimatePresence mode="wait">
              {status === 'idle' && (
                <motion.div 
                  key="idle"
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, y: -20 }}
                  className="flex-1 flex flex-col items-center justify-center text-center"
                >
                  <motion.span 
                    animate={{ y: [0, -10, 0] }} 
                    transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }} 
                    className="material-symbols-rounded text-6xl text-emerald-500/30 mb-5 select-none"
                  >
                    analytics
                  </motion.span>
                  <h3 className="text-xl font-bold text-white mb-2">Your ATS Report Will Appear Here</h3>
                  <p className="text-gray-400 max-w-sm text-sm leading-relaxed">Upload a resume and paste a job description, then click "Analyze" to get your detailed ATS compatibility report.</p>
                </motion.div>
              )}

              {status === 'loading' && (
                <motion.div 
                  key="loading"
                  initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }}
                  className="flex-1 flex flex-col items-center justify-center text-center"
                >
                  <div className="w-16 h-16 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mb-6"></div>
                  <h3 className="text-xl font-bold text-white mb-2">Analyzing Your Resume...</h3>
                  <motion.p 
                    key={loadingStep}
                    initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                    className="text-emerald-400 mb-6 text-sm font-medium"
                  >
                    {[
                      'Uploading document safely...',
                      'Parsing resume structure...',
                      'Extracting skills & context...',
                      'Matching against job requirements...',
                      'Formulating ATS score & improvements...'
                    ][loadingStep]}
                  </motion.p>
                  <div className="w-full max-w-xs bg-gray-800 rounded-full h-2 overflow-hidden border border-gray-700/50">
                    <motion.div 
                      className="bg-emerald-500 h-full" 
                      initial={{ width: 0 }}
                      animate={{ width: `${(loadingStep + 1) * 20}%` }}
                      transition={{ duration: 0.5 }}
                    ></motion.div>
                  </div>
                </motion.div>
              )}

              {status === 'results' && analysisData && (
                <motion.div 
                  key="results"
                  initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
                  className="space-y-6"
                >
                  <div className="flex flex-col items-center mb-4">
                    <div className="relative w-48 h-48 mb-4">
                      <svg className="w-full h-full transform -rotate-90" viewBox="0 0 160 160">
                        <circle cx="80" cy="80" r="70" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="10"/>
                        <motion.circle 
                          cx="80" cy="80" r="70" fill="none" stroke="#10b981" strokeWidth="10" strokeLinecap="round" 
                          strokeDasharray="440" 
                          initial={{ strokeDashoffset: 440 }}
                          animate={{ strokeDashoffset: 440 - (440 * score) / 100 }} 
                          transition={{ duration: 1.5, ease: "easeOut" }}
                        />
                      </svg>
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="text-5xl font-black text-white">{score}</span>
                        <span className="text-xs font-semibold text-gray-500 uppercase tracking-widest mt-1">ATS Score</span>
                      </div>
                    </div>
                    <motion.div 
                      initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.8, type: "spring" }}
                      className="px-4 py-1.5 rounded-full bg-emerald-500/10 text-emerald-400 font-semibold border border-emerald-500/20 text-sm tracking-wide shadow-[0_0_15px_rgba(16,185,129,0.05)]"
                    >
                      {analysisData.verdict}
                    </motion.div>
                  </div>

                  <div className="space-y-5">
                    {/* Category Breakdown */}
                    <motion.div 
                      initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }} 
                      className="bg-gray-900/40 border border-gray-700/30 rounded-xl p-5 shadow-inner"
                    >
                      <h4 className="font-bold text-white mb-4 flex items-center gap-2 text-sm uppercase tracking-wider">
                        <span className="material-symbols-rounded text-emerald-400 text-lg">bar_chart</span> 
                        Match Metrics Breakdown
                      </h4>
                      <div className="space-y-4">
                        {analysisData.categories.map((cat, idx) => {
                          const getProgressColor = (pct) => {
                            if (pct >= 85) return 'bg-emerald-500';
                            if (pct >= 65) return 'bg-teal-500';
                            return 'bg-blue-500';
                          };
                          
                          return (
                            <div key={cat.name}>
                              <div className="flex justify-between text-xs mb-1.5">
                                <span className="text-gray-400 font-semibold">{cat.name}</span>
                                <span className="text-white font-bold">{cat.pct}%</span>
                              </div>
                              <div className="h-2 bg-gray-800 rounded-full overflow-hidden border border-gray-700/20">
                                <motion.div 
                                  initial={{ width: 0 }} 
                                  animate={{ width: `${cat.pct}%` }} 
                                  transition={{ duration: 1.2, delay: 0.4 + idx * 0.1, ease: "easeOut" }} 
                                  className={`h-full ${getProgressColor(cat.pct)}`}
                                ></motion.div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </motion.div>

                    {/* Missing Keywords */}
                    <motion.div 
                      initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 }} 
                      className="bg-gray-900/40 border border-gray-700/30 rounded-xl p-5 shadow-inner"
                    >
                      <h4 className="font-bold text-white mb-4 flex items-center gap-2 text-sm uppercase tracking-wider">
                        <span className="material-symbols-rounded text-red-400 text-lg">warning</span> 
                        Missing Target Keywords
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {analysisData.missing.map((k, i) => (
                          <motion.span 
                            initial={{ opacity: 0, scale: 0.8 }} 
                            animate={{ opacity: 1, scale: 1 }} 
                            transition={{ delay: 0.6 + i * 0.08 }}
                            key={k} 
                            className="px-3.5 py-1.5 bg-red-500/10 text-red-400 border border-red-500/20 rounded-full text-xs font-semibold shadow-[0_0_10px_rgba(239,68,68,0.02)] cursor-default"
                          >
                            {k}
                          </motion.span>
                        ))}
                      </div>
                    </motion.div>

                    {/* Actionable Tips */}
                    <motion.div 
                      initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.7 }} 
                      className="bg-gray-900/40 border border-gray-700/30 rounded-xl p-5 shadow-inner"
                    >
                      <h4 className="font-bold text-white mb-4 flex items-center gap-2 text-sm uppercase tracking-wider">
                        <span className="material-symbols-rounded text-emerald-400 text-lg">tips_and_updates</span> 
                        Optimization Checklist
                      </h4>
                      <ul className="space-y-3">
                        {analysisData.tips.map((tip, idx) => (
                          <motion.li 
                            initial={{ opacity: 0, y: 10 }} 
                            animate={{ opacity: 1, y: 0 }} 
                            transition={{ delay: 0.8 + idx * 0.08 }}
                            key={idx} 
                            className="flex items-start gap-2.5 text-sm text-gray-300"
                          >
                            <span className="material-symbols-rounded text-emerald-400 text-base mt-0.5 select-none">check_circle</span>
                            <span className="leading-relaxed">{tip}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </motion.div>

                    {/* Reset Button */}
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1 }} className="flex gap-4 mt-6">
                      <motion.button 
                        whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} 
                        className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white py-3 rounded-lg font-semibold shadow-[0_0_15px_rgba(16,185,129,0.3)] transition-all cursor-pointer text-sm"
                      >
                        Download PDF Report
                      </motion.button>
                      <motion.button 
                        whileHover={{ scale: 1.02, backgroundColor: "#374151" }} whileTap={{ scale: 0.98 }}
                        className="flex-1 bg-gray-800 text-white py-3 rounded-lg font-semibold transition-all cursor-pointer text-sm"
                        onClick={() => { setStatus('idle'); setFile(null); setJd(''); setScore(0); setAnalysisData(null); setError(null); }}
                      >
                        Analyze Another
                      </motion.button>
                    </motion.div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default ResumeScanner;

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ResumeScanner = () => {
  const [file, setFile] = useState(null);
  const [jd, setJd] = useState('');
  const [status, setStatus] = useState('idle'); // idle, loading, results
  const [loadingStep, setLoadingStep] = useState(0);
  const [score, setScore] = useState(0);

  const handleFileDrop = (e) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer?.files[0] || e.target.files[0];
    if (droppedFile && /\.(pdf|doc|docx)$/i.test(droppedFile.name)) {
      setFile(droppedFile);
    }
  };

  const handleAnalyze = () => {
    setStatus('loading');
    setLoadingStep(0);
    
    const steps = ['Parsing document structure...', 'Extracting keywords...', 'Comparing against Job Description...', 'Calculating ATS Score...'];
    
    let currentStep = 0;
    const interval = setInterval(() => {
      currentStep++;
      if (currentStep >= steps.length) {
        clearInterval(interval);
        setStatus('results');
        animateScore(82);
      } else {
        setLoadingStep(currentStep);
      }
    }, 800);
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
    }, 20);
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
          <div className="text-blue-400 font-semibold uppercase tracking-wider mb-2 text-sm">AI Resume & ATS Optimizer</div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Beat the Bots.<br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">Land the Interview.</span></h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">Upload your resume and paste a job description — our AI will score your ATS compatibility, find missing keywords, and give you an actionable optimization plan in seconds.</p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Inputs */}
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }} className="space-y-6">
            <div className="glass p-6">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-2xl">📄</span>
                <h3 className="text-xl font-bold text-white">Upload Your Resume</h3>
              </div>
              
              <AnimatePresence mode="wait">
                {!file ? (
                  <motion.div 
                    key="upload"
                    initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
                    whileHover={{ scale: 1.02, borderColor: "#3b82f6", backgroundColor: "rgba(59, 130, 246, 0.05)" }}
                    className="border-2 border-dashed border-gray-600 bg-gray-800/50 rounded-xl p-8 text-center cursor-pointer transition-colors"
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={handleFileDrop}
                    onClick={() => document.getElementById('file-upload').click()}
                  >
                    <motion.div whileHover={{ y: -5 }} className="text-4xl mb-3 opacity-50">📤</motion.div>
                    <p className="text-white font-medium mb-1">Drag & drop your resume here</p>
                    <p className="text-gray-400 text-sm mb-3">or click to browse</p>
                    <p className="text-gray-500 text-xs">PDF, DOCX, DOC — Max 5MB</p>
                    <input type="file" id="file-upload" className="hidden" accept=".pdf,.doc,.docx" onChange={handleFileDrop} />
                  </motion.div>
                ) : (
                  <motion.div 
                    key="file"
                    initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
                    className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-4 flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <motion.span animate={{ rotate: [0, 10, -10, 0] }} transition={{ duration: 0.5 }} className="text-2xl">📄</motion.span>
                      <div>
                        <p className="text-white font-medium truncate max-w-[200px]">{file.name}</p>
                        <p className="text-gray-400 text-xs">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                      </div>
                    </div>
                    <motion.button whileHover={{ scale: 1.2, color: "#fff" }} onClick={() => setFile(null)} className="text-gray-400">✕</motion.button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="glass p-6">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-2xl">💼</span>
                <h3 className="text-xl font-bold text-white">Paste Job Description</h3>
              </div>
              <textarea 
                className="w-full bg-gray-800 border border-gray-700 rounded-xl p-4 text-white focus:outline-none focus:border-blue-500 min-h-[200px] transition-colors"
                placeholder="Paste the full job description here to get a tailored ATS match score and keyword suggestions..."
                value={jd}
                onChange={(e) => setJd(e.target.value)}
              ></textarea>
              <div className="text-right text-xs text-gray-500 mt-2">{jd.length} characters</div>
            </div>

            <motion.button 
              whileHover={file && jd.length > 50 && status !== 'loading' ? { scale: 1.02, boxShadow: "0 0 20px rgba(37,99,235,0.4)" } : {}}
              whileTap={file && jd.length > 50 && status !== 'loading' ? { scale: 0.98 } : {}}
              className={`w-full py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition-colors ${file && jd.length > 50 ? 'bg-blue-600 text-white' : 'bg-gray-800 text-gray-500 cursor-not-allowed'}`}
              disabled={!file || jd.length <= 50 || status === 'loading'}
              onClick={handleAnalyze}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
              Analyze My Resume
            </motion.button>
          </motion.div>

          {/* Results Area */}
          <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.6 }} className="glass p-8 flex flex-col min-h-[500px]">
            <AnimatePresence mode="wait">
              {status === 'idle' && (
                <motion.div 
                  key="idle"
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, y: -20 }}
                  className="flex-1 flex flex-col items-center justify-center text-center"
                >
                  <motion.div animate={{ y: [0, -10, 0] }} transition={{ repeat: Infinity, duration: 4 }} className="text-6xl mb-6 opacity-30">📊</motion.div>
                  <h3 className="text-xl font-bold text-white mb-2">Your ATS Report Will Appear Here</h3>
                  <p className="text-gray-400 max-w-sm">Upload a resume and paste a job description, then click "Analyze" to get your detailed ATS compatibility report.</p>
                </motion.div>
              )}

              {status === 'loading' && (
                <motion.div 
                  key="loading"
                  initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }}
                  className="flex-1 flex flex-col items-center justify-center text-center"
                >
                  <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-6"></div>
                  <h3 className="text-xl font-bold text-white mb-2">Analyzing Your Resume...</h3>
                  <motion.p 
                    key={loadingStep}
                    initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                    className="text-blue-400 mb-6"
                  >
                    {['Parsing document structure...', 'Extracting keywords...', 'Comparing against Job Description...', 'Calculating ATS Score...'][loadingStep]}
                  </motion.p>
                  <div className="w-full max-w-xs bg-gray-800 rounded-full h-2 overflow-hidden">
                    <motion.div 
                      className="bg-blue-500 h-full" 
                      initial={{ width: 0 }}
                      animate={{ width: `${(loadingStep + 1) * 25}%` }}
                      transition={{ duration: 0.5 }}
                    ></motion.div>
                  </div>
                </motion.div>
              )}

              {status === 'results' && (
                <motion.div 
                  key="results"
                  initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
                >
                  <div className="flex flex-col items-center mb-8">
                    <div className="relative w-48 h-48 mb-4">
                      <svg className="w-full h-full transform -rotate-90" viewBox="0 0 160 160">
                        <circle cx="80" cy="80" r="70" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="10"/>
                        <motion.circle 
                          cx="80" cy="80" r="70" fill="none" stroke="#3b82f6" strokeWidth="10" strokeLinecap="round" 
                          strokeDasharray="440" 
                          initial={{ strokeDashoffset: 440 }}
                          animate={{ strokeDashoffset: 440 - (440 * score) / 100 }} 
                          transition={{ duration: 1.5, ease: "easeOut" }}
                        />
                      </svg>
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="text-5xl font-black text-white">{score}</span>
                        <span className="text-sm font-medium text-gray-400 uppercase tracking-widest mt-1">ATS Score</span>
                      </div>
                    </div>
                    <motion.div 
                      initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 1, type: "spring" }}
                      className="px-4 py-1.5 rounded-full bg-emerald-500/20 text-emerald-400 font-medium border border-emerald-500/30"
                    >
                      Good Match — Needs Minor Tweaks
                    </motion.div>
                  </div>

                  <div className="space-y-6">
                    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }} className="bg-gray-800/50 rounded-xl p-5 border border-gray-700">
                      <h4 className="font-bold text-white mb-4 flex items-center gap-2"><span>🔑</span> Keyword Match</h4>
                      <div className="space-y-3">
                        <div>
                          <div className="flex justify-between text-sm mb-1"><span className="text-gray-300">Hard Skills</span><span className="text-white font-medium">85%</span></div>
                          <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                            <motion.div initial={{ width: 0 }} animate={{ width: '85%' }} transition={{ duration: 1, delay: 0.5 }} className="h-full bg-emerald-500"></motion.div>
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between text-sm mb-1"><span className="text-gray-300">Soft Skills</span><span className="text-white font-medium">60%</span></div>
                          <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                            <motion.div initial={{ width: 0 }} animate={{ width: '60%' }} transition={{ duration: 1, delay: 0.7 }} className="h-full bg-yellow-500"></motion.div>
                          </div>
                        </div>
                      </div>
                    </motion.div>

                    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.6 }} className="bg-gray-800/50 rounded-xl p-5 border border-gray-700">
                      <h4 className="font-bold text-white mb-4 flex items-center gap-2"><span>⚠️</span> Missing Keywords</h4>
                      <div className="flex flex-wrap gap-2">
                        {['React.js', 'Agile Methodologies', 'REST APIs', 'Cloud Computing'].map((k, i) => (
                          <motion.span 
                            initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.8 + i * 0.1 }}
                            key={k} className="px-3 py-1 bg-red-500/10 text-red-400 border border-red-500/20 rounded-full text-sm"
                          >
                            {k}
                          </motion.span>
                        ))}
                      </div>
                    </motion.div>

                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1 }} className="flex gap-4 mt-8">
                      <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-medium shadow-[0_0_15px_rgba(37,99,235,0.3)]">
                        Download Full Report
                      </motion.button>
                      <motion.button 
                        whileHover={{ scale: 1.05, backgroundColor: "#374151" }} whileTap={{ scale: 0.95 }}
                        className="flex-1 bg-gray-800 text-white py-3 rounded-lg font-medium"
                        onClick={() => { setStatus('idle'); setFile(null); setJd(''); setScore(0); }}
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

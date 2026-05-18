import React from 'react';
import { motion } from 'framer-motion';

const Features = () => {
  const pillarVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.95, y: 30 },
    visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.6 } },
    hover: { 
      y: -8, 
      scale: 1.02,
      boxShadow: "0 20px 40px -10px rgba(16, 185, 129, 0.15)",
      borderColor: "rgba(16, 185, 129, 0.5)",
      transition: { type: "spring", stiffness: 400, damping: 25 }
    }
  };

  const swordCardHover = {
    y: -8, 
    scale: 1.02,
    boxShadow: "0 20px 40px -10px rgba(59, 130, 246, 0.15)",
    borderColor: "rgba(59, 130, 246, 0.5)",
    transition: { type: "spring", stiffness: 400, damping: 25 }
  };

  return (
    <section id="features" className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-6">
        
        {/* Pillar 1 */}
        <div id="scam-detector" className="mb-32">
          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={pillarVariants}
            className="flex items-center gap-6 mb-12"
          >
            <motion.div 
              whileHover={{ rotate: 15, scale: 1.1 }}
              className="w-16 h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-3xl shadow-[0_0_30px_rgba(16,185,129,0.2)]"
            >
              🛡️
            </motion.div>
            <div>
              <div className="text-emerald-500 font-semibold uppercase tracking-wider mb-1 text-sm">Pillar 1</div>
              <h2 className="text-3xl md:text-4xl font-bold">The Shield — <span className="gradient-text">Security</span></h2>
              <p className="text-gray-400 mt-2">Defend yourself against the scams, fakes, and frauds lurking in every inbox and job board.</p>
            </div>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            <motion.div 
              initial="hidden" whileInView="visible" whileHover="hover" viewport={{ once: true, margin: "-50px" }} variants={cardVariants}
              className="glass p-8 transition-colors duration-300"
            >
              <div className="text-4xl mb-6">🔍</div>
              <h3 className="text-2xl font-bold mb-4 text-white">Fake Job &amp; Internship Detector</h3>
              <p className="text-gray-400 mb-6 leading-relaxed">Paste any job link or description and our AI instantly cross-references company registration databases, URL history, domain age, and linguistic red-flag patterns. We'll tell you if that "dream internship" is actually a data-harvesting scam — before you hand over your PAN card.</p>
              <ul className="space-y-3">
                {['Company registration verification', 'URL & domain reputation analysis', 'Language pattern red-flag scoring', 'Ghost job probability rating'].map((item, i) => (
                  <motion.li key={i} whileHover={{ x: 5 }} className="flex items-center gap-3 text-gray-300 transition-transform">
                    <svg className="w-5 h-5 text-emerald-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                    {item}
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            <motion.div 
              initial="hidden" whileInView="visible" whileHover="hover" viewport={{ once: true, margin: "-50px" }} variants={cardVariants} transition={{ delay: 0.2 }}
              className="glass p-8 transition-colors duration-300"
            >
              <div className="text-4xl mb-6">📩</div>
              <h3 className="text-2xl font-bold mb-4 text-white">Spam &amp; Fake Email Scanner</h3>
              <p className="text-gray-400 mb-6 leading-relaxed">Got a suspicious "You're hired!" email from a recruiter you've never heard of? Paste or forward it to CareerShield AI. We'll dissect the headers, scan for malicious links, verify sender domains, and expose phishing attempts — so you never click on a trap again.</p>
              <ul className="space-y-3">
                {['Email header & sender verification', 'Malicious link detection', 'Fake offer letter identification', 'Phishing risk score'].map((item, i) => (
                  <motion.li key={i} whileHover={{ x: 5 }} className="flex items-center gap-3 text-gray-300 transition-transform">
                    <svg className="w-5 h-5 text-emerald-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                    {item}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>

        {/* Pillar 2 */}
        <div id="resume-scanner">
          <motion.div 
            initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex items-center gap-6 mb-12 flex-row-reverse text-right"
          >
            <motion.div 
              whileHover={{ rotate: -15, scale: 1.1 }}
              className="w-16 h-16 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-3xl shadow-[0_0_30px_rgba(59,130,246,0.2)]"
            >
              ⚔️
            </motion.div>
            <div>
              <div className="text-blue-400 font-semibold uppercase tracking-wider mb-1 text-sm">Pillar 2</div>
              <h2 className="text-3xl md:text-4xl font-bold">The Sword — <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">Growth</span></h2>
              <p className="text-gray-400 mt-2">Don't just survive the job market — conquer it with AI-powered career tools built for your generation.</p>
            </div>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            <motion.a 
              href="/resume-scanner.html"
              initial="hidden" whileInView="visible" whileHover={swordCardHover} whileTap={{ scale: 0.98 }} viewport={{ once: true, margin: "-50px" }} variants={cardVariants}
              className="block glass p-8 transition-colors duration-300 group"
            >
              <div className="text-4xl mb-6">📄</div>
              <h3 className="text-2xl font-bold mb-4 text-white">AI Resume &amp; ATS Optimizer</h3>
              <p className="text-gray-400 mb-6 leading-relaxed">Upload your resume and a target job description. CareerShield AI will score your ATS compatibility, highlight missing keywords, restructure bullet points for impact, and serve up a tailored version that gets past the bots and into human hands. Beat the algorithm. Get the interview.</p>
              <ul className="space-y-3 mb-8">
                {['Precise ATS match score (0-100)', 'Missing keyword suggestions', 'Bullet point impact rewriting', 'Tailored resume generation'].map((item, i) => (
                  <motion.li key={i} whileHover={{ x: 5 }} className="flex items-center gap-3 text-gray-300 transition-transform">
                    <svg className="w-5 h-5 text-blue-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                    {item}
                  </motion.li>
                ))}
              </ul>
              <span className="inline-flex items-center gap-2 text-blue-400 font-medium group-hover:text-blue-300 transition-colors">
                Try It Now <motion.svg className="w-4 h-4" initial={{ x: 0 }} whileHover={{ x: 5 }} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></motion.svg>
              </span>
            </motion.a>

            <motion.div 
              initial="hidden" whileInView="visible" whileHover={swordCardHover} viewport={{ once: true, margin: "-50px" }} variants={cardVariants} transition={{ delay: 0.2 }}
              className="glass p-8 transition-colors duration-300"
            >
              <div className="text-4xl mb-6">🎙️</div>
              <h3 className="text-2xl font-bold mb-4 text-white">AI Career Coach &amp; Mock Interviews</h3>
              <p className="text-gray-400 mb-6 leading-relaxed">Our interactive AI coach maps your ideal career path based on your skills, interests, and market demand. Then it drops you into realistic mock interviews — audio or text — with real-time feedback on your answers, body language cues, and confidence level. Walk into every interview battle-tested.</p>
              <ul className="space-y-3">
                {['Personalized career path mapping', 'Audio & text mock interviews', 'Real-time answer feedback', 'Confidence & clarity scoring'].map((item, i) => (
                  <motion.li key={i} whileHover={{ x: 5 }} className="flex items-center gap-3 text-gray-300 transition-transform">
                    <svg className="w-5 h-5 text-blue-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                    {item}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Features;

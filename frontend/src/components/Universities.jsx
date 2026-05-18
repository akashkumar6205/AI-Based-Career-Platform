import React from 'react';
import { motion } from 'framer-motion';

const Universities = () => {
  const listVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: i => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5
      }
    })
  };

  return (
    <section id="universities" className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="glass p-10 md:p-16 flex flex-col lg:flex-row items-center gap-16 relative z-10 overflow-hidden"
        >
          {/* Subtle Background Glow */}
          <motion.div 
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.1, 0.2, 0.1]
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"
          ></motion.div>

          <div className="flex-1 relative z-10">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-emerald-500 font-semibold uppercase tracking-wider mb-2 text-sm"
            >
              For Universities &amp; Placement Cells
            </motion.div>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-3xl md:text-5xl font-bold mb-6"
            >
              Protect Your <span className="gradient-text">Entire Campus.</span>
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-gray-300 mb-4 text-lg"
            >
              Fraudulent recruiters don't just target individuals — they infiltrate campus placement drives, bulk-email student databases, and post fake opportunities on college job boards.
            </motion.p>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="text-gray-300 mb-8 text-lg"
            >
              CareerShield AI offers a dedicated <strong className="text-white">University Dashboard</strong> that lets placement officers:
            </motion.p>
            
            <ul className="space-y-4 mb-10">
              {['Screen every recruiter and job posting before it reaches students', 'Provide all students with free ATS resume optimization', 'Track placement readiness with AI-powered analytics', 'Integrate via API with existing campus portals'].map((item, i) => (
                <motion.li 
                  custom={i}
                  variants={listVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  key={i} 
                  className="flex items-start gap-3 text-gray-300"
                >
                  <svg className="w-6 h-6 text-emerald-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                  <span>{item}</span>
                </motion.li>
              ))}
            </ul>
            
            <motion.a 
              whileHover={{ scale: 1.05, boxShadow: "0 0 25px rgba(16, 185, 129, 0.5)" }}
              whileTap={{ scale: 0.95 }}
              href="#cta" 
              className="inline-block bg-emerald-500 text-white px-8 py-3 rounded-full font-bold text-lg transition-all shadow-[0_0_15px_rgba(16,185,129,0.3)]"
            >
              Partner With Us
            </motion.a>
          </div>

          <div className="flex-1 w-full relative z-10 flex flex-col items-center justify-center">
            <div className="relative w-64 h-64 md:w-80 md:h-80 flex items-center justify-center mb-8">
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 border border-emerald-500/20 rounded-full"
              ></motion.div>
              <motion.div 
                animate={{ rotate: -360 }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                className="absolute inset-4 border border-emerald-500/40 rounded-full"
              ></motion.div>
              <motion.div 
                animate={{ scale: [1, 1.05, 1], opacity: [0.6, 1, 0.6] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="absolute inset-8 border border-emerald-500/60 rounded-full"
              ></motion.div>
              <motion.div 
                whileHover={{ scale: 1.2, rotate: [0, -10, 10, 0] }}
                className="text-6xl z-10 cursor-default"
              >
                🏛️
              </motion.div>
            </div>
            
            <div className="flex flex-wrap justify-center gap-4">
              <motion.div 
                whileHover={{ y: -5, backgroundColor: "rgba(31, 41, 55, 1)" }}
                className="bg-gray-800 border border-gray-700 px-6 py-2 rounded-full font-medium text-emerald-400 shadow-lg cursor-default"
              >
                50+ Universities
              </motion.div>
              <motion.div 
                whileHover={{ y: -5, backgroundColor: "rgba(31, 41, 55, 1)" }}
                className="bg-gray-800 border border-gray-700 px-6 py-2 rounded-full font-medium text-emerald-400 shadow-lg cursor-default"
              >
                200K+ Students Protected
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Universities;

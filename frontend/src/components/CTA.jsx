import React from 'react';
import { motion } from 'framer-motion';

const CTA = () => {
  return (
    <section id="cta" className="py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-emerald-900/20"></div>
      <motion.div 
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.5, 0.8, 0.5]
        }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-emerald-500/10 rounded-full blur-[100px] pointer-events-none"
      ></motion.div>
      
      <div className="container mx-auto px-6 relative z-10 text-center max-w-4xl">
        <motion.h2 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-6xl font-bold mb-6"
        >
          Don't Let Scammers Derail Your Future.<br/>
          <span className="gradient-text">Step Into Your Career With Confidence.</span>
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto"
        >
          Join thousands of students who've already shielded their careers and landed real opportunities.
        </motion.p>
        <motion.a 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          whileHover={{ 
            scale: 1.05, 
            y: -5,
            boxShadow: "0 0 35px rgba(16, 185, 129, 0.6)"
          }}
          whileTap={{ scale: 0.95 }}
          href="#" 
          className="inline-block bg-emerald-500 text-white px-10 py-4 rounded-full font-bold text-lg shadow-[0_0_20px_rgba(16,185,129,0.4)] transition-colors"
        >
          Get Started for Free Today
        </motion.a>
      </div>
    </section>
  );
};

export default CTA;

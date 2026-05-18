import React from 'react';
import { motion } from 'framer-motion';

const Pricing = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { type: "spring", stiffness: 100, damping: 20 }
    },
    hover: {
      y: -15,
      scale: 1.02,
      boxShadow: "0 25px 50px -12px rgba(16, 185, 129, 0.2)",
      transition: { type: "spring", stiffness: 400, damping: 25 }
    }
  };

  const featuredCardVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.95 },
    visible: { 
      opacity: 1, 
      y: -16, // md:-translate-y-4 equivalent
      scale: 1,
      transition: { type: "spring", stiffness: 100, damping: 20 }
    },
    hover: {
      y: -30,
      scale: 1.05,
      boxShadow: "0 35px 60px -15px rgba(16, 185, 129, 0.3)",
      transition: { type: "spring", stiffness: 400, damping: 25 }
    }
  };

  return (
    <section id="pricing" className="py-24 bg-gray-900 overflow-hidden">
      <div className="container mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="text-emerald-500 font-semibold uppercase tracking-wider mb-2 text-sm">Pricing</div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Start Free. <span className="gradient-text">Scale When Ready.</span></h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">No credit card required. No hidden fees. Just career protection.</p>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto items-center"
        >
          {/* Starter */}
          <motion.div 
            variants={cardVariants}
            whileHover="hover"
            className="glass p-8 transition-colors duration-300"
          >
            <h3 className="text-xl font-medium text-gray-300 mb-2">Starter</h3>
            <div className="text-5xl font-bold text-white mb-6">₹0<span className="text-xl text-gray-500 font-medium">/mo</span></div>
            <ul className="space-y-4 mb-8">
              {['5 Resume Scans / month', '10 Job Link Scans / month', '3 Email Scans / month', 'Basic Career Path Suggestions'].map((f, i) => (
                <li key={i} className="flex items-center gap-3 text-gray-300">
                  <svg className="w-5 h-5 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                  {f}
                </li>
              ))}
            </ul>
            <motion.a 
              whileHover={{ backgroundColor: "rgba(31, 41, 55, 1)" }}
              whileTap={{ scale: 0.95 }}
              href="#" 
              className="block w-full text-center py-3 px-6 rounded-lg font-medium border border-gray-600 text-white transition-colors"
            >
              Get Started Free
            </motion.a>
          </motion.div>

          {/* Pro */}
          <motion.div 
            variants={featuredCardVariants}
            whileHover="hover"
            className="glass p-8 border-emerald-500/50 shadow-[0_0_30px_rgba(16,185,129,0.15)] relative"
          >
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-emerald-500 text-white px-4 py-1 rounded-full text-sm font-bold uppercase tracking-wide">Most Popular</div>
            <h3 className="text-xl font-medium text-emerald-400 mb-2">Pro Student</h3>
            <div className="text-5xl font-bold text-white mb-6">₹199<span className="text-xl text-gray-500 font-medium">/mo</span></div>
            <ul className="space-y-4 mb-8">
              {['Unlimited Resume Scans', 'Unlimited Job & Email Scans', 'AI Mock Interviews (10/mo)', 'ATS Keyword Optimization', 'Priority Support'].map((f, i) => (
                <li key={i} className="flex items-center gap-3 text-gray-300">
                  <svg className="w-5 h-5 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                  {f}
                </li>
              ))}
            </ul>
            <motion.a 
              whileHover={{ scale: 1.05, boxShadow: "0 0 25px rgba(16, 185, 129, 0.5)" }}
              whileTap={{ scale: 0.95 }}
              href="#" 
              className="block w-full text-center py-3 px-6 rounded-lg font-bold bg-emerald-500 text-white shadow-[0_0_15px_rgba(16,185,129,0.3)] transition-all"
            >
              Go Pro
            </motion.a>
          </motion.div>

          {/* Campus */}
          <motion.div 
            variants={cardVariants}
            whileHover="hover"
            className="glass p-8 transition-colors duration-300"
          >
            <h3 className="text-xl font-medium text-gray-300 mb-2">Campus</h3>
            <div className="text-5xl font-bold text-white mb-6 text-2xl mt-4">Custom</div>
            <ul className="space-y-4 mb-8">
              {['Unlimited Everything', 'University Dashboard', 'Bulk Student Onboarding', 'API Integration', 'Dedicated Account Manager'].map((f, i) => (
                <li key={i} className="flex items-center gap-3 text-gray-300">
                  <svg className="w-5 h-5 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                  {f}
                </li>
              ))}
            </ul>
            <motion.a 
              whileHover={{ backgroundColor: "rgba(31, 41, 55, 1)" }}
              whileTap={{ scale: 0.95 }}
              href="#" 
              className="block w-full text-center py-3 px-6 rounded-lg font-medium border border-gray-600 text-white transition-colors"
            >
              Contact Sales
            </motion.a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Pricing;

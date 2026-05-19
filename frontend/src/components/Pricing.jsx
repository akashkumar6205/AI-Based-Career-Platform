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
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Pricing Plans</h2>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="max-w-xl mx-auto glass p-10 text-center border-emerald-500/20 shadow-[0_0_40px_rgba(16,185,129,0.05)]"
        >
          <div className="text-4xl mb-4">🚀</div>
          <h3 className="text-2xl font-bold text-white mb-3">Coming Soon</h3>
          <p className="text-gray-400 leading-relaxed">
            We are working on bringing tailored, budget-friendly plans. Pricing features will be released in a future update.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Pricing;

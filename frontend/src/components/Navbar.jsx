import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${scrolled ? 'bg-gray-900/90 backdrop-blur-md shadow-lg py-3' : 'bg-transparent py-5'}`}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2 group">
          <motion.svg 
            whileHover={{ rotate: 180 }}
            transition={{ duration: 0.5 }}
            viewBox="0 0 32 32" width="32" height="32" className="transform"
          >
            <path d="M16 2L4 8v8c0 7.18 5.12 13.9 12 15.4C22.88 29.9 28 23.18 28 16V8L16 2z" fill="url(#shield-grad)" opacity="0.9"/>
            <path d="M14 17l-3-3 1.4-1.4L14 14.2l5.6-5.6L21 10l-7 7z" fill="#fff"/>
            <defs>
              <linearGradient id="shield-grad" x1="4" y1="2" x2="28" y2="32">
                <stop offset="0%" stopColor="#10b981"/>
                <stop offset="100%" stopColor="#34d399"/>
              </linearGradient>
            </defs>
          </motion.svg>
          <span className="text-xl font-bold tracking-tight text-white">CareerShield <span className="text-emerald-400">AI</span></span>
        </Link>

        {/* Desktop Nav */}
        <ul className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-300">
          <motion.li whileHover={{ y: -2 }}><Link to="/resume-scanner" className="hover:text-emerald-400 transition-colors">Resume Analysis</Link></motion.li>
          <motion.li whileHover={{ y: -2 }}><a href="#" className="hover:text-emerald-400 transition-colors">Career Roadmap</a></motion.li>
          <motion.li whileHover={{ y: -2 }}><a href="#" className="hover:text-emerald-400 transition-colors">Resources</a></motion.li>
          <motion.li whileHover={{ y: -2 }}><a href="#" className="hover:text-emerald-400 transition-colors">Placement Preparation</a></motion.li>
          <motion.li whileHover={{ y: -2 }}><a href="#" className="hover:text-emerald-400 transition-colors">Project Recommendation</a></motion.li>
        </ul>

        <motion.a 
          whileHover={{ scale: 1.05, boxShadow: "0 0 25px rgba(16, 185, 129, 0.5)" }}
          whileTap={{ scale: 0.95 }}
          href={isHome ? "#cta" : "/"} 
          className="hidden md:inline-flex bg-emerald-500 text-white px-6 py-2 rounded-full font-medium shadow-[0_0_15px_rgba(16,185,129,0.3)] transition-colors"
        >
          Protect My Career (Free)
        </motion.a>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden flex flex-col justify-center gap-1.5 w-8 h-8 z-50 relative focus:outline-none"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <span className={`block w-6 h-0.5 bg-white transition-transform duration-300 ${mobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
          <span className={`block w-6 h-0.5 bg-white transition-opacity duration-300 ${mobileMenuOpen ? 'opacity-0' : ''}`}></span>
          <span className={`block w-6 h-0.5 bg-white transition-transform duration-300 ${mobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
        </button>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, x: "100%" }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed inset-0 bg-gray-900 z-40 flex flex-col justify-center items-center gap-6"
            >
              <ul className="flex flex-col items-center gap-6 text-xl font-medium text-gray-300">
                <motion.li whileHover={{ scale: 1.1 }}><Link to="/resume-scanner" onClick={() => setMobileMenuOpen(false)}>Resume Analysis</Link></motion.li>
                <motion.li whileHover={{ scale: 1.1 }}><a href="#" onClick={() => setMobileMenuOpen(false)}>Career Roadmap</a></motion.li>
                <motion.li whileHover={{ scale: 1.1 }}><a href="#" onClick={() => setMobileMenuOpen(false)}>Resources</a></motion.li>
                <motion.li whileHover={{ scale: 1.1 }}><a href="#" onClick={() => setMobileMenuOpen(false)}>Placement Preparation</a></motion.li>
                <motion.li whileHover={{ scale: 1.1 }}><a href="#" onClick={() => setMobileMenuOpen(false)}>Project Recommendation</a></motion.li>
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};

export default Navbar;

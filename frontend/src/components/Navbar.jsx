import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { NavLink, useLocation } from 'react-router-dom';

const Navbar = ({ onOpenChat }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const handleLogoOrHomeClick = (e) => {
    if (location.pathname === '/') {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const getLinkClass = ({ isActive }) =>
    `px-3 py-2 rounded-lg transition-all block font-medium border ${isActive
      ? 'bg-emerald-500/15 text-emerald-400 border-emerald-500/20 shadow-[0_0_15px_rgba(16,185,129,0.1)]'
      : 'text-gray-300 hover:bg-emerald-500/10 hover:text-emerald-400 border-transparent'
    }`;

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
      <div className="container mx-auto px-4 md:px-6 flex justify-between items-center">
        <div className="flex items-center gap-2 group cursor-pointer" onClick={() => window.location.href = '/'}>
          <motion.svg
            whileHover={{ rotate: 180 }}
            transition={{ duration: 0.5 }}
            viewBox="0 0 32 32" width="32" height="32" className="transform"
          >
            <path d="M16 2L4 8v8c0 7.18 5.12 13.9 12 15.4C22.88 29.9 28 23.18 28 16V8L16 2z" fill="url(#shield-grad)" opacity="0.9" />
            <path d="M14 17l-3-3 1.4-1.4L14 14.2l5.6-5.6L21 10l-7 7z" fill="#fff" />
            <defs>
              <linearGradient id="shield-grad" x1="4" y1="2" x2="28" y2="32">
                <stop offset="0%" stopColor="#10b981" />
                <stop offset="100%" stopColor="#34d399" />
              </linearGradient>
            </defs>
          </motion.svg>
          <span className="text-xl font-bold tracking-tight text-white">CareerShield <span className="text-emerald-400">AI</span></span>
        </div>

        {/* Desktop Nav */}
        <ul className="hidden lg:flex items-center gap-2 text-sm font-medium">
          <motion.li whileHover={{ scale: 1.05 }}><NavLink to="/" onClick={handleLogoOrHomeClick} className={getLinkClass}>Home</NavLink></motion.li>
          <motion.li whileHover={{ scale: 1.05 }}><NavLink to="/resume-scanner" className={getLinkClass}>Resume Analysis</NavLink></motion.li>
          <motion.li whileHover={{ scale: 1.05 }}><NavLink to="/career-roadmap" className={getLinkClass}>Career Roadmap</NavLink></motion.li>
          <motion.li whileHover={{ scale: 1.05 }}><NavLink to="/placement-preparation" className={getLinkClass}>Placement Preparation</NavLink></motion.li>
          <motion.li whileHover={{ scale: 1.05 }}><NavLink to="/project-recommendation" className={getLinkClass}>Project</NavLink></motion.li>
          <motion.li whileHover={{ scale: 1.05 }}><NavLink to="/about" className={getLinkClass}>About</NavLink></motion.li>
        </ul>

        <div className="hidden lg:flex items-center gap-4">
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: "0 0 25px rgba(16, 185, 129, 0.5)" }}
            whileTap={{ scale: 0.95 }}
            onClick={onOpenChat}
            className="bg-emerald-500 text-white px-6 py-2 rounded-full font-medium shadow-[0_0_15px_rgba(16,185,129,0.3)] transition-colors cursor-pointer"
          >
            Contact Us
          </motion.button>
        </div>

        {/* Mobile Toggle */}
        <button
          className="lg:hidden flex flex-col justify-center gap-1.5 w-8 h-8 z-30 relative focus:outline-none"
          onClick={() => setMobileMenuOpen(true)}
        >
          <span className="block w-6 h-0.5 bg-white"></span>
          <span className="block w-6 h-0.5 bg-white"></span>
          <span className="block w-6 h-0.5 bg-white"></span>
        </button>

        {/* Mobile Sidebar */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <>
              {/* Overlay */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setMobileMenuOpen(false)}
                className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
              />

              {/* Sidebar */}
              <motion.div
                initial={{ opacity: 0, x: "100%" }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: "100%" }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                className="fixed top-0 right-0 h-[100dvh] w-full max-w-sm bg-gray-900 border-l border-gray-800 z-50 flex flex-col p-6 overflow-y-auto"
              >
                <div className="flex justify-between items-center mb-8">
                  <span className="text-xl font-bold tracking-tight text-white">CareerShield <span className="text-emerald-400">AI</span></span>
                  <button
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-800 text-gray-400 hover:text-white hover:bg-gray-700 transition-colors"
                  >
                    <span className="material-symbols-rounded">close</span>
                  </button>
                </div>

                <ul className="flex flex-col gap-3 text-base font-medium text-gray-300 w-full flex-grow">
                  <motion.li className="w-full" whileHover={{ scale: 1.02 }}><NavLink to="/" onClick={(e) => { setMobileMenuOpen(false); handleLogoOrHomeClick(e); }} className={getLinkClass}>Home</NavLink></motion.li>
                  <motion.li className="w-full" whileHover={{ scale: 1.02 }}><NavLink to="/resume-scanner" onClick={() => setMobileMenuOpen(false)} className={getLinkClass}>Resume Analysis</NavLink></motion.li>
                  <motion.li className="w-full" whileHover={{ scale: 1.02 }}><NavLink to="/career-roadmap" onClick={() => setMobileMenuOpen(false)} className={getLinkClass}>Career Roadmap</NavLink></motion.li>
                  <motion.li className="w-full" whileHover={{ scale: 1.02 }}><NavLink to="/placement-preparation" onClick={() => setMobileMenuOpen(false)} className={getLinkClass}>Placement Preparation</NavLink></motion.li>
                  <motion.li className="w-full" whileHover={{ scale: 1.02 }}><NavLink to="/project-recommendation" onClick={() => setMobileMenuOpen(false)} className={getLinkClass}>Project Recommendation</NavLink></motion.li>
                  <motion.li className="w-full" whileHover={{ scale: 1.02 }}><NavLink to="/about" onClick={() => setMobileMenuOpen(false)} className={getLinkClass}>About</NavLink></motion.li>
                </ul>

                <div className="mt-8 pt-6 border-t border-gray-800 w-full flex flex-col items-center gap-4">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => { setMobileMenuOpen(false); onOpenChat(); }}
                    className="w-full bg-emerald-500 text-white px-6 py-3 rounded-xl font-medium shadow-[0_0_15px_rgba(16,185,129,0.3)] transition-colors"
                  >
                    Contact Us
                  </motion.button>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};

export default Navbar;

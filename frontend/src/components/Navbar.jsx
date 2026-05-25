import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = ({ onOpenChat, onOpenAuth }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const location = useLocation();
  
  const { user, logout } = useAuth();
  const dropdownRef = useRef(null);
  
  const handleLogoOrHomeClick = (e) => {
    if (location.pathname === '/') {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const getLinkClass = ({ isActive }) => 
    `px-3 py-2 rounded-lg transition-all block font-medium border ${
      isActive 
        ? 'bg-emerald-500/15 text-emerald-400 border-emerald-500/20 shadow-[0_0_15px_rgba(16,185,129,0.1)]' 
        : 'text-gray-300 hover:bg-emerald-500/10 hover:text-emerald-400 border-transparent'
    }`;

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

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
        <div className="flex items-center gap-2 group">
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
        </div>

        {/* Desktop Nav */}
        <ul className="hidden md:flex items-center gap-2 text-sm font-medium">
          <motion.li whileHover={{ scale: 1.05 }}><NavLink to="/" onClick={handleLogoOrHomeClick} className={getLinkClass}>Home</NavLink></motion.li>
          <motion.li whileHover={{ scale: 1.05 }}><NavLink to="/resume-scanner" className={getLinkClass}>Resume Analysis</NavLink></motion.li>
          <motion.li whileHover={{ scale: 1.05 }}><NavLink to="/career-roadmap" className={getLinkClass}>Career Roadmap</NavLink></motion.li>
          <motion.li whileHover={{ scale: 1.05 }}><NavLink to="/placement-preparation" className={getLinkClass}>Placement Preparation</NavLink></motion.li>
          <motion.li whileHover={{ scale: 1.05 }}><NavLink to="/project-recommendation" className={getLinkClass}>Project Recommendation</NavLink></motion.li>
          <motion.li whileHover={{ scale: 1.05 }}><NavLink to="/about" className={getLinkClass}>About</NavLink></motion.li>
        </ul>

        <div className="hidden md:flex items-center gap-4">
          {user ? (
            <div className="relative" ref={dropdownRef}>
              <button 
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-2 focus:outline-none group cursor-pointer"
              >
                <div className="w-9 h-9 rounded-full bg-emerald-500/10 border border-emerald-500 text-emerald-400 font-bold flex items-center justify-center transition-all duration-200 group-hover:bg-emerald-500 group-hover:text-white">
                  {user.email.charAt(0).toUpperCase()}
                </div>
                <span className="text-gray-300 group-hover:text-emerald-400 text-sm font-medium transition-all max-w-[120px] truncate">
                  {user.email.split('@')[0]}
                </span>
              </button>
              
              <AnimatePresence>
                {dropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 mt-3 w-56 bg-gray-800/95 backdrop-blur-xl border border-gray-700/50 shadow-2xl rounded-2xl p-2 z-50"
                  >
                    <div className="px-4 py-2.5">
                      <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">Logged in as</p>
                      <p className="text-sm font-semibold text-white truncate mt-0.5">{user.email}</p>
                    </div>
                    <div className="h-px bg-gray-700/50 my-1" />
                    <button
                      onClick={() => { logout(); setDropdownOpen(false); }}
                      className="w-full flex items-center gap-2 px-4 py-2.5 rounded-xl text-left text-sm text-red-400 hover:bg-red-500/10 hover:text-red-300 font-medium transition-all cursor-pointer"
                    >
                      <span className="material-symbols-rounded text-lg">logout</span>
                      Log Out
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onOpenAuth} 
              className="border border-emerald-500 text-emerald-400 hover:bg-emerald-500/10 px-5 py-2 rounded-full font-medium transition-colors cursor-pointer"
            >
              Log In
            </motion.button>
          )}
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
              <ul className="flex flex-col items-center gap-2 text-xl font-medium text-gray-300 w-full px-6">
                <motion.li className="w-full text-center" whileHover={{ scale: 1.05 }}><NavLink to="/" onClick={(e) => { setMobileMenuOpen(false); handleLogoOrHomeClick(e); }} className={getLinkClass}>Home</NavLink></motion.li>
                <motion.li className="w-full text-center" whileHover={{ scale: 1.05 }}><NavLink to="/resume-scanner" onClick={() => setMobileMenuOpen(false)} className={getLinkClass}>Resume Analysis</NavLink></motion.li>
                <motion.li className="w-full text-center" whileHover={{ scale: 1.05 }}><NavLink to="/career-roadmap" onClick={() => setMobileMenuOpen(false)} className={getLinkClass}>Career Roadmap</NavLink></motion.li>
                <motion.li className="w-full text-center" whileHover={{ scale: 1.05 }}><NavLink to="/placement-preparation" onClick={() => setMobileMenuOpen(false)} className={getLinkClass}>Placement Preparation</NavLink></motion.li>
                <motion.li className="w-full text-center" whileHover={{ scale: 1.05 }}><NavLink to="/project-recommendation" onClick={() => setMobileMenuOpen(false)} className={getLinkClass}>Project Recommendation</NavLink></motion.li>
                <motion.li className="w-full text-center" whileHover={{ scale: 1.05 }}><NavLink to="/about" onClick={() => setMobileMenuOpen(false)} className={getLinkClass}>About</NavLink></motion.li>
              </ul>
              {user ? (
                <div className="mt-6 w-4/5 flex flex-col items-center gap-4">
                  <div className="flex items-center gap-3 bg-gray-800 border border-gray-700/50 w-full px-5 py-3 rounded-2xl">
                    <div className="w-10 h-10 rounded-full bg-emerald-500/20 border border-emerald-500 text-emerald-400 font-bold flex items-center justify-center text-lg">
                      {user.email.charAt(0).toUpperCase()}
                    </div>
                    <div className="flex-1 min-w-0 text-left">
                      <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">Account</p>
                      <p className="text-sm font-semibold text-white truncate mt-0.5">{user.email}</p>
                    </div>
                  </div>
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={() => { setMobileMenuOpen(false); logout(); }}
                    className="w-full border border-red-500/50 text-red-400 hover:bg-red-500/10 px-6 py-3 rounded-full font-medium transition-colors text-lg flex items-center justify-center gap-2"
                  >
                    <span className="material-symbols-rounded">logout</span>
                    Log Out
                  </motion.button>
                </div>
              ) : (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => { setMobileMenuOpen(false); onOpenAuth(); }}
                  className="mt-4 w-4/5 border border-emerald-500 text-emerald-400 hover:bg-emerald-500/10 px-6 py-3 rounded-full font-medium transition-colors text-lg"
                >
                  Log In
                </motion.button>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};

export default Navbar;

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';

const AuthModal = ({ onClose }) => {
  const [showSignup, setShowSignup] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
    >
      {/* Backdrop overlay */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 30 }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        className="relative w-full max-w-[720px] z-10 rounded-2xl border border-gray-700/50 shadow-2xl shadow-emerald-500/10 overflow-hidden"
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-8 h-8 flex items-center justify-center rounded-full bg-gray-700/50 hover:bg-gray-600 text-gray-400 hover:text-white transition-all duration-200"
        >
          <span className="material-symbols-rounded text-lg">close</span>
        </button>

        {/* Form content — toggle between login and signup */}
        <AnimatePresence mode="wait">
          {showSignup ? (
            <SignupForm
              key="signup"
              isModal={true}
              onSwitchToLogin={() => setShowSignup(false)}
              onClose={onClose}
            />
          ) : (
            <LoginForm
              key="login"
              isModal={true}
              onSwitchToSignup={() => setShowSignup(true)}
              onClose={onClose}
            />
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
};

export default AuthModal;

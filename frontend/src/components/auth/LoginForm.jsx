import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const LoginForm = ({ onSwitchToSignup, onClose, isModal = false }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [focusedField, setFocusedField] = useState(null);
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    const result = await login(email, password);
    setIsSubmitting(false);

    if (result.success) {
      if (isModal && onClose) {
        onClose();
      } else {
        navigate('/');
      }
    } else {
      setError(result.error);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="flex w-full overflow-hidden rounded-2xl"
    >
      {/* Decorative Side Panel */}
      <div className="hidden md:flex flex-col justify-center items-center w-[340px] min-h-[420px] bg-gradient-to-br from-emerald-600 to-emerald-800 p-10 text-center relative overflow-hidden flex-shrink-0">
        {/* Decorative circles */}
        <div className="absolute -top-10 -left-10 w-40 h-40 bg-emerald-500/20 rounded-full blur-2xl" />
        <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-emerald-400/15 rounded-full blur-3xl" />
        
        {/* Shield icon */}
        <motion.svg
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          viewBox="0 0 32 32" width="48" height="48" className="mb-6"
        >
          <path d="M16 2L4 8v8c0 7.18 5.12 13.9 12 15.4C22.88 29.9 28 23.18 28 16V8L16 2z" fill="rgba(255,255,255,0.2)" />
          <path d="M14 17l-3-3 1.4-1.4L14 14.2l5.6-5.6L21 10l-7 7z" fill="#fff" />
        </motion.svg>

        <h2 className="text-2xl font-bold text-white mb-3 relative z-10">Welcome Back</h2>
        <p className="text-emerald-100/80 text-sm leading-relaxed relative z-10">
          Log in to access your CareerShield AI dashboard and stay protected.
        </p>
      </div>

      {/* Form Content */}
      <div className="flex-1 bg-gray-800/80 backdrop-blur-xl p-8 md:p-10 flex flex-col justify-center">
        <h2 className="text-2xl font-bold text-white text-center mb-8">LOG IN</h2>
        
        <form onSubmit={handleSubmit} className="space-y-5">
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-red-500/10 border border-red-500/20 text-red-400 p-3 rounded-lg text-sm text-center"
            >
              {error}
            </motion.div>
          )}

          {/* Email Field */}
          <div className="relative">
            <input
              id="login-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onFocus={() => setFocusedField('email')}
              onBlur={() => setFocusedField(null)}
              required
              className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 pt-5 pb-2 text-white text-sm outline-none transition-all duration-200 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/50 peer"
              placeholder=" "
            />
            <label
              htmlFor="login-email"
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm pointer-events-none transition-all duration-200 peer-focus:top-3 peer-focus:text-xs peer-focus:text-emerald-400 peer-[:not(:placeholder-shown)]:top-3 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:text-emerald-400"
            >
              Email
            </label>
          </div>

          {/* Password Field */}
          <div className="relative">
            <input
              id="login-password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onFocus={() => setFocusedField('password')}
              onBlur={() => setFocusedField(null)}
              required
              className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 pt-5 pb-2 text-white text-sm outline-none transition-all duration-200 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/50 peer"
              placeholder=" "
            />
            <label
              htmlFor="login-password"
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm pointer-events-none transition-all duration-200 peer-focus:top-3 peer-focus:text-xs peer-focus:text-emerald-400 peer-[:not(:placeholder-shown)]:top-3 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:text-emerald-400"
            >
              Password
            </label>
          </div>

          {/* Forgot Password */}
          <div className="text-right">
            <a href="#" className="text-emerald-400 text-sm hover:text-emerald-300 hover:underline transition-colors">
              Forgot password?
            </a>
          </div>

          {/* Submit Button */}
          <motion.button
            type="submit"
            disabled={isSubmitting}
            whileHover={isSubmitting ? {} : { scale: 1.02, boxShadow: "0 0 25px rgba(16, 185, 129, 0.4)" }}
            whileTap={isSubmitting ? {} : { scale: 0.98 }}
            className="w-full bg-emerald-500 hover:bg-emerald-600 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-lg transition-colors duration-200 shadow-[0_0_15px_rgba(16,185,129,0.3)] disabled:shadow-none"
          >
            {isSubmitting ? 'Logging in...' : 'Log In'}
          </motion.button>
        </form>

        {/* Bottom Link */}
        <p className="text-center text-gray-400 text-sm mt-6">
          Don't have an account?{' '}
          {isModal && onSwitchToSignup ? (
            <button
              onClick={onSwitchToSignup}
              className="text-emerald-400 hover:text-emerald-300 hover:underline font-medium transition-colors"
            >
              Sign up
            </button>
          ) : (
            <Link
              to="/signup"
              className="text-emerald-400 hover:text-emerald-300 hover:underline font-medium transition-colors"
            >
              Sign up
            </Link>
          )}
        </p>
      </div>
    </motion.div>
  );
};

export default LoginForm;

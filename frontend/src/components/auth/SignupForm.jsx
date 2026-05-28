import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const SignupForm = ({ onSwitchToLogin, onClose, isModal = false }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [agreed, setAgreed] = useState(false);
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { signup, googleLogin } = useAuth();
  const navigate = useNavigate();

  const handleGoogleLogin = async () => {
    if (!agreed) {
      setError('Please agree to the Terms & Conditions first.');
      return;
    }
    setError(null);
    setIsSubmitting(true);
    
    const mockEmail = email || "google.user@example.com";
    const mockIdToken = `mock-${mockEmail}`;

    const result = await googleLogin(mockIdToken);
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!agreed) return;
    if (password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }
    setError(null);
    setIsSubmitting(true);

    const result = await signup(email, password);
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
      <div className="hidden md:flex flex-col justify-center items-center w-[340px] min-h-[420px] bg-gradient-to-br from-emerald-700 to-teal-800 p-10 text-center relative overflow-hidden flex-shrink-0">
        {/* Decorative circles */}
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-teal-500/20 rounded-full blur-2xl" />
        <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-emerald-400/15 rounded-full blur-3xl" />
        
        {/* Shield icon with plus */}
        <motion.svg
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          viewBox="0 0 32 32" width="48" height="48" className="mb-6"
        >
          <path d="M16 2L4 8v8c0 7.18 5.12 13.9 12 15.4C22.88 29.9 28 23.18 28 16V8L16 2z" fill="rgba(255,255,255,0.2)" />
          <path d="M15 11h2v4h4v2h-4v4h-2v-4h-4v-2h4v-4z" fill="#fff" />
        </motion.svg>

        <h2 className="text-2xl font-bold text-white mb-3 relative z-10">Create Account</h2>
        <p className="text-emerald-100/80 text-sm leading-relaxed relative z-10">
          Join CareerShield AI and protect your career from scams, fake jobs, and ATS rejections.
        </p>
      </div>

      {/* Form Content */}
      <div className="flex-1 bg-gray-800/80 backdrop-blur-xl p-8 md:p-10 flex flex-col justify-center">
        <h2 className="text-2xl font-bold text-white text-center mb-8">SIGN UP</h2>
        
        <form onSubmit={handleSubmit} className="space-y-5">
          {error && (
            <motion.div
              key={error}
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
              id="signup-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 pt-5 pb-2 text-white text-sm outline-none transition-all duration-200 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/50 peer"
              placeholder=" "
            />
            <label
              htmlFor="signup-email"
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm pointer-events-none transition-all duration-200 peer-focus:top-3 peer-focus:text-xs peer-focus:text-emerald-400 peer-[:not(:placeholder-shown)]:top-3 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:text-emerald-400"
            >
              Enter your email
            </label>
          </div>

          {/* Password Field */}
          <div className="relative">
            <input
              id="signup-password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 pt-5 pb-2 text-white text-sm outline-none transition-all duration-200 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/50 peer"
              placeholder=" "
            />
            <label
              htmlFor="signup-password"
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm pointer-events-none transition-all duration-200 peer-focus:top-3 peer-focus:text-xs peer-focus:text-emerald-400 peer-[:not(:placeholder-shown)]:top-3 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:text-emerald-400"
            >
              Create password
            </label>
          </div>

          {/* Terms & Conditions */}
          <div className="flex items-start gap-3 mt-3">
            <input
              type="checkbox"
              id="signup-policy"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
              className="mt-0.5 w-4 h-4 accent-emerald-500 rounded cursor-pointer flex-shrink-0"
            />
            <label htmlFor="signup-policy" className="text-gray-400 text-sm cursor-pointer select-none">
              I agree to the{' '}
              <a href="#" className="text-emerald-400 hover:text-emerald-300 hover:underline transition-colors">
                Terms & Conditions
              </a>
            </label>
          </div>

          {/* Submit Button */}
          <motion.button
            type="submit"
            disabled={!agreed || isSubmitting}
            whileHover={(!agreed || isSubmitting) ? {} : { scale: 1.02, boxShadow: "0 0 25px rgba(16, 185, 129, 0.4)" }}
            whileTap={(!agreed || isSubmitting) ? {} : { scale: 0.98 }}
            className="w-full bg-emerald-500 hover:bg-emerald-600 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-lg transition-colors duration-200 shadow-[0_0_15px_rgba(16,185,129,0.3)] disabled:shadow-none"
          >
            {isSubmitting ? 'Signing up...' : 'Sign Up'}
          </motion.button>
        </form>

        <div className="my-4 grid grid-cols-[1fr_auto_1fr] items-center gap-3">
          <hr className="border-dashed border-gray-600" />
          <span className="text-muted-foreground text-xs text-gray-400">Or continue With</span>
          <hr className="border-dashed border-gray-600" />
        </div>

        <div className="grid grid-cols-1 mb-4">
          <button
            type="button"
            onClick={handleGoogleLogin}
            disabled={isSubmitting}
            className="flex items-center justify-center gap-2 border border-gray-600 rounded-lg py-3 text-gray-200 hover:bg-gray-700 hover:text-white transition-all w-full font-medium text-sm"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="0.98em"
              height="1em"
              viewBox="0 0 256 262">
              <path
                fill="#4285f4"
                d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622l38.755 30.023l2.685.268c24.659-22.774 38.875-56.282 38.875-96.027"></path>
              <path
                fill="#34a853"
                d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055c-34.523 0-63.824-22.773-74.269-54.25l-1.531.13l-40.298 31.187l-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1"></path>
              <path
                fill="#fbbc05"
                d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82c0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602z"></path>
              <path
                fill="#eb4335"
                d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0C79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251"></path>
            </svg>
            <span>Continue with Google</span>
          </button>
        </div>

        {/* Bottom Link */}
        <p className="text-center text-gray-400 text-sm mt-6">
          Already have an account?{' '}
          {isModal && onSwitchToLogin ? (
            <button
              onClick={onSwitchToLogin}
              className="text-emerald-400 hover:text-emerald-300 hover:underline font-medium transition-colors"
            >
              Log in
            </button>
          ) : (
            <Link
              to="/login"
              className="text-emerald-400 hover:text-emerald-300 hover:underline font-medium transition-colors"
            >
              Log in
            </Link>
          )}
        </p>
      </div>
    </motion.div>
  );
};

export default SignupForm;

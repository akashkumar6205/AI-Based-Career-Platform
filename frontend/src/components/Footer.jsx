import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-950 pt-20 pb-10 border-t border-gray-800">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-12 mb-16">
          <div className="md:col-span-1">
            <a href="#" className="flex items-center gap-2 mb-6 group">
              <svg viewBox="0 0 32 32" width="28" height="28" className="transform group-hover:scale-110 transition-transform">
                <path d="M16 2L4 8v8c0 7.18 5.12 13.9 12 15.4C22.88 29.9 28 23.18 28 16V8L16 2z" fill="url(#shield-grad-f)" opacity="0.9"/>
                <path d="M14 17l-3-3 1.4-1.4L14 14.2l5.6-5.6L21 10l-7 7z" fill="#fff"/>
                <defs>
                  <linearGradient id="shield-grad-f" x1="4" y1="2" x2="28" y2="32">
                    <stop offset="0%" stopColor="#10b981"/>
                    <stop offset="100%" stopColor="#34d399"/>
                  </linearGradient>
                </defs>
              </svg>
              <span className="text-xl font-bold tracking-tight text-white">CareerShield <span className="text-emerald-400">AI</span></span>
            </a>
            <p className="text-gray-400 leading-relaxed text-sm">
              Your AI-powered career companion. Protecting students from scams. Powering them toward success.
            </p>
          </div>
          
          <div>
            <h4 className="text-white font-bold mb-6">Product</h4>
            <ul className="space-y-4">
              <li><a href="#features" className="text-gray-400 hover:text-emerald-400 transition-colors text-sm">Features</a></li>
              <li><a href="/resume-scanner.html" className="text-gray-400 hover:text-emerald-400 transition-colors text-sm">Resume Scanner</a></li>
              <li><a href="#scam-detector" className="text-gray-400 hover:text-emerald-400 transition-colors text-sm">Scam Detector</a></li>
              <li><a href="#pricing" className="text-gray-400 hover:text-emerald-400 transition-colors text-sm">Pricing</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-bold mb-6">Company</h4>
            <ul className="space-y-4">
              <li><a href="#" className="text-gray-400 hover:text-emerald-400 transition-colors text-sm">About Us</a></li>
              <li><a href="#" className="text-gray-400 hover:text-emerald-400 transition-colors text-sm">Blog</a></li>
              <li><a href="#" className="text-gray-400 hover:text-emerald-400 transition-colors text-sm">Careers</a></li>
              <li><a href="#universities" className="text-gray-400 hover:text-emerald-400 transition-colors text-sm">For Universities</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-bold mb-6">Legal &amp; Support</h4>
            <ul className="space-y-4">
              <li><a href="#" className="text-gray-400 hover:text-emerald-400 transition-colors text-sm">Privacy Policy</a></li>
              <li><a href="#" className="text-gray-400 hover:text-emerald-400 transition-colors text-sm">Terms of Service</a></li>
              <li><a href="#" className="text-red-400 hover:text-red-300 transition-colors text-sm font-medium">🚨 Report a Scam</a></li>
              <li><a href="#" className="text-gray-400 hover:text-emerald-400 transition-colors text-sm">Contact Us</a></li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-gray-800 text-center text-sm text-gray-500">
          <p>&copy; 2026 CareerShield AI. All rights reserved. Built with 🛡️ for students everywhere.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ChatModal = ({ onClose }) => {
  const [messages, setMessages] = useState([
    { sender: 'bot', text: 'Hi 👋 I’m CareerShield AI Assistant. How can I help you today?' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = (text) => {
    if (!text.trim()) return;
    
    // Add user message
    setMessages(prev => [...prev, { sender: 'user', text }]);
    setInput('');
    setIsTyping(true);

    // Simulate AI response based on keyword matching
    setTimeout(() => {
      let botReply = "Thanks for your message! Our personalized AI engine is currently in development. We will soon be able to provide deep, tailored guidance based on your profile.";
      const lowerText = text.toLowerCase();
      
      if (lowerText.includes('resume') || lowerText.includes('analyze')) {
        botReply = "Our Resume Analysis tool uses AI to scan your CV against thousands of successful placements. It will highlight weak action verbs, missing keywords, and formatting issues. You can try it out via the 'Resume Analysis' link in the navbar!";
      } else if (lowerText.includes('placement') || lowerText.includes('tips')) {
        botReply = "For placement preparation, focus on core CS subjects (OS, DBMS, CN), DSA problem solving, and building strong projects. Our dedicated Placement Preparation module is launching very soon.";
      } else if (lowerText.includes('roadmap') || lowerText.includes('guidance')) {
        botReply = "Career roadmaps provide structured, step-by-step learning paths for specific roles like Frontend, Backend, or Data Science. You won't have to guess what to learn next.";
      } else if (lowerText.includes('project')) {
        botReply = "Good projects are critical! Avoid generic ones like 'To-Do Lists'. Instead, build full-stack clones, real-time apps, or data visualizations. We'll soon offer highly tailored smart project recommendations.";
      }

      setMessages(prev => [...prev, { sender: 'bot', text: botReply }]);
      setIsTyping(false);
    }, 1500);
  };

  const faqButtons = [
    "Analyze My Resume",
    "Placement Tips",
    "Career Guidance",
    "Project Suggestions"
  ];

  return (
    <>
      {/* Backdrop for mobile (closes modal on outside tap) */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[90] md:hidden"
      />

      {/* Chatbot Modal Container */}
      <motion.div 
        initial={{ opacity: 0, y: '100%', scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: '100%', scale: 0.95 }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className="fixed z-[100] flex flex-col overflow-hidden custom-chat-scrollbar
                   bottom-0 left-0 w-full h-[85vh] rounded-t-3xl rounded-b-none
                   md:bottom-6 md:right-6 md:left-auto md:w-[380px] md:h-[600px] md:rounded-2xl
                   bg-gray-900/85 backdrop-blur-2xl border border-blue-500/30 shadow-[0_0_40px_rgba(59,130,246,0.15)]"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 bg-gray-900/50 border-b border-gray-700/50 backdrop-blur-md relative overflow-hidden flex-shrink-0">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-blue-500/10 to-emerald-500/10 pointer-events-none" />
          
          <div className="flex items-center gap-3 relative z-10">
            <div className="relative">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-emerald-500 flex items-center justify-center shadow-[0_0_15px_rgba(59,130,246,0.5)]">
                <span className="text-lg">🤖</span>
              </div>
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-gray-900"></div>
            </div>
            <div>
              <h3 className="font-bold text-white tracking-wide text-[15px]">CareerShield AI</h3>
              <p className="text-xs text-emerald-400 font-medium">Online • Replies instantly</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors text-gray-300 relative z-10"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
          </button>
        </div>

        {/* Messages Area */}
        <div className="flex-grow p-4 overflow-y-auto flex flex-col gap-4 relative custom-chat-scrollbar">
          <AnimatePresence initial={false}>
            {messages.map((msg, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.sender === 'bot' && (
                  <div className="w-8 h-8 rounded-full bg-blue-500/20 border border-blue-500/50 flex items-center justify-center mr-2 flex-shrink-0 mt-1">
                    <span className="text-xs">🤖</span>
                  </div>
                )}
                <div className={`max-w-[75%] p-3.5 text-[14px] leading-relaxed shadow-md ${
                  msg.sender === 'user' 
                    ? 'bg-gradient-to-br from-blue-600 to-blue-500 text-white rounded-2xl rounded-tr-sm' 
                    : 'bg-gray-800/80 backdrop-blur-sm text-gray-100 border border-gray-700/50 rounded-2xl rounded-tl-sm'
                }`}>
                  {msg.text}
                </div>
              </motion.div>
            ))}
            
            {/* Typing Indicator */}
            {isTyping && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="flex justify-start"
              >
                <div className="w-8 h-8 rounded-full bg-blue-500/20 border border-blue-500/50 flex items-center justify-center mr-2 flex-shrink-0 mt-1">
                  <span className="text-xs">🤖</span>
                </div>
                <div className="bg-gray-800/80 backdrop-blur-sm border border-gray-700/50 rounded-2xl rounded-tl-sm px-4 py-4 flex items-center gap-1 shadow-md">
                  <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0 }} className="w-2 h-2 bg-gray-400 rounded-full" />
                  <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }} className="w-2 h-2 bg-gray-400 rounded-full" />
                  <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.4 }} className="w-2 h-2 bg-gray-400 rounded-full" />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* FAQ Quick Buttons */}
          {messages.length === 1 && !isTyping && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="flex flex-wrap gap-2 mt-2 ml-10"
            >
              {faqButtons.map((faq, i) => (
                <button
                  key={i}
                  onClick={() => handleSend(faq)}
                  className="text-xs font-medium bg-blue-500/10 hover:bg-blue-500/20 text-blue-300 border border-blue-500/30 rounded-full px-3 py-1.5 transition-colors text-left"
                >
                  {faq}
                </button>
              ))}
            </motion.div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-3 bg-gray-900/80 backdrop-blur-md border-t border-gray-700/50 flex-shrink-0">
          <form 
            onSubmit={(e) => { e.preventDefault(); handleSend(input); }} 
            className="flex items-center gap-2 relative bg-gray-800/80 border border-gray-700 rounded-full pl-4 pr-1.5 py-1.5 focus-within:border-blue-500/50 focus-within:bg-gray-800 transition-colors shadow-inner"
          >
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask me anything..." 
              className="flex-grow bg-transparent text-white text-[14px] focus:outline-none w-full"
            />
            <button 
              type="submit"
              disabled={!input.trim() || isTyping}
              className="w-9 h-9 flex-shrink-0 flex items-center justify-center bg-blue-500 hover:bg-blue-400 disabled:bg-gray-600 disabled:text-gray-400 text-white rounded-full transition-colors shadow-[0_0_10px_rgba(59,130,246,0.3)] disabled:shadow-none"
            >
              <svg className="w-4 h-4 transform rotate-90 ml-0.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 19V5m0 0l-7 7m7-7l7 7"></path></svg>
            </button>
          </form>
        </div>
      </motion.div>
    </>
  );
};

export default ChatModal;

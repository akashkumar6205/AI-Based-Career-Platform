import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ThreatLandscape from './components/ThreatLandscape';
import Features from './components/Features';
import HowItWorks from './components/HowItWorks';
import Universities from './components/Universities';
import About from './components/About';
import PlacementPreparation from './components/PlacementPreparation';
import ProjectRecommendation from './components/ProjectRecommendation';
import CareerRoadmap from './components/CareerRoadmap';
import ContactUs from './components/ContactUs';
import Pricing from './components/Pricing';
import Footer from './components/Footer';
import CTA from './components/CTA';
import ResumeScanner from './components/ResumeScanner';
import Marquee from './components/Marquee';
import ChatModal from './components/ChatModal';
import AuthModal from './components/auth/AuthModal';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import ProtectedRoute from './components/auth/ProtectedRoute';
import { AnimatePresence } from 'framer-motion';

const Home = () => (
  <>
    <div className="pt-24 pb-4">
      <Marquee speed={35} />
    </div>
    <Hero />
    <ThreatLandscape />
    <Features />
    <HowItWorks />
    <Universities />
    <Pricing />
    <CTA />
  </>
);

function App() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 overflow-x-hidden font-sans">
      <Navbar 
        onOpenChat={() => setIsChatOpen(true)} 
        onOpenAuth={() => setIsAuthOpen(true)} 
      />
      <main>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />

          {/* Protected Premium AI Routes */}
          <Route 
            path="/resume-scanner" 
            element={
              <ProtectedRoute>
                <ResumeScanner />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/placement-preparation" 
            element={
              <ProtectedRoute>
                <PlacementPreparation />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/project-recommendation" 
            element={
              <ProtectedRoute>
                <ProjectRecommendation />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/career-roadmap" 
            element={
              <ProtectedRoute>
                <CareerRoadmap />
              </ProtectedRoute>
            } 
          />
        </Routes>
      </main>
      <Footer />
      
      <AnimatePresence>
        {isChatOpen && <ChatModal onClose={() => setIsChatOpen(false)} />}
      </AnimatePresence>

      <AnimatePresence>
        {isAuthOpen && <AuthModal onClose={() => setIsAuthOpen(false)} />}
      </AnimatePresence>
    </div>
  );
}

export default App;

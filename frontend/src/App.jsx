import React, { useEffect, useState } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
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
  const navigate = useNavigate();
  const location = useLocation();
  const [isChatOpen, setIsChatOpen] = useState(false);

  useEffect(() => {
    // Always start at home on initial load/refresh, regardless of the URL path
    if (location.pathname !== '/') {
      navigate('/', { replace: true });
    }
  }, []); // Empty dependency array ensures this only runs on app mount

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 overflow-x-hidden font-sans">
      <Navbar onOpenChat={() => setIsChatOpen(true)} />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/resume-scanner" element={<ResumeScanner />} />
          <Route path="/about" element={<About />} />
          <Route path="/placement-preparation" element={<PlacementPreparation />} />
          <Route path="/project-recommendation" element={<ProjectRecommendation />} />
          <Route path="/career-roadmap" element={<CareerRoadmap />} />
          <Route path="/contact" element={<ContactUs />} />
        </Routes>
      </main>
      <Footer />
      
      <AnimatePresence>
        {isChatOpen && <ChatModal onClose={() => setIsChatOpen(false)} />}
      </AnimatePresence>
    </div>
  );
}

export default App;

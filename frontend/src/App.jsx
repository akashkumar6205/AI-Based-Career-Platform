import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ThreatLandscape from './components/ThreatLandscape';
import Features from './components/Features';
import HowItWorks from './components/HowItWorks';
import Universities from './components/Universities';
import Pricing from './components/Pricing';
import Footer from './components/Footer';
import CTA from './components/CTA';
import ResumeScanner from './components/ResumeScanner';
import Marquee from './components/Marquee';

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
  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 overflow-x-hidden font-sans">
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/resume-scanner" element={<ResumeScanner />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;

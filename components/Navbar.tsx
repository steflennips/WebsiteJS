
import React, { useState, useEffect } from 'react';

const Logo: React.FC = () => (
  <svg width="40" height="40" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#00a3ff" />
        <stop offset="100%" stopColor="#7b2ff7" />
      </linearGradient>
    </defs>
    <path d="M30 35C30 25 40 20 50 20C60 20 70 25 70 35C70 45 60 50 50 60L30 80H75" stroke="url(#logoGradient)" strokeWidth="12" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="70" cy="70" r="15" stroke="#7b2ff7" strokeWidth="8" />
    <circle cx="70" cy="70" r="4" fill="#7b2ff7" />
  </svg>
);

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${isScrolled ? 'py-4' : 'py-8'}`}>
      <div className="max-w-7xl mx-auto px-6">
        <div className={`flex justify-between items-center transition-all duration-500 px-6 py-3 rounded-2xl ${isScrolled ? 'glass shadow-2xl' : ''}`}>
          <div className="flex items-center gap-3">
            <Logo />
            <span className="font-bold text-2xl tracking-tight text-white">Deux2<span className="text-[#7b2ff7]">Qonnect</span></span>
          </div>
          
          <div className="hidden md:flex items-center space-x-10">
            <a href="#diensten" className="text-slate-400 hover:text-white text-sm font-semibold tracking-wide transition-colors">DIENSTEN</a>
            <a href="#assessment" className="text-slate-400 hover:text-white text-sm font-semibold tracking-wide transition-colors">DATA SCAN</a>
            <a href="#contact" className="px-6 py-2.5 bg-gradient-to-r from-[#00a3ff] to-[#7b2ff7] text-white rounded-lg font-bold text-sm tracking-wide hover:opacity-90 transition-all transform hover:scale-105 active:scale-95 shadow-lg shadow-indigo-500/20">
              LETS TALK
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

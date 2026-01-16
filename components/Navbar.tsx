
import React, { useState, useEffect } from 'react';

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
            <div className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center shadow-[0_0_15px_rgba(16,185,129,0.4)]">
              <span className="text-slate-950 font-black text-xl">N</span>
            </div>
            <span className="font-bold text-2xl tracking-tight text-white">Nexus<span className="text-emerald-400">Data</span></span>
          </div>
          
          <div className="hidden md:flex items-center space-x-10">
            <a href="#diensten" className="text-slate-400 hover:text-emerald-400 text-sm font-semibold tracking-wide transition-colors">DIENSTEN</a>
            <a href="#assessment" className="text-slate-400 hover:text-emerald-400 text-sm font-semibold tracking-wide transition-colors">DATA SCAN</a>
            <a href="#contact" className="px-6 py-2.5 bg-emerald-500 text-slate-950 rounded-lg font-bold text-sm tracking-wide hover:bg-emerald-400 transition-all transform hover:scale-105 active:scale-95">
              LETS TALK
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;


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
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);

      // Detecteer welke sectie in beeld is
      const sections = ['diensten', 'assessment', 'contact'];
      let currentSection = '';
      
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          // Als de bovenkant van de sectie in de buurt van de bovenkant van het scherm is
          if (rect.top <= 150 && rect.bottom >= 150) {
            currentSection = section;
            break;
          }
        }
      }
      setActiveSection(currentSection);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const getLinkClasses = (sectionId: string) => {
    const isActive = activeSection === sectionId;
    return `text-[11px] font-black tracking-widest transition-all uppercase relative py-2 ${
      isActive 
        ? 'text-white' 
        : 'text-slate-400 hover:text-slate-200'
    }`;
  };

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${isScrolled ? 'py-4' : 'py-8'}`}>
      <div className="max-w-7xl mx-auto px-6">
        <div className={`flex justify-between items-center transition-all duration-500 px-6 py-3 rounded-2xl ${isScrolled ? 'glass shadow-2xl border-white/10' : ''}`}>
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
            <Logo />
            <span className="font-bold text-2xl tracking-tight text-white">Deux2<span className="text-[#7b2ff7]">Qonnect</span></span>
          </div>
          
          <div className="hidden lg:flex items-center space-x-10">
            <a href="#diensten" className={getLinkClasses('diensten')}>
              DIENSTEN
              {activeSection === 'diensten' && (
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#00a3ff] rounded-full"></span>
              )}
            </a>
            <a href="#assessment" className={getLinkClasses('assessment')}>
              DATA SCAN
              {activeSection === 'assessment' && (
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#7b2ff7] rounded-full"></span>
              )}
            </a>
            <a 
              href="#contact" 
              className={`px-6 py-2.5 rounded-lg font-bold text-sm tracking-wide transition-all transform hover:scale-105 active:scale-95 uppercase border ${
                activeSection === 'contact'
                  ? 'bg-white text-slate-950 border-white shadow-[0_0_20px_rgba(255,255,255,0.3)]'
                  : 'bg-gradient-to-r from-[#00a3ff] to-[#7b2ff7] text-white border-transparent shadow-lg shadow-indigo-500/20'
              }`}
            >
              START IMPACT
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

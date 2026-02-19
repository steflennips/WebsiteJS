
import React from 'react';
import Navbar from './components/Navbar.tsx';
import Hero from './components/Hero.tsx';
import Services from './components/Services.tsx';
import MaturityAgent from './components/MaturityAgent.tsx';
import Contact from './components/Contact.tsx';

const App: React.FC = () => {
  return (
    <div className="bg-slate-950 min-h-screen selection:bg-[#7b2ff7] selection:text-white">
      <Navbar />
      <main>
        <Hero />
        <Services />
        <MaturityAgent />
        <Contact />
      </main>
      
      <footer className="bg-slate-950 py-20 border-t border-white/5 text-slate-500">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-12">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-[#00a3ff] rounded-lg flex items-center justify-center">
              <span className="text-slate-950 font-black text-sm">2</span>
            </div>
            <span className="font-bold text-xl tracking-tight text-white uppercase">Deux2<span className="text-[#7b2ff7]">Qonnect</span></span>
          </div>
          
          <div className="flex flex-col items-center md:items-start gap-3">
            <p className="text-[10px] font-black tracking-[0.2em] uppercase opacity-40 mb-1">Connect met de founders</p>
            <div className="flex gap-6">
              <a 
                href="https://www.linkedin.com/in/stef-lennips-38a19271/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-xs font-bold text-slate-400 hover:text-[#00a3ff] transition-colors flex items-center gap-2"
              >
                Stef Lennips
              </a>
              <a 
                href="https://www.linkedin.com/in/jacques-van-cittert-793699a/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-xs font-bold text-slate-400 hover:text-[#7b2ff7] transition-colors flex items-center gap-2"
              >
                Jacques van Cittert
              </a>
            </div>
          </div>
          
          <div className="flex gap-10 text-[10px] font-black tracking-[0.2em] uppercase">
            <a href="#diensten" className="hover:text-white transition-colors">DIENSTEN</a>
            <a href="#assessment" className="hover:text-white transition-colors">DATA SCAN</a>
            <a href="#contact" className="hover:text-white transition-colors">CONTACT</a>
          </div>
          
          <p className="text-[10px] font-bold tracking-[0.2em] uppercase opacity-40">
            © {new Date().getFullYear()} DEUX2QONNECT
          </p>
        </div>
      </footer>
    </div>
  );
};

export default App;

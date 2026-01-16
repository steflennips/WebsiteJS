
import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import MaturityAgent from './components/MaturityAgent';
import Contact from './components/Contact';

const App: React.FC = () => {
  return (
    <div className="bg-slate-950 min-h-screen selection:bg-emerald-500 selection:text-slate-950">
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
            <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center">
              <span className="text-slate-950 font-black text-sm">N</span>
            </div>
            <span className="font-bold text-xl tracking-tight text-white uppercase">Nexus<span className="text-emerald-400">Data</span></span>
          </div>
          
          <div className="flex gap-10 text-xs font-black tracking-widest uppercase">
            <a href="#diensten" className="hover:text-emerald-400 transition-colors">EXPERTISE</a>
            <a href="#assessment" className="hover:text-emerald-400 transition-colors">DIAGNOSTIC</a>
            <a href="#contact" className="hover:text-emerald-400 transition-colors">CONTACT</a>
          </div>
          
          <p className="text-[10px] font-bold tracking-[0.2em] uppercase opacity-40">
            © {new Date().getFullYear()} NEXUSDATA INTELLIGENCE UNIT
          </p>
        </div>
      </footer>
    </div>
  );
};

export default App;


import React from 'react';

const Hero: React.FC = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center pt-24 overflow-hidden">
      {/* Prism Background */}
      <div className="absolute top-0 left-0 w-full h-full -z-10 pointer-events-none opacity-50">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-emerald-500/10 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-violet-600/10 blur-[120px] rounded-full"></div>
        <div className="absolute inset-0 overflow-hidden">
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[1px] bg-white/5 rotate-45"></div>
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[1px] bg-white/5 -rotate-45"></div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
        <div className="inline-block px-4 py-1 rounded-sm border border-emerald-500/30 bg-emerald-500/5 text-emerald-400 text-[10px] font-bold tracking-[0.3em] uppercase mb-10">
          NexusData Intelligence // v2.5
        </div>
        
        <h1 className="text-6xl md:text-9xl font-heading font-bold text-white tracking-tighter mb-8 leading-[0.9] flex flex-col">
          <span>DATA IS</span>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-emerald-600">STRATEGY.</span>
        </h1>
        
        <p className="max-w-xl mx-auto text-lg text-slate-400 mb-14 font-medium leading-relaxed">
          NexusData helpt het MKB de stap te maken van onderbuikgevoel naar data-gedreven winst door de inzet van slimme AI-architecturen.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
          <a href="#assessment" className="w-full sm:w-auto px-10 py-5 bg-emerald-500 text-slate-950 rounded-lg font-black text-lg shadow-[0_10px_40px_rgba(16,185,129,0.3)] hover:bg-emerald-400 transition-all hover:-translate-y-1 flex items-center justify-center gap-3">
            START DATA SCAN
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
          </a>
          <a href="#diensten" className="w-full sm:w-auto px-10 py-5 border border-white/10 hover:border-emerald-500/50 hover:bg-emerald-500/5 text-white rounded-lg font-bold text-lg transition-all">
            ONZE EXPERTISE
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;

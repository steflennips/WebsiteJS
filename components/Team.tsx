
import React from 'react';

const Team: React.FC = () => {
  return (
    <section id="team" className="py-32 bg-slate-900/50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <div>
            <h2 className="text-[#7b2ff7] font-black tracking-widest uppercase text-sm mb-4">Het Team</h2>
            <h3 className="text-5xl font-black text-white mb-8 leading-tight">Gedreven door <br/> ondernemerschap.</h3>
            <p className="text-slate-400 text-lg font-medium leading-relaxed mb-10">
              Wij zijn Deux2Qonnect begonnen met één doel: de kracht van enterprise-level data en AI toegankelijk maken voor het MKB. Geen dikke rapporten, maar tastbare resultaten.
            </p>
            <div className="flex gap-4">
              <div className="px-6 py-3 bg-white/5 border border-white/10 rounded-xl text-white font-bold text-sm">
                15+ Jaar Ervaring
              </div>
              <div className="px-6 py-3 bg-white/5 border border-white/10 rounded-xl text-white font-bold text-sm">
                AI Specialisten
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-6">
            <div className="glass p-6 rounded-[2rem] border-white/10 hover:border-[#00a3ff]/50 transition-all group">
              <div className="aspect-square bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl mb-6 overflow-hidden relative">
                 <div className="absolute inset-0 flex items-center justify-center text-slate-700 font-black text-4xl">S</div>
                 <div className="absolute inset-0 bg-gradient-to-t from-[#00a3ff]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </div>
              <h4 className="text-white font-black text-xl">Stef Lennips</h4>
              <p className="text-slate-500 text-sm font-bold uppercase tracking-widest mb-4">Founder</p>
              <a 
                href="https://www.linkedin.com/in/stef-lennips-38a19271/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-[#00a3ff] font-bold text-xs uppercase tracking-widest hover:text-white transition-colors"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                Connect
              </a>
            </div>
            
            <div className="glass p-6 rounded-[2rem] border-white/10 hover:border-[#7b2ff7]/50 transition-all group mt-12">
              <div className="aspect-square bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl mb-6 overflow-hidden relative">
                 <div className="absolute inset-0 flex items-center justify-center text-slate-700 font-black text-4xl">J</div>
                 <div className="absolute inset-0 bg-gradient-to-t from-[#7b2ff7]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </div>
              <h4 className="text-white font-black text-xl">Jacques van Cittert</h4>
              <p className="text-slate-500 text-sm font-bold uppercase tracking-widest mb-4">Founder</p>
              <a 
                href="https://www.linkedin.com/in/jacques-van-cittert-793699a/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-[#7b2ff7] font-bold text-xs uppercase tracking-widest hover:text-white transition-colors"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                Connect
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Team;

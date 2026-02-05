
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
                 <div className="absolute inset-0 flex items-center justify-center text-slate-700 font-black text-4xl">D</div>
                 <div className="absolute inset-0 bg-gradient-to-t from-[#00a3ff]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </div>
              <h4 className="text-white font-black text-xl">Founder 1</h4>
              <p className="text-slate-500 text-sm font-bold uppercase tracking-widest mb-4">Strategy & Data</p>
            </div>
            
            <div className="glass p-6 rounded-[2rem] border-white/10 hover:border-[#7b2ff7]/50 transition-all group mt-12">
              <div className="aspect-square bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl mb-6 overflow-hidden relative">
                 <div className="absolute inset-0 flex items-center justify-center text-slate-700 font-black text-4xl">Q</div>
                 <div className="absolute inset-0 bg-gradient-to-t from-[#7b2ff7]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </div>
              <h4 className="text-white font-black text-xl">Founder 2</h4>
              <p className="text-slate-500 text-sm font-bold uppercase tracking-widest mb-4">AI & Operations</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Team;

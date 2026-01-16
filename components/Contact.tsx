
import React from 'react';

const Contact: React.FC = () => {
  return (
    <section id="contact" className="py-32 bg-slate-950 relative overflow-hidden">
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
      
      <div className="max-w-7xl mx-auto px-6">
        <div className="glass rounded-[3rem] p-10 md:p-20 relative overflow-hidden border-white/5">
          <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-emerald-500/10 blur-[120px] rounded-full"></div>
          
          <div className="grid md:grid-cols-2 gap-20 items-center relative z-10">
            <div>
              <h2 className="text-5xl md:text-6xl font-black text-white tracking-tighter mb-8 leading-none">
                Klaar voor de <br/> <span className="text-emerald-400">Next Level?</span>
              </h2>
              <p className="text-slate-400 text-xl font-medium mb-12 leading-relaxed">
                Geen vage pitches, maar een direct gesprek over hoe data uw bedrijf naar de volgende fase brengt.
              </p>
              
              <div className="space-y-8">
                <div className="flex items-center gap-6 group">
                  <div className="w-16 h-16 glass rounded-2xl flex items-center justify-center group-hover:bg-emerald-500 group-hover:text-slate-950 transition-all duration-300">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                  </div>
                  <div>
                    <p className="text-xs font-black tracking-widest text-slate-500 uppercase">DIRECT MAIL</p>
                    <p className="text-xl font-bold text-white">hello@nexusdata.ai</p>
                  </div>
                </div>
                <div className="flex items-center gap-6 group">
                  <div className="w-16 h-16 glass rounded-2xl flex items-center justify-center group-hover:bg-emerald-500 group-hover:text-slate-950 transition-all duration-300">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                  </div>
                  <div>
                    <p className="text-xs font-black tracking-widest text-slate-500 uppercase">LOCATION</p>
                    <p className="text-xl font-bold text-white">Innovation Center, NL</p>
                  </div>
                </div>
              </div>
            </div>
            
            <form className="glass p-10 rounded-[2.5rem] border-white/10 space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div className="col-span-2 sm:col-span-1">
                  <input type="text" className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white focus:border-emerald-500/50 outline-none transition-all font-medium" placeholder="Naam" />
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <input type="text" className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white focus:border-emerald-500/50 outline-none transition-all font-medium" placeholder="Bedrijf" />
                </div>
              </div>
              <input type="email" className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white focus:border-emerald-500/50 outline-none transition-all font-medium" placeholder="Email adres" />
              <textarea rows={4} className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white focus:border-emerald-500/50 outline-none transition-all font-medium resize-none" placeholder="Wat is uw grootste data uitdaging?"></textarea>
              <button type="button" className="w-full bg-emerald-500 text-slate-950 font-black py-5 rounded-xl shadow-[0_0_30px_rgba(16,185,129,0.3)] hover:bg-emerald-400 transition-all text-lg">
                CONNECT NOW
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;

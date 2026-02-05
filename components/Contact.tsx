
import React from 'react';

const Contact: React.FC = () => {
  return (
    <section id="contact" className="py-32 bg-slate-950 relative overflow-hidden">
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-indigo-500/20 to-transparent"></div>
      
      <div className="max-w-7xl mx-auto px-6">
        <div className="glass rounded-[3rem] p-10 md:p-20 relative overflow-hidden border-white/5">
          <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-indigo-500/10 blur-[120px] rounded-full"></div>
          
          <div className="grid md:grid-cols-2 gap-20 items-center relative z-10">
            <div>
              <h2 className="text-5xl md:text-6xl font-black text-white tracking-tighter mb-8 leading-none">
                Klaar voor de <br/> <span className="text-gradient">Next Level?</span>
              </h2>
              <p className="text-slate-400 text-xl font-medium mb-12 leading-relaxed">
                Geen vage pitches, maar een direct gesprek over hoe data uw bedrijf naar de volgende fase brengt.
              </p>
              
              <div className="space-y-8">
                <div className="flex items-center gap-6 group">
                  <div className="w-16 h-16 glass rounded-2xl flex items-center justify-center group-hover:bg-gradient-to-r group-hover:from-[#00a3ff] group-hover:to-[#7b2ff7] group-hover:text-white transition-all duration-300">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                  </div>
                  <div>
                    <p className="text-xs font-black tracking-widest text-slate-500 uppercase">DIRECT MAIL</p>
                    <p className="text-xl font-bold text-white mb-2">hello@deux2qonnect.ai</p>
                    <div className="flex gap-4">
                      <a 
                        href="https://www.linkedin.com/in/stef-lennips-38a19271/" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-[10px] font-black text-slate-500 hover:text-[#00a3ff] transition-colors flex items-center gap-1.5 uppercase tracking-widest"
                      >
                        <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                        Stef
                      </a>
                      <a 
                        href="https://www.linkedin.com/in/jacques-van-cittert-793699a/" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-[10px] font-black text-slate-500 hover:text-[#7b2ff7] transition-colors flex items-center gap-1.5 uppercase tracking-widest"
                      >
                        <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                        Jacques
                      </a>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-6 group">
                  <div className="w-16 h-16 glass rounded-2xl flex items-center justify-center group-hover:bg-gradient-to-r group-hover:from-[#00a3ff] group-hover:to-[#7b2ff7] group-hover:text-white transition-all duration-300">
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
                  <input type="text" className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white focus:border-indigo-500/50 outline-none transition-all font-medium" placeholder="Naam" />
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <input type="text" className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white focus:border-indigo-500/50 outline-none transition-all font-medium" placeholder="Bedrijf" />
                </div>
              </div>
              <input type="email" className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white focus:border-indigo-500/50 outline-none transition-all font-medium" placeholder="Email adres" />
              <textarea rows={4} className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white focus:border-indigo-500/50 outline-none transition-all font-medium resize-none" placeholder="Wat is uw grootste data uitdaging?"></textarea>
              <button type="button" className="w-full bg-gradient-to-r from-[#00a3ff] to-[#7b2ff7] text-white font-black py-5 rounded-xl shadow-[0_0_30px_rgba(123,47,247,0.3)] hover:opacity-90 transition-all text-lg">
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

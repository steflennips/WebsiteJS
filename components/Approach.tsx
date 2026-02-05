
import React from 'react';

const steps = [
  {
    title: "Audit",
    subtitle: "Nulmeting & Inzicht",
    desc: "We brengen uw huidige datalandschap in kaart en identificeren waar de grootste kansen voor efficiëntie liggen.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    )
  },
  {
    title: "Advies",
    subtitle: "Strategische Roadmap",
    desc: "Geen vage rapporten, maar een concreet plan om van data-chaos naar AI-gestuurde groei te gaan.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    )
  },
  {
    title: "Adoptie",
    subtitle: "Implementatie & Impact",
    desc: "We bouwen de tools en trainen uw team, zodat data echt onderdeel wordt van uw dagelijkse succes.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    )
  }
];

const Approach: React.FC = () => {
  return (
    <section id="aanpak" className="py-32 bg-slate-950">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-[#00a3ff] font-black tracking-widest uppercase text-sm mb-4">Onze Methodologie</h2>
          <p className="text-5xl font-black text-white">De Triple-A Aanpak.</p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-12 relative">
          <div className="hidden md:block absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent -z-10"></div>
          
          {steps.map((step, i) => (
            <div key={i} className="flex flex-col items-center text-center group">
              <div className="w-20 h-20 rounded-full bg-slate-900 border border-white/10 flex items-center justify-center text-[#7b2ff7] mb-8 group-hover:scale-110 group-hover:border-[#7b2ff7]/50 transition-all duration-500 shadow-xl shadow-indigo-500/5">
                {step.icon}
              </div>
              <h3 className="text-2xl font-black text-white mb-2">{step.title}</h3>
              <p className="text-[#00a3ff] text-xs font-black uppercase tracking-widest mb-4">{step.subtitle}</p>
              <p className="text-slate-400 font-medium leading-relaxed max-w-xs">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Approach;

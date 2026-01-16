
import React from 'react';

const services = [
  {
    title: "Intelligence Audit",
    tag: "Assessment",
    description: "Een diepe duik in uw huidige datastructuur. We vinden het goud dat verborgen ligt in uw processen.",
    color: "emerald"
  },
  {
    title: "Custom AI Agents",
    tag: "Development",
    description: "Geen standaard chatbots, maar intelligente medewerkers die uw data kennen en acties ondernemen.",
    color: "indigo"
  },
  {
    title: "The Roadmap",
    tag: "Strategy",
    description: "Een concreet stappenplan van waar u nu staat naar een data-gedreven koploper in uw sector.",
    color: "violet"
  }
];

const Services: React.FC = () => {
  return (
    <section id="diensten" className="py-32 bg-slate-950 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
          <div className="max-w-xl text-left">
            <h2 className="text-emerald-400 font-black tracking-widest uppercase text-sm mb-4">Capabilities</h2>
            <p className="text-4xl md:text-5xl font-black text-white leading-tight">Expertise die uw <br/> resultaat drijft.</p>
          </div>
          <p className="text-slate-400 max-w-sm text-left font-medium">
            Wij geloven niet in vage termen. Wij leveren tastbare data-producten die direct impact hebben op uw dagelijkse operatie.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6">
          {services.map((service, idx) => (
            <div key={idx} className="group relative p-1 rounded-3xl overflow-hidden transition-all hover:scale-[1.02]">
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-100"></div>
              <div className="relative h-full glass p-8 rounded-3xl flex flex-col justify-between hover:bg-white/[0.05] transition-colors">
                <div>
                  <span className={`inline-block px-3 py-1 rounded-full text-[10px] font-black tracking-widest uppercase mb-6 bg-${service.color}-500/20 text-${service.color}-400 border border-${service.color}-500/30`}>
                    {service.tag}
                  </span>
                  <h3 className="text-2xl font-black text-white mb-4">{service.title}</h3>
                  <p className="text-slate-400 font-medium leading-relaxed">
                    {service.description}
                  </p>
                </div>
                <div className="mt-8 pt-8 border-t border-white/5">
                  <button className="text-white font-bold flex items-center gap-2 group-hover:text-emerald-400 transition-colors">
                    LEES MEER
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;

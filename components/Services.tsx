
import React, { useState } from 'react';

interface DetailedContent {
  expect: string;
  results: string[];
  resultsHeader?: string;
}

interface Service {
  title: string;
  tag: string;
  description: string;
  color: 'blue' | 'purple' | 'indigo';
  details: DetailedContent;
}

const services: Service[] = [
  {
    title: "Intelligence Audit",
    tag: "Assessment",
    description: "Een scherpe analyse van uw huidige datafundament. We brengen structuur, kansen en verborgen potentieel in kaart — het goud dat in uw processen verborgen ligt.",
    color: "blue",
    details: {
      expect: "Onze Intelligence Audit geeft u een volledig beeld van uw huidige datalandschap. We analyseren waar kansen liggen, waar risico’s zitten en hoe u waarde sneller kunt ontsluiten.",
      results: [
        "Volledig overzicht van uw datastructuur",
        "Inzicht in inefficiënte processen",
        "Concreet advies voor AI-waarde"
      ]
    }
  },
  {
    title: "Custom AI Agents",
    tag: "Development",
    description: "Geen standaard chatbots, maar slimme digitale collega’s die uw data begrijpen, beslissingen ondersteunen en acties uitvoeren alsof ze onderdeel van uw team zijn.",
    color: "purple",
    details: {
      expect: "Wij ontwikkelen AI‑agents die werken als digitale collega’s: ze lezen, analyseren en ondernemen actie. Uw team houdt tijd over voor het werk dat echt telt.",
      results: [
        "Automatische documentverwerking",
        "Real-time KPI monitoring",
        "Intelligente klantenservice bots"
      ]
    }
  },
  {
    title: "The Roadmap",
    tag: "Strategy",
    description: "Een helder, uitvoerbaar stappenplan dat uw organisatie brengt van waar u nu staat naar een toekomstbestendige, data‑gedreven koploper in uw sector.",
    color: "indigo",
    details: {
      expect: "Met onze Roadmap krijgt u een helder, pragmatisch plan om uw organisatie data‑gedreven te maken, stap voor stap.",
      results: [
        "Nulmeting van de huidige situatie",
        "Grootste kansen voor AI-optimalisatie",
        "Stapsgewijze uitvoerbare planning"
      ]
    }
  }
];

const Services: React.FC = () => {
  const [expandedIdx, setExpandedIdx] = useState<number | null>(null);

  const toggleExpand = (idx: number) => {
    setExpandedIdx(expandedIdx === idx ? null : idx);
  };

  return (
    <section id="diensten" className="py-24 md:py-32 bg-slate-950 border-t border-white/5 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 md:mb-20 gap-6">
          <div className="max-w-xl text-left">
            <h2 className="text-[#00a3ff] font-black tracking-widest uppercase text-xs md:text-sm mb-3">Capabilities</h2>
            <p className="text-3xl md:text-5xl font-black text-white leading-tight">Expertise die uw <br className="hidden md:block"/> resultaat drijft.</p>
          </div>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6 items-start">
          {services.map((service, idx) => {
            const isExpanded = expandedIdx === idx;
            
            return (
              <div 
                key={idx} 
                className={`group relative p-px rounded-[2rem] overflow-hidden transition-all duration-500 ${isExpanded ? 'md:scale-[1.03] z-10 shadow-[0_0_50px_rgba(123,47,247,0.15)]' : 'hover:scale-[1.01]'}`}
              >
                {/* Geanimeerde Border bij Expansie */}
                <div className={`absolute inset-0 bg-gradient-to-br transition-opacity duration-500 ${isExpanded ? 'from-[#00a3ff] via-[#7b2ff7] to-indigo-500 opacity-100' : 'from-white/20 to-transparent opacity-40 group-hover:opacity-60'}`}></div>
                
                <div className={`relative h-full bg-slate-950 p-6 md:p-8 rounded-[2rem] flex flex-col transition-all duration-500 ${isExpanded ? 'bg-slate-900/90' : 'hover:bg-slate-900/40'}`}>
                  {/* Service Header */}
                  <div>
                    <span className={`inline-block px-3 py-1 rounded-full text-[9px] md:text-[10px] font-black tracking-widest uppercase mb-4 md:mb-6 ${service.color === 'blue' ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30' : service.color === 'purple' ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30' : 'bg-indigo-500/20 text-indigo-400 border border-indigo-500/30'}`}>
                      {service.tag}
                    </span>
                    <h3 className="text-xl md:text-2xl font-black text-white mb-3 md:mb-4">{service.title}</h3>
                    <p className="text-slate-400 text-sm md:text-base font-medium leading-relaxed mb-6">
                      {service.description}
                    </p>
                  </div>

                  {/* Uitklapbare Content */}
                  <div className={`grid transition-all duration-500 ease-in-out ${isExpanded ? 'grid-rows-[1fr] opacity-100 mb-8' : 'grid-rows-[0fr] opacity-0 pointer-events-none'}`}>
                    <div className="overflow-hidden">
                      <div className="pt-6 border-t border-white/10 space-y-6">
                        <p className="text-slate-200 text-sm md:text-base font-bold leading-relaxed italic">
                          "{service.details.expect}"
                        </p>
                        <div className="space-y-3">
                          {service.details.results.map((res, i) => (
                            <div key={i} className="flex gap-3 items-start text-slate-400">
                              <div className="w-5 h-5 rounded-md bg-white/5 flex items-center justify-center shrink-0 mt-0.5">
                                <svg className="w-3 h-3 text-[#00a3ff]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                              </div>
                              <span className="text-xs md:text-sm font-medium">{res}</span>
                            </div>
                          ))}
                        </div>
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                          }}
                          className="w-full py-4 bg-white text-slate-950 font-black rounded-xl text-xs uppercase tracking-widest hover:bg-slate-200 transition-colors shadow-lg"
                        >
                          Bespreken
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Toggle Knop */}
                  <div className={`mt-auto pt-6 border-t border-white/5 ${isExpanded ? 'border-transparent' : ''}`}>
                    <button 
                      onClick={() => toggleExpand(idx)}
                      className={`text-sm font-bold flex items-center gap-2 transition-colors uppercase tracking-widest ${isExpanded ? 'text-indigo-400' : 'text-white hover:text-[#00a3ff]'}`}
                    >
                      {isExpanded ? (
                        <>
                          SLUITEN
                          <svg className="w-4 h-4 rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 15l7-7 7 7" /></svg>
                        </>
                      ) : (
                        <>
                          LEES MEER
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7" /></svg>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;

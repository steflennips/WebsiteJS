
import React, { useState } from 'react';

interface DetailedContent {
  expect: string;
  results: string[];
  resultsHeader?: string;
  cases: string[];
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
        "Een duidelijk overzicht van uw datastructuur",
        "Inzicht in datalekken, inefficiënte processen en verborgen kansen",
        "Concreet advies waar AI en automatisering direct waarde kunnen leveren"
      ],
      cases: [
        "Versnellen van rapportages, minder handmatig werk",
        "Ontdekken van bottlenecks en verspilling",
        "Inzicht in klantgedrag en nieuwe conversiekansen"
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
      resultsHeader: "Wat onze AI Agents kunnen",
      results: [
        "Automatisch documenten verwerken",
        "KPI’s monitoren en vroegtijdig afwijkingen signaleren",
        "Acties uitvoeren, workflows starten of rapporten genereren",
        "Antwoorden geven op bedrijfsinformatie met behulp van LLM’s"
      ],
      cases: [
        "Document-to-ERP automatisering",
        "Real-time fraudedetectie en notificaties",
        "Intelligente klantenservice op eigen kennisbank"
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
      resultsHeader: "Wat de Roadmap bevat",
      results: [
        "Een nulmeting van uw huidige situatie",
        "De grootste kansen voor AI en data‑optimalisatie",
        "De fasering: wat doet u eerst, en wat later?",
        "Kosteninschatting, impact en risico’s",
        "Een uitvoerbare planning die direct toepasbaar is"
      ],
      cases: [
        "Transformatie van familiebedrijf naar data-leider",
        "Opzetten van een gecentraliseerde data-unit",
        "Strategische inzet van AI voor marktuitbreiding"
      ]
    }
  }
];

const Services: React.FC = () => {
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);

  return (
    <section id="diensten" className="py-24 md:py-32 bg-slate-950 border-t border-white/5 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 md:mb-20 gap-6">
          <div className="max-w-xl text-left">
            <h2 className="text-[#00a3ff] font-black tracking-widest uppercase text-xs md:text-sm mb-3">Capabilities</h2>
            <p className="text-3xl md:text-5xl font-black text-white leading-tight">Expertise die uw <br className="hidden md:block"/> resultaat drijft.</p>
          </div>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6">
          {services.map((service, idx) => (
            <div key={idx} className="group relative p-1 rounded-[2rem] overflow-hidden transition-all hover:scale-[1.02]">
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-100"></div>
              <div className="relative h-full glass p-6 md:p-8 rounded-[2rem] flex flex-col justify-between hover:bg-white/[0.05] transition-colors">
                <div>
                  <span className={`inline-block px-3 py-1 rounded-full text-[9px] md:text-[10px] font-black tracking-widest uppercase mb-4 md:mb-6 ${service.color === 'blue' ? 'bg-blue-500/20 text-blue-400 border-blue-500/30' : service.color === 'purple' ? 'bg-purple-500/20 text-purple-400 border-purple-500/30' : 'bg-indigo-500/20 text-indigo-400 border-indigo-500/30'}`}>
                    {service.tag}
                  </span>
                  <h3 className="text-xl md:text-2xl font-black text-white mb-3 md:mb-4">{service.title}</h3>
                  <p className="text-slate-400 text-sm md:text-base font-medium leading-relaxed">
                    {service.description}
                  </p>
                </div>
                <div className="mt-6 md:mt-8 pt-6 md:pt-8 border-t border-white/5">
                  <button 
                    onClick={() => setSelectedIdx(idx)}
                    className="text-white font-bold text-sm flex items-center gap-2 group-hover:text-[#00a3ff] transition-colors"
                  >
                    LEES MEER
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Detail Overlay */}
      {selectedIdx !== null && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 md:p-10 animate-in fade-in duration-300">
          <div className="absolute inset-0 bg-slate-950/95 backdrop-blur-3xl" onClick={() => setSelectedIdx(null)}></div>
          
          <div className="relative w-full max-w-3xl max-h-[90vh] glass rounded-[2rem] md:rounded-[3rem] border-white/10 overflow-hidden shadow-[0_0_100px_rgba(0,0,0,0.8)] animate-in slide-in-from-bottom-10 duration-500 flex flex-col">
            {/* Close Button */}
            <button 
              onClick={() => setSelectedIdx(null)}
              className="absolute top-4 right-4 md:top-6 md:right-6 z-20 w-10 h-10 md:w-12 md:h-12 rounded-full bg-slate-900/50 border border-white/10 flex items-center justify-center text-white hover:bg-white/10 transition-colors backdrop-blur-md"
            >
              <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            </button>

            <div className="overflow-y-auto flex-1 p-6 md:p-16 space-y-8 md:space-y-12 bg-slate-950/50 scrollbar-hide">
              <div className="text-center mb-8">
                <span className="text-[9px] md:text-[10px] font-black tracking-[0.4em] text-[#00a3ff] uppercase mb-2 md:mb-3 block">{services[selectedIdx].tag}</span>
                <h4 className="text-3xl md:text-5xl font-black leading-tight tracking-tighter text-white">{services[selectedIdx].title}</h4>
                <div className="w-16 md:w-20 h-1 bg-gradient-to-r from-[#00a3ff] to-[#7b2ff7] mx-auto mt-4 md:mt-6"></div>
              </div>

              <section>
                <h5 className="text-[#00a3ff] text-[9px] md:text-[10px] font-black uppercase tracking-[0.25em] mb-4 md:mb-6 border-l-2 border-[#00a3ff] pl-4">In het kort</h5>
                <p className="text-slate-200 text-lg md:text-xl font-medium leading-relaxed">
                  {services[selectedIdx].details.expect}
                </p>
              </section>

              <section>
                <h5 className="text-[#7b2ff7] text-[9px] md:text-[10px] font-black uppercase tracking-[0.25em] mb-4 md:mb-6 border-l-2 border-[#7b2ff7] pl-4">
                  {services[selectedIdx].details.resultsHeader || "Resultaat"}
                </h5>
                <ul className="space-y-4 md:space-y-5">
                  {services[selectedIdx].details.results.map((res, i) => (
                    <li key={i} className="flex gap-4 md:gap-5 items-start text-slate-400 font-medium">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#7b2ff7] mt-[0.6rem] shrink-0 shadow-[0_0_10px_#7b2ff7]"></div>
                      <span className="text-sm md:text-lg">{res}</span>
                    </li>
                  ))}
                </ul>
              </section>

              <button 
                onClick={() => {
                   setSelectedIdx(null);
                   document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="w-full py-4 md:py-6 bg-white text-slate-950 font-black rounded-xl md:rounded-2xl shadow-2xl transition-all flex items-center justify-center gap-4 text-base md:text-lg"
              >
                PLAN GESPREK
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Services;

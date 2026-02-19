
import React, { useState, useRef, useEffect } from 'react';

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
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Zorg dat de pop-up inhoud altijd bovenaan begint bij openen
  useEffect(() => {
    if (selectedIdx !== null) {
      const timer = setTimeout(() => {
        if (scrollContainerRef.current) {
          scrollContainerRef.current.scrollTo({ top: 0, behavior: 'instant' });
        }
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [selectedIdx]);

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

      {/* Pop-up Overlay - Perfect Gecentreerd op Hoogte van de Blokken */}
      {selectedIdx !== null && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10 animate-in fade-in duration-300">
          {/* Donkere backdrop met blur */}
          <div className="absolute inset-0 bg-slate-950/90 backdrop-blur-md" onClick={() => setSelectedIdx(null)}></div>
          
          <div className="relative w-full max-w-4xl max-h-[85vh] glass rounded-[2.5rem] md:rounded-[3.5rem] border-white/10 shadow-2xl animate-in zoom-in-95 duration-300 flex flex-col overflow-hidden">
            
            {/* Header / Titel van de Pop-up */}
            <div className="px-8 md:px-14 py-8 border-b border-white/5 bg-slate-900/40 flex items-center justify-between shrink-0">
              <div className="space-y-1">
                <span className="text-[10px] md:text-xs font-black tracking-[0.3em] text-[#00a3ff] uppercase">{services[selectedIdx].tag}</span>
                <h4 className="text-2xl md:text-4xl font-black text-white tracking-tighter">{services[selectedIdx].title}</h4>
              </div>
              <button 
                onClick={() => setSelectedIdx(null)}
                className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-white/10 transition-all hover:scale-110 active:scale-95"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>

            {/* Scrollbare inhoud - Pop-up focus */}
            <div 
              ref={scrollContainerRef}
              className="overflow-y-auto flex-1 px-8 md:px-14 py-10 md:py-12 scrollbar-hide space-y-12 ios-scroll"
            >
              {/* De Focus Tekst */}
              <section className="animate-in fade-in slide-in-from-bottom-2 duration-500">
                <div className="p-8 md:p-10 bg-white/[0.03] rounded-[2rem] border-l-4 border-[#00a3ff] shadow-inner">
                   <p className="text-slate-100 text-lg md:text-2xl font-bold leading-relaxed">
                    {services[selectedIdx].details.expect}
                  </p>
                </div>
              </section>

              {/* Aanvullende Details / Checklist */}
              <section className="animate-in fade-in slide-in-from-bottom-4 duration-700">
                <h5 className="text-[#7b2ff7] text-[11px] font-black uppercase tracking-[0.25em] mb-8 flex items-center gap-4">
                  <span className="w-10 h-px bg-gradient-to-r from-[#7b2ff7] to-transparent"></span>
                  {services[selectedIdx].details.resultsHeader || "Focuspunten & Impact"}
                </h5>
                <div className="grid md:grid-cols-2 gap-4 md:gap-6">
                  {services[selectedIdx].details.results.map((res, i) => (
                    <li key={i} className="list-none flex gap-5 items-start text-slate-300 p-5 rounded-2xl bg-white/[0.02] border border-white/5">
                      <div className="w-7 h-7 rounded-lg bg-[#7b2ff7]/10 flex items-center justify-center shrink-0 mt-0.5">
                        <svg className="w-4 h-4 text-[#7b2ff7]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                      </div>
                      <span className="text-sm md:text-lg font-medium leading-snug">{res}</span>
                    </li>
                  ))}
                </div>
              </section>

              {/* Directe Actie in de pop-up */}
              <div className="pt-8 pb-4">
                <button 
                  onClick={() => {
                     setSelectedIdx(null);
                     document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="w-full py-6 bg-gradient-to-r from-[#00a3ff] to-[#7b2ff7] text-white font-black rounded-2xl shadow-2xl transition-all hover:scale-[1.01] hover:brightness-110 active:scale-[0.98] flex items-center justify-center gap-4 text-base md:text-xl uppercase tracking-widest group"
                >
                  BESPREEK DEZE OPLOSSING
                  <svg className="w-6 h-6 transform group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7m0 0l-5 5m5-5H6" /></svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Services;

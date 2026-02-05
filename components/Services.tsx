
import React, { useState } from 'react';

interface DetailedContent {
  expect: string;
  expectPoints: string[];
  results: string[];
  cases: string[];
  image: string;
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
      expectPoints: [
        "Scherpe analyse van uw huidige datafundament",
        "Brengen structuur en kansen in kaart",
        "Vinden het goud dat in uw processen verborgen ligt"
      ],
      results: [
        "Een duidelijk overzicht van uw datastructuur",
        "Inzicht in datalekken, inefficiënte processen en verborgen kansen",
        "Concreet advies waar AI en automatisering direct waarde kunnen leveren"
      ],
      cases: [
        "Versnellen van rapportages, minder handmatig werk",
        "Ontdekken van bottlenecks en verspilling",
        "Inzicht in klantgedrag en nieuwe conversiekansen"
      ],
      // Referentie naar de meegeleverde afbeelding
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1000" 
    }
  },
  {
    title: "Custom AI Agents",
    tag: "Development",
    description: "Geen standaard chatbots, maar slimme digitale collega’s die uw data begrijpen, beslissingen ondersteunen en acties uitvoeren alsof ze onderdeel van uw team zijn.",
    color: "purple",
    details: {
      expect: "Wij ontwikkelen maatwerk AI-oplossingen die naadloos integreren met uw bestaande workflows en data-bronnen.",
      expectPoints: [
        "Autonome agents voor complexe taken",
        "Integratie met ERP en CRM systemen",
        "Conversational interfaces voor uw data"
      ],
      results: [
        "Significante tijdsbesparing op repetitieve taken",
        "Foutreductie door intelligente automatisering",
        "24/7 beschikbaarheid van specialistische kennis"
      ],
      cases: [
        "Automatische lead-kwalificatie en opvolging",
        "Intelligente assistenten voor klantenservice",
        "Geautomatiseerde data-entry en verificatie"
      ],
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=1000"
    }
  },
  {
    title: "The Roadmap",
    tag: "Strategy",
    description: "Een helder, uitvoerbaar stappenplan dat uw organisatie brengt van waar u nu staat naar een toekomstbestendige, data‑gedreven koploper in uw sector.",
    color: "indigo",
    details: {
      expect: "Strategische begeleiding bij de overgang naar een data-centrische cultuur, inclusief technische architectuur en change management.",
      expectPoints: [
        "Lange-termijn visie op data en AI",
        "Prioritering van use-cases op basis van ROI",
        "Begeleiding bij selectie van tech-stack"
      ],
      results: [
        "Duidelijke roadmap voor de komende 12-24 maanden",
        "Draagvlak binnen de organisatie voor innovatie",
        "Voorspelbare investeringen in technologie"
      ],
      cases: [
        "Transformatie van familiebedrijf naar data-leider",
        "Opzetten van een gecentraliseerde data-unit",
        "Strategische inzet van AI voor marktuitbreiding"
      ],
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1000"
    }
  }
];

const Services: React.FC = () => {
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);

  return (
    <section id="diensten" className="py-32 bg-slate-950 border-t border-white/5 relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
          <div className="max-w-xl text-left">
            <h2 className="text-[#00a3ff] font-black tracking-widest uppercase text-sm mb-4">Capabilities</h2>
            <p className="text-4xl md:text-5xl font-black text-white leading-tight">Expertise die uw <br/> resultaat drijft.</p>
          </div>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6">
          {services.map((service, idx) => (
            <div key={idx} className="group relative p-1 rounded-3xl overflow-hidden transition-all hover:scale-[1.02]">
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-100"></div>
              <div className="relative h-full glass p-8 rounded-3xl flex flex-col justify-between hover:bg-white/[0.05] transition-colors">
                <div>
                  <span className={`inline-block px-3 py-1 rounded-full text-[10px] font-black tracking-widest uppercase mb-6 ${service.color === 'blue' ? 'bg-blue-500/20 text-blue-400 border-blue-500/30' : service.color === 'purple' ? 'bg-purple-500/20 text-purple-400 border-purple-500/30' : 'bg-indigo-500/20 text-indigo-400 border-indigo-500/30'}`}>
                    {service.tag}
                  </span>
                  <h3 className="text-2xl font-black text-white mb-4">{service.title}</h3>
                  <p className="text-slate-400 font-medium leading-relaxed">
                    {service.description}
                  </p>
                </div>
                <div className="mt-8 pt-8 border-t border-white/5">
                  <button 
                    onClick={() => setSelectedIdx(idx)}
                    className="text-white font-bold flex items-center gap-2 group-hover:text-[#00a3ff] transition-colors"
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
          <div className="absolute inset-0 bg-slate-950/90 backdrop-blur-2xl" onClick={() => setSelectedIdx(null)}></div>
          
          <div className="relative w-full max-w-6xl max-h-[90vh] glass rounded-[3rem] border-white/10 overflow-hidden flex flex-col md:flex-row shadow-2xl animate-in slide-in-from-bottom-10 duration-500">
            {/* Close Button */}
            <button 
              onClick={() => setSelectedIdx(null)}
              className="absolute top-6 right-6 z-20 w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-white/10 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            </button>

            {/* Image Side */}
            <div className="md:w-1/2 relative min-h-[300px]">
              <img 
                src={services[selectedIdx].details.image} 
                alt={services[selectedIdx].title}
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent md:bg-gradient-to-r"></div>
              <div className="absolute bottom-10 left-10 text-white">
                <span className="text-[10px] font-black tracking-widest uppercase opacity-60 mb-2 block">{services[selectedIdx].tag}</span>
                <h4 className="text-4xl font-black leading-none">{services[selectedIdx].title}</h4>
              </div>
            </div>

            {/* Content Side */}
            <div className="md:w-1/2 overflow-y-auto p-10 md:p-16 space-y-12">
              <section>
                <h5 className="text-[#00a3ff] text-xs font-black uppercase tracking-widest mb-4">Wat u kunt verwachten</h5>
                <p className="text-slate-200 text-lg font-medium leading-relaxed">
                  {services[selectedIdx].details.expect}
                </p>
              </section>

              <section>
                <h5 className="text-[#7b2ff7] text-xs font-black uppercase tracking-widest mb-4">Dit levert het op</h5>
                <ul className="space-y-4">
                  {services[selectedIdx].details.results.map((res, i) => (
                    <li key={i} className="flex gap-4 items-start text-slate-400 font-medium">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#7b2ff7] mt-2.5 shrink-0"></span>
                      {res}
                    </li>
                  ))}
                </ul>
              </section>

              <section>
                <h5 className="text-indigo-400 text-xs font-black uppercase tracking-widest mb-4">Voorbeelden uit de praktijk</h5>
                <ul className="space-y-4">
                  {services[selectedIdx].details.cases.map((cs, i) => (
                    <li key={i} className="flex gap-4 items-start text-slate-400 font-medium">
                      <svg className="w-5 h-5 text-indigo-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                      {cs}
                    </li>
                  ))}
                </ul>
              </section>

              <button 
                onClick={() => {
                   setSelectedIdx(null);
                   document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="w-full py-5 bg-gradient-to-r from-[#00a3ff] to-[#7b2ff7] text-white font-black rounded-2xl shadow-xl hover:opacity-90 transition-all flex items-center justify-center gap-3"
              >
                BESPREEK DIT MET ONS
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7m0 0l-5 5m5-5H6" /></svg>
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Services;

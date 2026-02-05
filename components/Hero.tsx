
import React, { useState, useEffect } from 'react';

const slides = [
  {
    titleUpper: "DATA GEDREVEN",
    titleLower: "IMPACT.",
    description: "Wij ondersteunen de transformatie naar een organisatie die data inzet om sneller te handelen, slimmer te verbeteren en proactief bij te sturen.",
    accentClass: "text-transparent bg-clip-text bg-gradient-to-r from-[#00a3ff] to-[#7b2ff7]"
  },
  {
    titleUpper: "AI GEDREVEN",
    titleLower: "GROEI.",
    description: "Wij helpen organisaties AI toepassen om sneller te groeien, dankzij slimme LLM‑oplossingen en krachtige AI‑agents die werk uit handen nemen.",
    accentClass: "text-[#4ade80]"
  }
];

const Hero: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setIsExiting(true);
      setTimeout(() => {
        setCurrentSlide((prev) => (prev === 0 ? 1 : 0));
        setIsExiting(false);
      }, 500); // Tijd voor de fade-out
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center pt-24 overflow-hidden">
      {/* Prism Background */}
      <div className="absolute top-0 left-0 w-full h-full -z-10 pointer-events-none opacity-50">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-[#00a3ff]/10 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-[#7b2ff7]/10 blur-[120px] rounded-full"></div>
        <div className="absolute inset-0 overflow-hidden">
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[1px] bg-white/5 rotate-45"></div>
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[1px] bg-white/5 -rotate-45"></div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
        <div className={`transition-all duration-700 transform ${isExiting ? 'opacity-0 -translate-y-4 scale-95' : 'opacity-100 translate-y-0 scale-100'}`}>
          <h1 className="text-6xl md:text-9xl font-heading font-bold text-white tracking-tighter mb-8 leading-[0.9] flex flex-col">
            <span>{slides[currentSlide].titleUpper}</span>
            <span className={`uppercase ${slides[currentSlide].accentClass}`}>
              {slides[currentSlide].titleLower}
            </span>
          </h1>
          
          <p className="max-w-3xl mx-auto text-lg md:text-xl text-slate-400 mb-14 font-medium leading-relaxed min-h-[4rem]">
            {slides[currentSlide].description}
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
          <a href="#assessment" className="w-full sm:w-auto px-10 py-5 bg-gradient-to-r from-[#00a3ff] to-[#7b2ff7] text-white rounded-lg font-black text-lg shadow-[0_10px_40px_rgba(123,47,247,0.3)] hover:opacity-90 transition-all hover:-translate-y-1 flex items-center justify-center gap-3">
            START GRATIS DATA SCAN
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7m0 0l-5 5m5-5H6" /></svg>
          </a>
          <a href="#diensten" className="w-full sm:w-auto px-10 py-5 border border-white/10 hover:border-indigo-500/50 hover:bg-indigo-500/5 text-white rounded-lg font-bold text-lg transition-all">
            ONTDEK ONZE DIENSTEN
          </a>
        </div>

        {/* Carousel Indicators */}
        <div className="flex justify-center gap-3 mt-16">
          {slides.map((_, idx) => (
            <div 
              key={idx}
              className={`h-1 transition-all duration-500 rounded-full ${currentSlide === idx ? 'w-12 bg-indigo-500' : 'w-4 bg-white/10'}`}
            ></div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;

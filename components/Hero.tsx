
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

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setIsExiting(true);
      setTimeout(() => {
        setCurrentSlide((prev) => (prev === 0 ? 1 : 0));
        setIsExiting(false);
      }, 500);
    }, 7000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative min-h-[85dvh] flex items-center justify-center pt-24 pb-12 overflow-hidden">
      {/* Prism Background */}
      <div className="absolute top-0 left-0 w-full h-full -z-10 pointer-events-none opacity-50">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#00a3ff]/10 blur-[100px] rounded-full"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-[#7b2ff7]/10 blur-[100px] rounded-full"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
        <div className={`transition-all duration-700 transform ${isExiting ? 'opacity-0 -translate-y-4 scale-95' : 'opacity-100 translate-y-0 scale-100'}`}>
          <h1 className="text-3xl sm:text-6xl md:text-8xl lg:text-9xl font-heading font-bold text-white tracking-tighter mb-6 md:mb-8 leading-[1.1] md:leading-[0.9] flex flex-col">
            <span className="break-words">{slides[currentSlide].titleUpper}</span>
            <span className={`uppercase ${slides[currentSlide].accentClass}`}>
              {slides[currentSlide].titleLower}
            </span>
          </h1>
          
          <p className="max-w-2xl mx-auto text-sm md:text-xl text-slate-400 mb-8 md:mb-14 font-medium leading-relaxed min-h-[5rem]">
            {slides[currentSlide].description}
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-6">
          <a href="#assessment" className="w-full sm:w-auto px-8 md:px-10 py-4 md:py-5 bg-gradient-to-r from-[#00a3ff] to-[#7b2ff7] text-white rounded-xl font-black text-base md:text-lg shadow-[0_10px_40px_rgba(123,47,247,0.3)] hover:opacity-90 transition-all hover:-translate-y-1 flex items-center justify-center gap-3">
            GRATIS DATA SCAN
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7m0 0l-5 5m5-5H6" /></svg>
          </a>
          <a href="#diensten" className="w-full sm:w-auto px-8 md:px-10 py-4 md:py-5 border border-white/10 hover:border-indigo-500/50 hover:bg-white/5 text-white rounded-xl font-bold text-base md:text-lg transition-all">
            DIENSTEN
          </a>
        </div>

        <div className="flex justify-center gap-3 mt-12 md:mt-16">
          {slides.map((_, idx) => (
            <div 
              key={idx}
              className={`h-1 transition-all duration-500 rounded-full ${currentSlide === idx ? 'w-10 md:w-12 bg-indigo-500' : 'w-3 md:w-4 bg-white/10'}`}
            ></div>
          ))}
        </div>
      </div>
    </section>
  );
}

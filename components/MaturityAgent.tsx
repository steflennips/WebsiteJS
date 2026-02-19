
import React, { useState, useRef, useEffect } from 'react';
import { chatWithAgent, GEMINI_MODEL } from '../services/gemini';
import { Message, MaturityResult } from '../types';

const MaturityAgent: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', text: 'Jacques en Stef zijn er even niet. Ik sta voor u klaar.\n\nOm uw datavolwassenheid te bepalen en AI-kansen te identificeren, begin ik graag bij de kern: Hoe zijn binnen uw organisatie de belangrijkste KPI’s (kritieke prestatie-indicatoren) momenteel gedefinieerd en hoe worden deze vastgelegd?' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<MaturityResult | null>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const isFirstRender = useRef(true);

  const currentStep = Math.min(7, Math.ceil((messages.length) / 2));

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTo({
        top: chatContainerRef.current.scrollHeight,
        behavior: "smooth"
      });
    }
  }, [messages, isTyping]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isTyping || result) return;

    setError(null);
    const userInput = input;
    const userMessage: Message = { role: 'user', text: userInput };
    
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    try {
      const response = await chatWithAgent([...messages, userMessage], userInput);
      setIsTyping(false);

      const resultMatch = response.match(/\[RESULT\]\s*(\{.*\})/s);
      if (resultMatch) {
        try {
          const parsedResult = JSON.parse(resultMatch[1]);
          setResult(parsedResult);
          const cleanText = response.replace(/\[RESULT\].*/s, '').trim();
          setMessages(prev => [...prev, { role: 'model', text: cleanText }]);
        } catch (err) {
          setMessages(prev => [...prev, { role: 'model', text: response }]);
        }
      } else {
        setMessages(prev => [...prev, { role: 'model', text: response }]);
      }
    } catch (err: any) {
      setIsTyping(false);
      if (err.message === "API_KEY_MISSING") {
        setError("Systeemfout: De API_KEY is niet geladen.");
      } else {
        setError("Verbindingsfout met de Deux2Qonnect Engine.");
      }
    }
  };

  return (
    <section id="assessment" className="py-16 md:py-32 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-12 gap-10 md:gap-16 items-start">
          <div className="lg:col-span-5 space-y-6 md:space-y-10">
            <div>
              <h3 className="text-3xl md:text-6xl font-heading font-bold text-white mb-4 md:mb-8 leading-tight">
                Bepaal uw <span className="text-gradient">Data DNA</span>.
              </h3>
              <p className="text-slate-400 text-sm md:text-lg leading-relaxed font-medium">
                Onze AI Agent analyseert uw organisatie in real-time. Start de scan hiernaast.
              </p>
            </div>

            <div className="space-y-3 md:space-y-6">
               {[
                 { t: "KPI Analyse", d: "Hoe stuurbaar is uw business?" },
                 { t: "Flow Validatie", d: "Waar stokt de informatie?" },
                 { t: "AI Readiness", d: "Klaar voor de volgende stap?" }
               ].map((item, i) => (
                 <div key={i} className="flex gap-4 p-3 md:p-5 rounded-2xl bg-white/5 border border-white/5 group hover:border-indigo-500/30 transition-all">
                   <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#00a3ff] to-[#7b2ff7] flex items-center justify-center text-white font-bold group-hover:scale-110 transition-transform shrink-0 text-xs">
                     0{i+1}
                   </div>
                   <div>
                     <h4 className="text-white font-bold text-xs md:text-sm uppercase tracking-wide">{item.t}</h4>
                     <p className="text-slate-500 text-[10px] md:text-sm font-medium">{item.d}</p>
                   </div>
                 </div>
               ))}
            </div>
          </div>

          <div className="lg:col-span-7 w-full">
            <div className="glass rounded-[2rem] md:rounded-[2.5rem] border-white/10 overflow-hidden flex flex-col h-[500px] md:h-[700px] relative shadow-2xl">
              <div className="bg-slate-900/80 p-3 md:p-6 border-b border-white/5 flex items-center justify-between backdrop-blur-md z-10 shrink-0">
                <div className="flex items-center gap-2 md:gap-4">
                  <div className="flex gap-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-red-500/50"></div>
                    <div className="w-1.5 h-1.5 rounded-full bg-amber-500/50"></div>
                    <div className="w-1.5 h-1.5 rounded-full bg-indigo-500/50"></div>
                  </div>
                  <div className="h-4 w-px bg-white/10 mx-1"></div>
                  <span className="px-1.5 py-0.5 bg-indigo-500/20 text-indigo-400 text-[8px] font-black rounded uppercase tracking-widest">
                    {GEMINI_MODEL}
                  </span>
                </div>
                {!result && (
                  <div className="flex items-center gap-2">
                    <span className="text-[8px] md:text-[10px] font-bold text-slate-500 uppercase">SCAN</span>
                    <div className="w-16 md:w-32 h-1 bg-slate-800 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-[#00a3ff] to-[#7b2ff7] transition-all duration-500" 
                        style={{ width: `${(currentStep / 7) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                )}
              </div>

              <div 
                ref={chatContainerRef}
                className="flex-1 overflow-y-auto p-4 md:p-8 space-y-4 scrollbar-hide bg-slate-950/30 ios-scroll"
              >
                {messages.map((m, i) => (
                  <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[90%] md:max-w-[85%] p-3 md:p-5 rounded-2xl ${
                      m.role === 'user' 
                      ? 'bg-gradient-to-r from-[#00a3ff] to-[#7b2ff7] text-white font-bold shadow-md rounded-tr-none' 
                      : 'bg-slate-900/80 text-slate-200 border border-white/5 font-medium rounded-tl-none backdrop-blur-sm'
                    }`}>
                      <p className="text-xs md:text-base whitespace-pre-wrap">{m.text}</p>
                    </div>
                  </div>
                ))}
                
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-slate-900/50 px-4 py-3 rounded-2xl border border-white/10 flex flex-col gap-1">
                      <div className="flex gap-1">
                        <div className="w-1 h-1 rounded-full bg-[#00a3ff] animate-bounce"></div>
                        <div className="w-1 h-1 rounded-full bg-[#7b2ff7] animate-bounce delay-150"></div>
                        <div className="w-1 h-1 rounded-full bg-indigo-500 animate-bounce delay-300"></div>
                      </div>
                      <span className="text-[7px] font-black text-indigo-400 uppercase tracking-widest">Processing</span>
                    </div>
                  </div>
                )}

                {result && (
                  <div className="p-5 md:p-8 bg-gradient-to-br from-[#00a3ff] to-[#7b2ff7] rounded-3xl text-white shadow-2xl mt-4 animate-in zoom-in duration-500">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="text-4xl md:text-7xl font-heading font-black bg-white text-[#7b2ff7] w-16 h-16 md:w-28 md:h-28 rounded-2xl flex items-center justify-center shrink-0">
                        {result.level}
                      </div>
                      <div>
                        <h4 className="text-xl md:text-3xl font-black uppercase tracking-tighter leading-none mb-1">{result.label}</h4>
                        <p className="text-[8px] md:text-[10px] font-black uppercase tracking-widest opacity-80">Maturity Score</p>
                      </div>
                    </div>
                    <p className="text-xs md:text-lg font-bold mb-6 italic opacity-90 leading-relaxed">
                      "{result.description}"
                    </p>
                    <div className="space-y-2 mb-8">
                      {result.recommendations.map((rec, i) => (
                        <div key={i} className="flex gap-3 text-[10px] md:text-sm font-bold items-start bg-white/10 p-2.5 rounded-lg">
                          <span className="bg-white text-[#7b2ff7] w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 text-[8px] mt-0.5">{i+1}</span>
                          <span>{rec}</span>
                        </div>
                      ))}
                    </div>
                    <button 
                      onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })} 
                      className="w-full py-4 bg-white text-[#7b2ff7] font-black rounded-xl text-sm md:text-lg shadow-xl"
                    >
                      STRATEGIE BESPREKEN
                    </button>
                  </div>
                )}
              </div>

              {!result && (
                <div className="p-4 md:p-8 bg-slate-900/50 border-t border-white/5 shrink-0">
                  <form onSubmit={handleSubmit} className="flex gap-2 md:gap-4">
                    <input
                      type="text"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      placeholder={isTyping ? "Engine denkt na..." : "Typ uw antwoord..."}
                      /* iOS Zoom Fix: text-base (16px) voorkomt automatisch inzoomen in Safari */
                      className="flex-1 bg-slate-950/80 border border-white/10 rounded-xl md:rounded-2xl px-4 md:px-6 py-3 md:py-4 text-base md:text-base text-white focus:outline-none focus:border-indigo-500/50 transition-all font-medium"
                      disabled={isTyping}
                    />
                    <button
                      type="submit"
                      disabled={isTyping || !input.trim()}
                      className="bg-gradient-to-r from-[#00a3ff] to-[#7b2ff7] text-white px-4 md:px-8 py-3 md:py-4 rounded-xl md:rounded-2xl font-black transition-all active:scale-95 disabled:opacity-20 flex items-center justify-center"
                    >
                      <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7m0 0l-5 5m5-5H6" /></svg>
                    </button>
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MaturityAgent;


import React, { useState, useRef, useEffect } from 'react';
import { chatWithAgent } from '../services/gemini';
import { Message, MaturityResult } from '../types';

const MaturityAgent: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', text: 'Systeem NexusData v3.0 online. Ik ben uw Senior AI Auditor.\n\nOm uw datavolwassenheid te bepalen en AI-kansen te identificeren, begin ik graag bij de kern: Hoe zijn binnen uw organisatie de belangrijkste KPI’s (kritieke prestatie-indicatoren) momenteel gedefinieerd en hoe worden deze vastgelegd?' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<MaturityResult | null>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const currentStep = Math.min(7, Math.ceil((messages.length) / 2));

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
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
        setError("Systeemfout: De API_KEY is niet geladen. Ga naar Vercel Settings -> Environment Variables, controleer de sleutel 'API_KEY', en klik daarna op 'Redeploy' bij je laatste build.");
      } else {
        setError("Verbindingsfout met de NexusData Engine. Controleer uw internetverbinding of de status van de API.");
      }
    }
  };

  return (
    <section id="assessment" className="py-32 relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-12 gap-16 items-start">
          <div className="lg:col-span-5 space-y-10">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-black tracking-widest uppercase mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                AI Diagnostic Unit
              </div>
              <h3 className="text-5xl md:text-6xl font-heading font-bold text-white mb-8 leading-[1.1]">
                Bepaal uw <span className="text-emerald-400">Data DNA</span>.
              </h3>
              <p className="text-slate-400 text-lg leading-relaxed font-medium">
                Onze AI Auditor analyseert in maximaal 7 vragen hoe uw organisatie scoort op het gebied van data-volwassenheid en waar de grootste AI-kansen liggen.
              </p>
            </div>

            <div className="space-y-6">
               {[
                 { t: "KPI Analyse", d: "Hoe betrouwbaar is uw sturing?" },
                 { t: "Flow Validatie", d: "Waar stokt de informatievoorziening?" },
                 { t: "AI Readiness", d: "Bent u klaar voor autonome agents?" }
               ].map((item, i) => (
                 <div key={i} className="flex gap-5 p-4 rounded-2xl bg-white/5 border border-white/5 group hover:border-emerald-500/30 transition-all">
                   <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-500 font-bold group-hover:scale-110 transition-transform shrink-0">
                     0{i+1}
                   </div>
                   <div>
                     <h4 className="text-white font-bold text-sm uppercase tracking-wide">{item.t}</h4>
                     <p className="text-slate-500 text-sm font-medium">{item.d}</p>
                   </div>
                 </div>
               ))}
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="glass rounded-[2.5rem] border-white/10 overflow-hidden flex flex-col h-[700px] relative shadow-2xl">
              <div className="bg-slate-900/80 p-6 border-b border-white/5 flex items-center justify-between backdrop-blur-md z-10">
                <div className="flex items-center gap-4">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
                    <div className="w-3 h-3 rounded-full bg-amber-500/50"></div>
                    <div className="w-3 h-3 rounded-full bg-emerald-500/50"></div>
                  </div>
                  <div className="h-4 w-px bg-white/10 mx-2"></div>
                  <span className="text-[10px] font-black tracking-[0.3em] text-slate-500 uppercase">AUDIT_SESSION_v3.0</span>
                </div>
                {!result && (
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] font-bold text-slate-500 uppercase">Voortgang</span>
                    <div className="w-32 h-1.5 bg-slate-800 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-emerald-500 transition-all duration-500" 
                        style={{ width: `${(currentStep / 7) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                )}
              </div>

              <div className="flex-1 overflow-y-auto p-8 space-y-6 scrollbar-hide bg-slate-950/30">
                {messages.map((m, i) => (
                  <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[85%] p-5 rounded-2xl ${
                      m.role === 'user' 
                      ? 'bg-emerald-500 text-slate-950 font-bold shadow-lg rounded-tr-none' 
                      : 'bg-slate-900/80 text-slate-200 border border-white/5 leading-relaxed font-medium rounded-tl-none backdrop-blur-sm'
                    }`}>
                      <p className="text-sm md:text-base whitespace-pre-wrap">{m.text}</p>
                    </div>
                  </div>
                ))}
                
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-slate-900/50 px-6 py-4 rounded-2xl border border-white/10 flex gap-2">
                      <div className="w-2 h-2 rounded-full bg-emerald-500 animate-bounce"></div>
                      <div className="w-2 h-2 rounded-full bg-emerald-500 animate-bounce delay-150"></div>
                      <div className="w-2 h-2 rounded-full bg-emerald-500 animate-bounce delay-300"></div>
                    </div>
                  </div>
                )}

                {error && (
                  <div className="p-6 bg-red-500/10 border border-red-500/20 rounded-2xl text-red-400 text-sm font-bold flex gap-4 items-center animate-pulse">
                    <svg className="w-6 h-6 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                    <p>{error}</p>
                  </div>
                )}

                {result && (
                  <div className="p-8 bg-emerald-500 rounded-[2rem] text-slate-950 animate-in zoom-in duration-500 shadow-2xl mt-10">
                    <div className="flex flex-col sm:flex-row items-center gap-8 mb-10">
                      <div className="text-7xl font-heading font-black bg-slate-950 text-emerald-400 w-28 h-28 rounded-3xl flex items-center justify-center shadow-2xl shrink-0 rotate-3">
                        {result.level}
                      </div>
                      <div className="text-center sm:text-left">
                        <h4 className="text-3xl font-black uppercase tracking-tighter leading-none mb-1">{result.label}</h4>
                        <p className="text-[10px] font-black uppercase tracking-[0.2em] opacity-60">Nexus Maturity Score</p>
                      </div>
                    </div>
                    
                    <div className="bg-slate-950/10 p-5 rounded-xl mb-8 border border-slate-950/5">
                      <p className="font-bold text-lg leading-relaxed">
                        "{result.description}"
                      </p>
                    </div>

                    <div className="space-y-4 mb-10">
                      <p className="text-[10px] font-black uppercase tracking-[0.2em] opacity-50">Strategische Aanbevelingen</p>
                      {result.recommendations.map((rec, i) => (
                        <div key={i} className="flex gap-4 text-sm font-bold items-start bg-slate-950/5 p-3 rounded-lg">
                          <span className="bg-slate-950 text-emerald-400 w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 text-[10px] mt-0.5">{i+1}</span>
                          <span>{rec}</span>
                        </div>
                      ))}
                    </div>

                    <button 
                      onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })} 
                      className="w-full py-5 bg-slate-950 text-white font-black rounded-xl hover:bg-slate-900 transition-all flex items-center justify-center gap-4 text-lg shadow-2xl group"
                    >
                      PLAN IMPACT SESSIE
                      <svg className="w-6 h-6 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
                    </button>
                  </div>
                )}
                <div ref={chatEndRef} />
              </div>

              {!result && (
                <form onSubmit={handleSubmit} className="p-8 bg-slate-900/50 backdrop-blur-md border-t border-white/5 flex gap-4">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder={isTyping ? "Auditor analyseert..." : "Typ uw antwoord..."}
                    className="flex-1 bg-slate-950/80 border border-white/10 rounded-2xl px-6 py-5 text-white focus:outline-none focus:border-emerald-500/50 transition-all font-medium placeholder:text-slate-700"
                    disabled={isTyping}
                  />
                  <button
                    type="submit"
                    disabled={isTyping || !input.trim()}
                    className="bg-emerald-500 text-slate-950 px-8 py-5 rounded-2xl font-black hover:bg-emerald-400 transition-all active:scale-95 disabled:opacity-20 flex items-center justify-center"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 10l7-7m0 0l7 7m-7-7v18" /></svg>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MaturityAgent;

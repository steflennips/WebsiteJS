
import React, { useState, useRef, useEffect } from 'react';
import { chatWithAgent } from '../services/gemini';
import { Message, MaturityResult } from '../types';

const MaturityAgent: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', text: 'Systeem NexusData v2.5 online. Ik ben uw AI Auditor.\n\nLaten we uw datavolwassenheid bepalen. Hoe zijn binnen uw organisatie de belangrijkste KPI’s momenteel gedefinieerd en hoe worden deze vastgelegd?' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<MaturityResult | null>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isTyping) return;

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
        setError("De API_KEY is niet geladen. Zorg dat je in Vercel een variabele 'VITE_API_KEY' hebt aangemaakt (negeer de waarschuwing) en doe een nieuwe 'Redeploy'.");
      } else {
        setError("Verbindingsfout met NexusData AI. Controleer uw internetverbinding of API instellingen.");
      }
    }
  };

  return (
    <section id="assessment" className="py-32 relative">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid lg:grid-cols-5 gap-16 items-start">
          
          <div className="lg:col-span-2 space-y-10">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-black tracking-widest uppercase mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                Diagnostic Engine Active
              </div>
              <h3 className="text-5xl font-heading font-bold text-white mb-8 leading-[1.1]">Ontdek uw <br/><span className="text-emerald-400">Data Impact</span>.</h3>
              <p className="text-slate-400 text-lg leading-relaxed font-medium">
                Onze AI Auditor analyseert in 7 stappen waar uw MKB-bedrijf staat. Geen rapporten van weken, maar direct strategisch inzicht.
              </p>
            </div>

            <div className="space-y-4">
               {[
                 { t: "KPI Analyse", d: "Meetbaarheid van succes" },
                 { t: "Tooling Check", d: "Software & Data flows" },
                 { t: "AI Readiness", d: "Kansen voor automatisering" }
               ].map((item, i) => (
                 <div key={i} className="flex gap-4 p-5 rounded-2xl bg-white/5 border border-white/5 hover:border-emerald-500/30 transition-all group">
                   <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-500 font-bold group-hover:scale-110 transition-transform">
                     {i+1}
                   </div>
                   <div>
                     <h4 className="text-white font-bold text-sm">{item.t}</h4>
                     <p className="text-slate-500 text-xs font-medium">{item.d}</p>
                   </div>
                 </div>
               ))}
            </div>
          </div>

          <div className="lg:col-span-3">
            <div className="glass rounded-[2rem] border-white/10 overflow-hidden flex flex-col h-[750px] relative shadow-2xl">
              
              <div className="bg-slate-900/80 p-6 border-b border-white/5 flex items-center justify-between backdrop-blur-md">
                <div className="flex items-center gap-4">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-slate-700"></div>
                    <div className="w-3 h-3 rounded-full bg-slate-700"></div>
                    <div className="w-3 h-3 rounded-full bg-slate-700"></div>
                  </div>
                  <span className="text-[10px] font-black tracking-[0.3em] text-slate-500 uppercase ml-4">NEXUS_AUDIT_V2.5</span>
                </div>
                {messages.length > 1 && !result && (
                  <div className="text-[10px] font-bold text-slate-500">
                    STAP {Math.min(7, Math.ceil(messages.length / 2))} VAN 7
                  </div>
                )}
              </div>

              <div className="flex-1 overflow-y-auto p-8 space-y-8 scrollbar-hide bg-slate-950/20">
                {messages.map((m, i) => (
                  <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[85%] p-6 rounded-2xl ${
                      m.role === 'user' 
                      ? 'bg-emerald-500 text-slate-950 font-bold shadow-lg' 
                      : 'bg-slate-900/80 text-slate-200 border border-white/5 leading-relaxed font-medium'
                    }`}>
                      <p className="text-sm md:text-base whitespace-pre-wrap">{m.text}</p>
                    </div>
                  </div>
                ))}
                
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-slate-900/50 px-6 py-4 rounded-2xl border border-white/10">
                      <div className="flex gap-1.5">
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-bounce"></div>
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-bounce delay-150"></div>
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-bounce delay-300"></div>
                      </div>
                    </div>
                  </div>
                )}

                {error && (
                  <div className="p-6 bg-red-500/10 border border-red-500/20 rounded-2xl text-red-400 text-sm font-bold flex gap-4 items-center">
                    <svg className="w-6 h-6 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                    <p>{error}</p>
                  </div>
                )}

                {result && (
                  <div className="p-10 bg-emerald-500 rounded-[2.5rem] text-slate-950 animate-in zoom-in duration-700 shadow-2xl">
                    <div className="flex flex-col sm:flex-row items-center gap-8 mb-10">
                      <div className="text-7xl font-heading font-black bg-slate-950 text-emerald-400 w-32 h-32 rounded-full flex items-center justify-center shadow-2xl shrink-0">
                        {result.level}
                      </div>
                      <div className="text-center sm:text-left">
                        <h4 className="text-4xl font-black uppercase tracking-tighter leading-none mb-2">{result.label}</h4>
                        <p className="text-xs font-black uppercase tracking-widest opacity-40">Nexus Maturity Index</p>
                      </div>
                    </div>
                    
                    <div className="bg-slate-950/5 p-6 rounded-2xl mb-10 border border-slate-950/10">
                      <p className="font-bold text-lg leading-relaxed italic">"{result.description}"</p>
                    </div>

                    <div className="space-y-4 mb-10">
                      <p className="text-[10px] font-black uppercase tracking-[0.2em] opacity-40">Strategische Aanbevelingen</p>
                      {result.recommendations.map((rec, i) => (
                        <div key={i} className="flex gap-4 text-sm font-bold items-start">
                          <span className="bg-slate-950 text-emerald-400 w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 text-[10px] mt-0.5">{i+1}</span>
                          <span className="pt-0.5">{rec}</span>
                        </div>
                      ))}
                    </div>

                    <button 
                      onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })} 
                      className="w-full py-6 bg-slate-950 text-white font-black rounded-2xl hover:bg-slate-900 transition-all flex items-center justify-center gap-4 text-lg shadow-2xl group"
                    >
                      PLAN GRATIS STRATEGIE-SESSIE
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
                    placeholder="Uw antwoord hier..."
                    className="flex-1 bg-slate-950/80 border border-white/10 rounded-2xl px-6 py-5 text-white focus:outline-none focus:border-emerald-500/50 transition-all font-medium"
                    disabled={isTyping}
                  />
                  <button
                    type="submit"
                    disabled={isTyping || !input.trim()}
                    className="bg-emerald-500 text-slate-950 px-10 py-5 rounded-2xl font-black hover:bg-emerald-400 transition-all active:scale-95 disabled:opacity-20 flex items-center gap-2 uppercase tracking-widest text-xs"
                  >
                    SEND
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

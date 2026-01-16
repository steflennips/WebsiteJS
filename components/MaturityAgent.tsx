
import React, { useState, useRef, useEffect } from 'react';
import { chatWithAgent } from '../services/gemini';
import { Message, MaturityResult } from '../types';

const MaturityAgent: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', text: 'Systeem geïnitialiseerd. Welkom bij de NexusData Intelligence Audit (v2.5).\n\nIk ben hier om uw datavolwassenheid in kaart te brengen. Laten we beginnen bij de basis: Hoe zijn binnen jullie organisatie de belangrijkste KPI’s of meetwaarden momenteel gedefinieerd en vastgelegd?' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [result, setResult] = useState<MaturityResult | null>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isTyping) return;

    const userInput = input;
    const userMessage: Message = { role: 'user', text: userInput };
    
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Stuur de volledige geschiedenis mee voor context
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
  };

  return (
    <section id="assessment" className="py-32 relative">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid lg:grid-cols-5 gap-12 items-start">
          
          <div className="lg:col-span-2 space-y-8">
            <div className="p-1 inline-block bg-emerald-500/20 border border-emerald-500/30 rounded text-emerald-400 text-[10px] font-black tracking-widest uppercase mb-4">
              AI-Powered Audit
            </div>
            <h3 className="text-4xl md:text-5xl font-heading font-bold text-white mb-6 leading-tight">Meet uw <span className="text-emerald-400">Data Impact</span></h3>
            <p className="text-slate-400 text-lg leading-relaxed font-medium">
              Onze AI-medewerker analyseert in minder dan 5 minuten waar uw MKB-bedrijf staat. 
              U ontvangt direct een score en een strategisch advies voor de volgende stap.
            </p>
            <div className="space-y-4">
               {[
                 "Direct inzicht in datavolwassenheid",
                 "Gepersonaliseerd groeiplan",
                 "Advies over AI-agent inzetbaarheid"
               ].map((item, i) => (
                 <div key={i} className="flex items-center gap-3 text-slate-300 font-bold text-sm">
                   <svg className="w-5 h-5 text-emerald-500" fill="currentColor" viewBox="0 0 20 20"><path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" /></svg>
                   {item}
                 </div>
               ))}
            </div>
          </div>

          <div className="lg:col-span-3">
            <div className="glass rounded-2xl border-white/10 overflow-hidden flex flex-col h-[700px] relative shadow-2xl">
              {isTyping && <div className="absolute inset-0 pointer-events-none z-20 scanning-line opacity-20"></div>}
              
              <div className="bg-slate-900/95 p-5 border-b border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
                    <div className="w-3 h-3 rounded-full bg-emerald-500/50"></div>
                  </div>
                  <span className="text-[10px] font-bold tracking-[0.2em] text-slate-500 uppercase ml-4">NEXUS_AUDIT_TERMINAL_V2.5</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                  <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest">Live Connect</span>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto p-8 space-y-8 scrollbar-hide bg-slate-950/40">
                {messages.map((m, i) => (
                  <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[85%] p-5 rounded-2xl ${
                      m.role === 'user' 
                      ? 'bg-emerald-600 text-slate-950 font-bold shadow-lg' 
                      : 'bg-slate-900 text-slate-200 border border-white/5 leading-relaxed font-medium'
                    }`}>
                      <p className="text-sm md:text-base whitespace-pre-wrap">{m.text}</p>
                    </div>
                  </div>
                ))}
                
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-slate-900 px-5 py-4 rounded-xl border border-white/5 flex items-center gap-3">
                      <div className="flex gap-1">
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-bounce"></div>
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-bounce delay-100"></div>
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-bounce delay-200"></div>
                      </div>
                    </div>
                  </div>
                )}

                {result && (
                  <div className="p-8 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-3xl text-slate-950 animate-in zoom-in duration-500 shadow-2xl">
                    <div className="flex items-center gap-6 mb-8">
                      <div className="text-6xl font-heading font-black bg-slate-950 text-emerald-400 px-8 py-4 rounded-3xl shadow-xl">
                        {result.level}
                      </div>
                      <div>
                        <h4 className="text-3xl font-black uppercase tracking-tight leading-none">{result.label}</h4>
                        <p className="text-xs font-bold uppercase tracking-[0.2em] opacity-60 mt-2">Maturity Score Index</p>
                      </div>
                    </div>
                    
                    <div className="bg-slate-950/10 p-6 rounded-2xl mb-8 border border-slate-950/10">
                      <p className="font-bold text-lg leading-relaxed italic">
                        "{result.description}"
                      </p>
                    </div>

                    <div className="space-y-4 mb-10">
                      <p className="text-xs font-black uppercase tracking-widest opacity-60">Strategische Aanbevelingen:</p>
                      {result.recommendations.map((rec, i) => (
                        <div key={i} className="flex gap-4 text-sm font-bold items-start">
                          <span className="bg-slate-950 text-emerald-400 w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 text-[10px]">0{i+1}</span>
                          <span className="pt-0.5">{rec}</span>
                        </div>
                      ))}
                    </div>

                    <button 
                      onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })} 
                      className="w-full py-5 bg-slate-950 text-white font-black rounded-2xl hover:bg-slate-900 transition-all flex items-center justify-center gap-3 shadow-xl"
                    >
                      DOWNLOAD STRATEGIE RAPPORT
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                    </button>
                  </div>
                )}
                <div ref={chatEndRef} />
              </div>

              {!result && (
                <form onSubmit={handleSubmit} className="p-6 bg-slate-900 border-t border-white/5 flex gap-4">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Typ hier uw antwoord..."
                    className="flex-1 bg-slate-950 border border-white/10 rounded-xl px-6 py-4 text-white focus:outline-none focus:border-emerald-500/50 transition-all font-medium"
                    disabled={isTyping}
                  />
                  <button
                    type="submit"
                    disabled={isTyping || !input.trim()}
                    className="bg-emerald-500 text-slate-950 px-8 py-4 rounded-xl font-black hover:bg-emerald-400 transition-all active:scale-95 disabled:opacity-20"
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

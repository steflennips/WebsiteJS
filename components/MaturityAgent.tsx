
import React, { useState, useRef, useEffect } from 'react';
import { chatWithAgent } from '../services/gemini';
import { Message, MaturityResult } from '../types';

const MaturityAgent: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', text: 'Systeem geïnitialiseerd. Welkom bij de NexusData Intelligence Audit. Ik ga uw huidige datavolwassenheid analyseren met Gemini 2.5 Flash. \n\nEerste parameter: Hoe zijn binnen jullie organisatie de belangrijkste KPI’s of meetwaarden gedefinieerd en vastgelegd?' }
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
    const currentHistory = [...messages];
    
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    const response = await chatWithAgent(currentHistory, userInput);
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
            <h3 className="text-4xl md:text-5xl font-heading font-bold text-white mb-6 leading-tight">Hoe volwassen is uw <span className="text-emerald-400">data-ecosysteem?</span></h3>
            <p className="text-slate-400 text-lg leading-relaxed font-medium">
              Wij hebben een AI-model getraind om MKB-bedrijven te helpen bij hun digitale transformatie. 
              Deze scan analyseert uw processen en tools om een nauwkeurig beeld te geven van uw groeipotentieel.
            </p>
            <div className="flex items-center gap-4 py-4 border-t border-white/5">
              <div className="w-3 h-3 rounded-full bg-emerald-500 prism-glow"></div>
              <span className="text-xs font-bold text-slate-500 tracking-widest">GEMINI 2.5 FLASH ACTIVE</span>
            </div>
          </div>

          <div className="lg:col-span-3">
            <div className="glass rounded-2xl border-white/10 overflow-hidden flex flex-col h-[650px] relative shadow-2xl">
              {/* Scan effect overlay when typing */}
              {isTyping && <div className="absolute inset-0 pointer-events-none z-20 scanning-line opacity-20"></div>}
              
              {/* Header */}
              <div className="bg-slate-900/80 p-5 border-b border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 rounded-full bg-slate-700"></div>
                    <div className="w-2 h-2 rounded-full bg-slate-700"></div>
                    <div className="w-2 h-2 rounded-full bg-slate-700"></div>
                  </div>
                  <span className="text-[10px] font-bold tracking-widest text-slate-400 uppercase">Audit_Terminal_v2.5.exe</span>
                </div>
              </div>

              {/* Chat View */}
              <div className="flex-1 overflow-y-auto p-8 space-y-8 scrollbar-hide">
                {messages.map((m, i) => (
                  <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[85%] p-5 rounded-xl ${
                      m.role === 'user' 
                      ? 'bg-emerald-600 text-slate-950 font-bold border border-emerald-400/30' 
                      : 'bg-white/5 text-slate-200 border border-white/10 leading-relaxed font-medium'
                    }`}>
                      <p className="text-sm md:text-base whitespace-pre-wrap">{m.text}</p>
                    </div>
                  </div>
                ))}
                
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-white/5 px-5 py-4 rounded-xl border border-white/10 flex items-center gap-3">
                      <div className="flex gap-1">
                        <div className="w-1 h-4 bg-emerald-500/50 animate-pulse"></div>
                        <div className="w-1 h-4 bg-emerald-500/50 animate-pulse delay-75"></div>
                        <div className="w-1 h-4 bg-emerald-500/50 animate-pulse delay-150"></div>
                      </div>
                      <span className="text-[10px] font-black text-emerald-500/70 tracking-widest uppercase">Analyseert input...</span>
                    </div>
                  </div>
                )}

                {result && (
                  <div className="p-8 bg-emerald-500 rounded-2xl text-slate-950 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div className="flex items-center gap-6 mb-6">
                      <div className="text-5xl font-heading font-black border-4 border-slate-950/20 px-6 py-2 rounded-2xl">
                        {result.level}
                      </div>
                      <div>
                        <h4 className="text-2xl font-black uppercase tracking-tight">{result.label}</h4>
                        <p className="text-xs font-bold uppercase tracking-widest opacity-70">Audit Resultaat Bevestigd</p>
                      </div>
                    </div>
                    <p className="font-bold text-lg leading-relaxed mb-6 border-l-4 border-slate-950/30 pl-4">
                      {result.description}
                    </p>
                    <div className="space-y-3 mb-8">
                      {result.recommendations.map((rec, i) => (
                        <div key={i} className="flex gap-3 text-sm font-bold bg-slate-950/10 p-3 rounded-lg">
                          <span className="text-slate-950 mt-0.5 opacity-40">{" >> "}</span>
                          {rec}
                        </div>
                      ))}
                    </div>
                    <button onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })} className="w-full py-4 bg-slate-950 text-emerald-400 font-black rounded-xl hover:scale-[1.02] transition-transform">
                      VRAAG STRATEGIE GESPREK AAN
                    </button>
                  </div>
                )}
                <div ref={chatEndRef} />
              </div>

              {/* Input Area */}
              {!result && (
                <form onSubmit={handleSubmit} className="p-6 bg-slate-900/50 border-t border-white/5 flex gap-4">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Voer uw antwoord in..."
                    className="flex-1 bg-slate-950/50 border border-white/10 rounded-lg px-5 py-4 text-white focus:outline-none focus:border-emerald-500/50 transition-all font-medium placeholder:text-slate-700"
                    disabled={isTyping}
                  />
                  <button
                    type="submit"
                    disabled={isTyping || !input.trim()}
                    className="bg-emerald-500 text-slate-950 px-6 py-4 rounded-lg font-black hover:bg-emerald-400 transition-all active:scale-95 disabled:opacity-20"
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

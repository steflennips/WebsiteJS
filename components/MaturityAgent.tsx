
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

  const currentStep = Math.min(7, Math.ceil((messages.length) / 2));

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTo({
        top: chatContainerRef.current.scrollHeight,
        behavior: "smooth"
      });
    }
  }, [messages, isTyping]);

  const cleanJsonResponse = (rawText: string) => {
    // Zoek naar de [RESULT] tag
    const parts = rawText.split('[RESULT]');
    if (parts.length < 2) return null;
    
    let jsonStr = parts[1].trim();
    // Verwijder eventuele markdown code blocks die het model soms toevoegt
    jsonStr = jsonStr.replace(/```json/g, '').replace(/```/g, '').trim();
    
    try {
      return JSON.parse(jsonStr) as MaturityResult;
    } catch (e) {
      console.error("JSON parse error:", e, jsonStr);
      return null;
    }
  };

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

      const parsedResult = cleanJsonResponse(response);
      if (parsedResult) {
        setResult(parsedResult);
        const cleanText = response.split('[RESULT]')[0].trim();
        if (cleanText) {
          setMessages(prev => [...prev, { role: 'model', text: cleanText }]);
        }
      } else {
        setMessages(prev => [...prev, { role: 'model', text: response }]);
      }
    } catch (err: any) {
      setIsTyping(false);
      setError("Er ging iets mis bij het verwerken van uw antwoord. Probeer het a.u.b. nogmaals.");
    }
  };

  const renderReport = (res: MaturityResult) => (
    <div className="animate-in fade-in zoom-in duration-700 space-y-8 print:p-0">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#00a3ff] to-[#7b2ff7] p-8 md:p-12 rounded-[2.5rem] text-white shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 blur-[80px] rounded-full -mr-20 -mt-20"></div>
        <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
          <div className="w-24 h-24 md:w-32 md:h-32 bg-white rounded-3xl flex items-center justify-center text-[#7b2ff7] text-4xl md:text-6xl font-black shadow-inner">
            {res.level}
          </div>
          <div className="text-center md:text-left">
            <h4 className="text-3xl md:text-5xl font-black uppercase tracking-tighter mb-2">{res.label}</h4>
            <p className="text-white/80 font-bold uppercase tracking-widest text-xs">Uw Data Maturity Profiel</p>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Scores & Description */}
        <div className="glass p-8 rounded-[2rem] border-white/10 space-y-8">
          <div>
            <h5 className="text-indigo-400 font-black uppercase text-xs tracking-widest mb-4">Analyse</h5>
            <p className="text-slate-200 text-lg font-medium leading-relaxed italic">"{res.description}"</p>
          </div>
          
          <div className="space-y-6">
            <h5 className="text-indigo-400 font-black uppercase text-xs tracking-widest">Performance Metrics</h5>
            {[
              { label: 'KPI Management', val: res.scores.kpi },
              { label: 'Infrastructuur', val: res.scores.infra },
              { label: 'Datacultuur', val: res.scores.culture }
            ].map((s, i) => (
              <div key={i} className="space-y-2">
                <div className="flex justify-between text-xs font-black uppercase tracking-widest text-slate-500">
                  <span>{s.label}</span>
                  <span className="text-white">{s.val}/10</span>
                </div>
                <div className="h-2 bg-slate-900 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-[#00a3ff] to-[#7b2ff7] transition-all duration-1000 delay-300" 
                    style={{ width: `${s.val * 10}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Wins */}
        <div className="glass p-8 rounded-[2rem] border-white/10">
          <h5 className="text-[#4ade80] font-black uppercase text-xs tracking-widest mb-6 flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
            Quick Wins (Directe Impact)
          </h5>
          <div className="space-y-4">
            {res.quickWins.map((win, i) => (
              <div key={i} className="flex gap-4 p-4 bg-white/5 border border-white/5 rounded-xl hover:bg-white/10 transition-all">
                <span className="text-[#4ade80] font-black text-sm">0{i+1}</span>
                <p className="text-slate-300 text-sm font-bold leading-snug">{win}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Strategy Section */}
      <div className="glass p-8 md:p-12 rounded-[2.5rem] border-white/10 bg-indigo-500/5">
        <div className="max-w-3xl">
          <h5 className="text-indigo-400 font-black uppercase text-xs tracking-widest mb-6">De Roadmap voor de komende 12 maanden</h5>
          <p className="text-white text-xl md:text-2xl font-bold leading-tight mb-8">
            {res.longTermStrategy}
          </p>
          <div className="grid sm:grid-cols-2 gap-4">
            {res.recommendations.map((rec, i) => (
              <div key={i} className="flex gap-3 items-center bg-slate-900/50 p-3 rounded-lg border border-white/5">
                <div className="w-2 h-2 rounded-full bg-indigo-500 shrink-0"></div>
                <span className="text-slate-400 text-xs font-bold uppercase tracking-tight">{rec}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 pt-4 print:hidden">
        <button 
          onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })} 
          className="flex-1 py-5 bg-white text-slate-950 font-black rounded-2xl text-lg shadow-2xl hover:scale-[1.02] transition-transform active:scale-95"
        >
          STRATEGIE BESPREKEN
        </button>
        <button 
          onClick={() => window.print()} 
          className="px-10 py-5 glass border-white/10 text-white font-bold rounded-2xl hover:bg-white/10 transition-all"
        >
          RAPPORT OPSLAAN (PDF)
        </button>
        <button 
          onClick={() => {setResult(null); setMessages([{ role: 'model', text: 'Opnieuw beginnen. Wat zijn uw belangrijkste KPI’s?' }])}} 
          className="px-6 py-5 text-slate-500 hover:text-white font-bold transition-colors"
        >
          HERSTART SCAN
        </button>
      </div>
    </div>
  );

  return (
    <section id="assessment" className="py-16 md:py-32 relative overflow-hidden bg-slate-950">
      <div className="max-w-7xl mx-auto px-6">
        {!result && (
          <div className="grid lg:grid-cols-12 gap-10 md:gap-16 items-start">
            <div className="lg:col-span-5 space-y-6 md:space-y-10">
              <div className="print:hidden">
                <h3 className="text-3xl md:text-6xl font-heading font-bold text-white mb-4 md:mb-8 leading-tight">
                  Bepaal uw <span className="text-gradient">Data DNA</span>.
                </h3>
                <p className="text-slate-400 text-sm md:text-lg leading-relaxed font-medium">
                  Onze AI Agent analyseert uw organisatie in real-time. Start de scan hiernaast.
                </p>
              </div>

              <div className="space-y-3 md:space-y-6 print:hidden">
                 {[
                   { t: "KPI Analyse", d: "Hoe stuurbaar is uw business?" },
                   { t: "Flow Validatie", d: "Waar stokt de informatie?" },
                   { t: "AI Readiness", d: "Klaar voor de volgende stap?" }
                 ].map((item, i) => (
                   <div key={i} className="flex gap-4 p-3 md:p-5 rounded-2xl bg-white/5 border border-white/5 group transition-all">
                     <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#00a3ff] to-[#7b2ff7] flex items-center justify-center text-white font-bold shrink-0 text-xs">
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
              <div className="glass rounded-[2rem] md:rounded-[2.5rem] border-white/10 overflow-hidden flex flex-col h-[550px] md:h-[700px] relative shadow-2xl">
                <div className="bg-slate-900/80 p-4 border-b border-white/5 flex items-center justify-between backdrop-blur-md z-10 shrink-0">
                  <div className="flex items-center gap-3">
                    <div className="flex gap-1">
                      <div className="w-1.5 h-1.5 rounded-full bg-red-500/50"></div>
                      <div className="w-1.5 h-1.5 rounded-full bg-amber-500/50"></div>
                      <div className="w-1.5 h-1.5 rounded-full bg-indigo-500/50"></div>
                    </div>
                    <span className="px-2 py-0.5 bg-indigo-500/20 text-indigo-400 text-[8px] font-black rounded uppercase tracking-widest">
                      {GEMINI_MODEL}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[8px] md:text-[10px] font-bold text-slate-500 uppercase">SCAN VOORTGANG</span>
                    <div className="w-16 md:w-32 h-1 bg-slate-800 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-[#00a3ff] to-[#7b2ff7] transition-all duration-500" 
                        style={{ width: `${(currentStep / 7) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </div>

                <div 
                  ref={chatContainerRef}
                  className="flex-1 overflow-y-auto p-4 md:p-8 space-y-4 scrollbar-hide bg-slate-950/30 ios-scroll"
                >
                  {messages.map((m, i) => (
                    <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-[90%] md:max-w-[85%] p-4 md:p-5 rounded-2xl ${
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
                          <div className="w-1.5 h-1.5 rounded-full bg-[#00a3ff] animate-bounce"></div>
                          <div className="w-1.5 h-1.5 rounded-full bg-[#7b2ff7] animate-bounce delay-150"></div>
                          <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-bounce delay-300"></div>
                        </div>
                      </div>
                    </div>
                  )}

                  {error && (
                    <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-bold rounded-xl text-center">
                      {error}
                      <button onClick={() => setError(null)} className="ml-4 underline">Sluiten</button>
                    </div>
                  )}
                </div>

                <div className="p-4 md:p-8 bg-slate-900/50 border-t border-white/5 shrink-0">
                  <form onSubmit={handleSubmit} className="flex gap-2 md:gap-4">
                    <input
                      type="text"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      placeholder={isTyping ? "Engine analyseert uw antwoord..." : "Typ uw antwoord..."}
                      className="flex-1 bg-slate-950/80 border border-white/10 rounded-xl md:rounded-2xl px-4 md:px-6 py-3 md:py-4 text-base text-white focus:outline-none focus:border-indigo-500/50 transition-all font-medium"
                      disabled={isTyping}
                    />
                    <button
                      type="submit"
                      disabled={isTyping || !input.trim()}
                      className="bg-gradient-to-r from-[#00a3ff] to-[#7b2ff7] text-white w-12 h-12 md:w-16 md:h-16 rounded-xl md:rounded-2xl font-black transition-all active:scale-95 disabled:opacity-20 flex items-center justify-center shrink-0"
                    >
                      <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7m0 0l-5 5m5-5H6" /></svg>
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        )}

        {result && renderReport(result)}
      </div>
    </section>
  );
};

export default MaturityAgent;

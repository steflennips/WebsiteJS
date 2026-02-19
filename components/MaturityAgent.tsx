
import React, { useState, useRef, useEffect } from 'react';
import { chatWithAgent, GEMINI_MODEL } from '../services/gemini';
import { Message, MaturityResult } from '../types';

const MaturityAgent: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', text: 'Jacques en Stef zijn op pad, dus ik help je vandaag.\n\nLaten we direct kijken waar de winst zit: Hoe zijn jullie belangrijkste KPI’s momenteel gedefinieerd en waar leggen jullie die data vast?' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<MaturityResult | null>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const currentStep = Math.min(7, Math.ceil((messages.length) / 2));

  useEffect(() => {
    if (chatContainerRef.current) {
      const container = chatContainerRef.current;
      container.scrollTo({
        top: container.scrollHeight,
        behavior: "auto"
      });
    }
  }, [messages, isTyping]);

  const cleanJsonResponse = (rawText: string) => {
    const parts = rawText.split('[RESULT]');
    if (parts.length < 2) return null;
    
    let jsonStr = parts[1].trim();
    jsonStr = jsonStr.replace(/```json/g, '').replace(/```/g, '').trim();
    
    try {
      return JSON.parse(jsonStr) as MaturityResult;
    } catch (e) {
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
      setError("Verbinding hapert. Probeer het nog eens.");
    }
  };

  const renderReport = (res: MaturityResult) => (
    <div className="animate-in fade-in zoom-in duration-300 space-y-6 md:space-y-10 print:space-y-8 print:p-0">
      
      {/* Print Header (Enkel zichtbaar in PDF) */}
      <div className="hidden print:flex justify-between items-center border-b-2 border-slate-900 pb-6 mb-8">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-slate-900 rounded-lg flex items-center justify-center">
            <span className="text-white font-black text-xl">2</span>
          </div>
          <span className="font-bold text-2xl tracking-tight text-slate-900 uppercase">Deux2<span className="text-[#7b2ff7]">Qonnect</span></span>
        </div>
        <div className="text-right">
          <p className="text-[10px] font-black uppercase text-slate-500">Document Type</p>
          <p className="text-xs font-bold text-slate-900">Data Maturity Impact Rapport</p>
          <p className="text-[9px] text-slate-400 mt-1">{new Date().toLocaleDateString('nl-NL')}</p>
        </div>
      </div>

      {/* Main Score Banner */}
      <div className="bg-gradient-to-br from-[#00a3ff] to-[#7b2ff7] print:from-white print:to-white print:border-2 print:border-slate-900 p-8 md:p-14 rounded-[1.5rem] md:rounded-[3rem] text-white print:text-slate-900 shadow-2xl print:shadow-none relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 blur-[80px] rounded-full -mr-32 -mt-32 print:hidden"></div>
        <div className="relative z-10 flex flex-col md:flex-row items-center gap-8 md:gap-12 text-center md:text-left">
          <div className="w-24 h-24 md:w-40 md:h-40 bg-white print:bg-slate-900 rounded-3xl flex items-center justify-center text-[#7b2ff7] print:text-white text-4xl md:text-7xl font-black shadow-inner">
            {res.level}
          </div>
          <div>
            <h4 className="text-3xl md:text-6xl font-black uppercase tracking-tighter mb-2 print:text-slate-900">{res.label}</h4>
            <p className="text-white/80 print:text-slate-500 font-bold uppercase tracking-widest text-[10px] md:text-xs">Data Maturity Niveau</p>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6 md:gap-10 print:grid-cols-1">
        {/* Analyse & Metrics Card */}
        <div className="glass p-8 md:p-10 rounded-[2rem] border-white/10 space-y-8 print:border-slate-200 print:p-6 print-break-inside-avoid">
          <div>
            <h5 className="text-indigo-400 print:text-indigo-600 font-black uppercase text-[10px] tracking-widest mb-4">Strategische Analyse</h5>
            <p className="text-slate-100 print:text-slate-900 text-lg md:text-xl font-medium leading-relaxed italic">"{res.description}"</p>
          </div>
          
          <div className="space-y-6">
            <h5 className="text-indigo-400 print:text-indigo-600 font-black uppercase text-[10px] tracking-widest">Kern Metrics</h5>
            {[
              { label: 'KPI Management', val: res.scores.kpi },
              { label: 'Infrastructuur', val: res.scores.infra },
              { label: 'Datacultuur', val: res.scores.culture }
            ].map((s, i) => (
              <div key={i} className="space-y-2">
                <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-slate-500 print:text-slate-400">
                  <span>{s.label}</span>
                  <span className="text-white print:text-slate-900">{s.val}/10</span>
                </div>
                <div className="h-2 bg-slate-900 print:bg-slate-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-[#00a3ff] to-[#7b2ff7] print:bg-slate-900 transition-all duration-1000" 
                    style={{ width: `${s.val * 10}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Wins Card */}
        <div className="glass p-8 md:p-10 rounded-[2rem] border-white/10 bg-emerald-500/5 print:bg-transparent print:border-slate-200 print:p-6 print-break-inside-avoid">
          <h5 className="text-[#4ade80] print:text-emerald-700 font-black uppercase text-[10px] tracking-widest mb-6">Directe Actiepunten</h5>
          <div className="space-y-4">
            {res.quickWins.map((win, i) => (
              <div key={i} className="flex gap-4 p-4 bg-white/5 print:bg-slate-50 border border-white/5 print:border-slate-200 rounded-2xl">
                <span className="text-[#4ade80] print:text-emerald-700 font-black text-sm">0{i+1}</span>
                <p className="text-slate-300 print:text-slate-700 text-sm font-bold leading-snug">{win}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Strategy Card */}
      <div className="glass p-8 md:p-14 rounded-[2rem] md:rounded-[3rem] border-white/10 bg-indigo-500/5 print:bg-transparent print:border-slate-200 print:p-8 print-break-inside-avoid">
        <h5 className="text-indigo-400 print:text-indigo-700 font-black uppercase text-[10px] tracking-widest mb-6">12-Maanden Roadmap</h5>
        <p className="text-white print:text-slate-900 text-xl md:text-2xl font-bold leading-tight mb-8">{res.longTermStrategy}</p>
        <div className="grid sm:grid-cols-2 gap-4 print:grid-cols-1">
          {res.recommendations.map((rec, i) => (
            <div key={i} className="flex gap-4 items-center bg-slate-950/50 print:bg-slate-50 p-4 rounded-xl border border-white/5 print:border-slate-200">
              <div className="w-2.5 h-2.5 rounded-full bg-indigo-500 shrink-0"></div>
              <span className="text-slate-400 print:text-slate-600 text-xs md:text-sm font-bold uppercase tracking-tight">{rec}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Footer Info (Enkel voor Print) */}
      <div className="hidden print:block text-center pt-10 border-t border-slate-100">
        <p className="text-[9px] text-slate-400 uppercase tracking-[0.3em] font-bold">
          © {new Date().getFullYear()} Deux2Qonnect.ai | Deventer | hello@deux2qonnect.ai
        </p>
      </div>

      {/* Buttons (Verborgen in Print) */}
      <div className="flex flex-col sm:flex-row gap-4 pt-6 print:hidden">
        <button 
          onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })} 
          className="flex-1 py-5 bg-white text-slate-950 font-black rounded-2xl text-lg hover:scale-[1.02] active:scale-95 transition-all shadow-xl"
        >
          START STRATEGIE GESPREK
        </button>
        <button 
          onClick={() => window.print()} 
          className="px-10 py-5 glass border-white/10 text-white font-bold rounded-2xl hover:bg-white/10 active:scale-95 transition-all flex items-center justify-center gap-3"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
          DOWNLOAD PDF
        </button>
        <button 
          onClick={() => {setResult(null); setMessages([{ role: 'model', text: 'Klaar voor een nieuwe ronde. Waar liggen momenteel jullie grootste uitdagingen?' }])}} 
          className="px-6 py-5 text-slate-500 hover:text-white font-bold transition-colors text-sm uppercase tracking-widest"
        >
          HERSTART
        </button>
      </div>
    </div>
  );

  return (
    <section id="assessment" className="py-16 md:py-32 relative overflow-hidden bg-slate-950 print:bg-white print:py-0">
      <div className="max-w-7xl mx-auto px-6 print:px-0">
        {!result && (
          <div className="grid lg:grid-cols-12 gap-10 md:gap-16 items-start">
            <div className="lg:col-span-5 space-y-6 md:space-y-10">
              <div className="print-hidden">
                <h3 className="text-3xl md:text-7xl font-heading font-bold text-white mb-4 leading-tight">
                  Bepaal uw <br/><span className="text-gradient">Data DNA</span>.
                </h3>
                <p className="text-slate-400 text-sm md:text-xl leading-relaxed font-medium">
                  Onze AI Agent analyseert uw organisatie in real-time. Start de scan hieronder om uw potentieel te ontsluiten.
                </p>
              </div>
            </div>

            <div className="lg:col-span-7 w-full print-hidden">
              <div className="glass rounded-[2rem] md:rounded-[3rem] border-white/10 overflow-hidden flex flex-col h-[550px] md:h-[700px] relative shadow-2xl">
                <div className="bg-slate-900/80 p-4 border-b border-white/5 flex items-center justify-between backdrop-blur-md z-10 shrink-0">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse"></div>
                    <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">Engine Active</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-20 md:w-40 h-1.5 bg-slate-800 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-[#00a3ff] to-[#7b2ff7] transition-all duration-700" style={{ width: `${(currentStep / 7) * 100}%` }}></div>
                    </div>
                  </div>
                </div>

                <div ref={chatContainerRef} className="flex-1 overflow-y-auto p-5 md:p-10 space-y-6 scrollbar-hide bg-slate-950/40 ios-scroll">
                  {messages.map((m, i) => (
                    <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-[92%] md:max-w-[85%] p-4 md:p-6 rounded-2xl md:rounded-[2rem] ${
                        m.role === 'user' 
                        ? 'bg-gradient-to-r from-[#00a3ff] to-[#7b2ff7] text-white font-bold shadow-xl rounded-tr-none' 
                        : 'bg-slate-900/90 text-slate-100 border border-white/5 font-medium rounded-tl-none backdrop-blur-sm'
                      }`}>
                        <p className="text-sm md:text-lg whitespace-pre-wrap leading-relaxed">{m.text}</p>
                      </div>
                    </div>
                  ))}
                  
                  {isTyping && (
                    <div className="flex justify-start">
                      <div className="bg-slate-900/50 px-5 py-3 rounded-2xl border border-white/10">
                        <div className="flex gap-1.5">
                          <div className="w-2 h-2 rounded-full bg-[#00a3ff] animate-bounce"></div>
                          <div className="w-2 h-2 rounded-full bg-[#7b2ff7] animate-bounce [animation-delay:0.1s]"></div>
                          <div className="w-2 h-2 rounded-full bg-indigo-500 animate-bounce [animation-delay:0.2s]"></div>
                        </div>
                      </div>
                    </div>
                  )}

                  {error && <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-bold rounded-xl text-center">{error}</div>}
                </div>

                <div className="p-5 md:p-10 bg-slate-900/50 border-t border-white/5 shrink-0">
                  <form onSubmit={handleSubmit} className="flex gap-3 md:gap-5">
                    <input
                      type="text"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      placeholder={isTyping ? "Analyseert..." : "Typ uw antwoord..."}
                      className="flex-1 bg-slate-950/80 border border-white/10 rounded-xl md:rounded-[1.5rem] px-5 md:px-8 py-4 md:py-5 text-base text-white focus:outline-none focus:border-indigo-500/50 transition-all font-medium"
                      disabled={isTyping}
                    />
                    <button
                      type="submit"
                      disabled={isTyping || !input.trim()}
                      className="bg-gradient-to-r from-[#00a3ff] to-[#7b2ff7] text-white w-14 h-14 md:w-20 md:h-20 rounded-xl md:rounded-[1.5rem] font-black transition-all active:scale-90 disabled:opacity-20 flex items-center justify-center shrink-0 shadow-lg"
                    >
                      <svg className="w-6 h-6 md:w-8 md:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7m0 0l-5 5m5-5H6" /></svg>
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

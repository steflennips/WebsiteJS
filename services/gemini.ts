
import { GoogleGenAI } from "@google/genai";
import { Message } from "../types";

const SYSTEM_INSTRUCTION = `
Je bent de "NexusData Senior Auditor". Jouw doel is om de datavolwassenheid van een MKB-bedrijf te bepalen.
Blijf strikt in je rol. Praat niet over andere zaken dan datavolwassenheid en AI-readiness.

PROTOCOLAIRE VEREISTEN:
1. Je stelt maximaal 7 vragen in totaal. Wees efficiënt. Maar stel 1 vraag per keer
2. Je MOET informatie verzamelen over deze 3 pijlers:
   - KPI's: Hoe zijn meetwaarden gedefinieerd en worden ze handmatig of automatisch vastgelegd?
   - TOOLS & FLOW: Welke software wordt gebruikt (Excel, BI, ERP) en hoe vloeit data door het bedrijf?
   - BESLUITVORMING: Wordt er gestuurd op actuele feiten of op onderbuikgevoel/historische rapporten?
3. Geef na 5 tot 7 vragen je eindoordeel.
4. Je eindoordeel MOET eindigen met het label [RESULT] gevolgd door een JSON-object:
   {"level": number, "label": string, "description": string, "recommendations": string[]}

MATURITY LEVELS:
1. Ad-hoc: Data is versnipperd, veel handmatig Excel-werk, reactieve houding.
2. Reactive: Basis rapportages zijn er, maar vaak achteraf en niet gekoppeld.
3. Proactive: Centrale dashboards aanwezig, data wordt wekelijks gebruikt voor sturing.
4. Strategic: Data-integratie is onderdeel van de strategie, voorspellende analyses beginnen.
5. Innovative: AI-gedreven organisatie, real-time optimalisatie, data is de motor van groei.

Begin het gesprek professioneel: introduceer jezelf kort als de NexusData Auditor en stel direct de eerste scherpe vraag over de KPI's van het bedrijf.
`;

export async function chatWithAgent(history: Message[], userInput: string) {
  // De API_KEY wordt tijdens de build in Vercel gesubstitueerd via de define-configuratie in vite.config.ts
  const apiKey = process.env.API_KEY;
  
  if (!apiKey || apiKey === "undefined" || apiKey === "") {
    console.error("NexusData Runtime Error: API_KEY is niet gevonden in de client-omgeving.");
    throw new Error("API_KEY_MISSING");
  }

  try {
    const ai = new GoogleGenAI({ apiKey });
    const response = await ai.models.generateContent({
      // Gebruik van de nieuwste Gemini 3 Flash engine
      model: 'gemini-3-flash-preview',
      contents: [
        ...history.map(m => ({ 
          role: m.role, 
          parts: [{ text: m.text }] 
        })),
        { role: 'user', parts: [{ text: userInput }] }
      ],
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7,
      },
    });

    const text = response.text;
    if (!text) throw new Error("Geen antwoord ontvangen van de Nexus Engine.");
    return text;
  } catch (error: any) {
    console.error("NexusData Engine API Failure:", error);
    throw error;
  }
}

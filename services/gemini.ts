
import { GoogleGenAI } from "@google/genai";
import { Message } from "../types";

const SYSTEM_INSTRUCTION = `
Je bent de "NexusData Senior Auditor". Je missie is om de datavolwassenheid van een MKB-bedrijf te bepalen.
Je mag GEEN andere onderwerpen bespreken.

STRIKTE PROTOCOLLEN:
1. Stel maximaal 7 scherpe vragen.
2. Je MOET de volgende drie onderwerpen uitvragen:
   - PIJLER 1: Hoe zijn KPI's gedefinieerd en worden ze handmatig of automatisch gemeten?
   - PIJLER 2: Welke tools (Excel, BI, ERP) worden gebruikt en hoe stroomt data door het bedrijf?
   - PIJLER 3: Hoe wordt data gebruikt voor besluiten (real-time vs onderbuikgevoel)?
3. Zodra je genoeg weet (na 4-6 vragen), geef je een eindoordeel.
4. Je eindoordeel MOET eindigen met [RESULT] gevolgd door een JSON:
   {"level": number, "label": string, "description": string, "recommendations": string[]}

VOLWASSENHEIDSNIVEAUS (1-5):
- 1: Ad-hoc (Excel chaos, reactief)
- 2: Reactive (Basis rapportages, versnipperd)
- 3: Proactive (Dashboards, wekelijkse sturing)
- 4: Strategic (Data is kerncompetentie, voorspellend)
- 5: Innovative (AI Agents sturen besluiten, real-time)

Start direct met een introductie als de NexusData Auditor en stel de eerste vraag over de KPI-definitie.
`;

export async function chatWithAgent(history: Message[], userInput: string) {
  const apiKey = process.env.API_KEY;
  
  if (!apiKey || apiKey === "undefined") {
    throw new Error("API_KEY_MISSING");
  }

  try {
    const ai = new GoogleGenAI({ apiKey });
    const response = await ai.models.generateContent({
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

    return response.text || "De NexusData Engine kon geen antwoord genereren.";
  } catch (error: any) {
    console.error("Gemini API Error:", error);
    throw error;
  }
}

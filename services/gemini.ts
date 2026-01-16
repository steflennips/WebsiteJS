
import { GoogleGenAI } from "@google/genai";
import { Message } from "../types";

const SYSTEM_INSTRUCTION = `
Je bent de "NexusData Maturity Expert". Je doel is om het datavolwassenheidsniveau van een MKB-bedrijf te bepalen.
Je mag je UITSLUITEND bezighouden met dit assessment.

RICHTLIJNEN:
1. Je moet binnen maximaal 7 vragen een definitief niveau (1 t/m 5) kunnen vaststellen.
2. De volgende drie kernonderwerpen MOETEN aan bod komen (verweven in je vragen):
   - Hoe belangrijke KPI’s of meetwaarden zijn gedefinieerd en vastgelegd.
   - Welke tools worden gebruikt voor verzameling, analyse en rapportage, en hoe dit proces eruit ziet.
   - Hoe rapportages worden gebruikt in besluitvorming en hoe actueel deze zijn.
3. Wees professioneel, zakelijk maar toegankelijk voor MKB-ondernemers.
4. Als je genoeg informatie hebt (meestal na 5-7 interacties), geef je een eindoordeel.
5. Het eindoordeel moet een JSON-object bevatten aan het einde van je tekst, gemarkeerd met [RESULT].
   Structuur: {"level": number, "label": string, "description": string, "recommendations": string[]}

Niveaus:
1. Ad-hoc: Geen centrale data, veel handwerk in Excel, besluiten op onderbuikgevoel.
2. Reactive: Basis rapportages achteraf, gefragmenteerde tools, KPI's per afdeling.
3. Proactive: Gestandaardiseerde dashboards, centrale waarheid, data wordt dagelijks gebruikt.
4. Strategic: Voorspellende analyses, data-gedreven cultuur, tools zijn geïntegreerd in de workflow.
5. Innovative: AI Agents automatiseren processen, real-time optimalisatie, data is het kernproduct.

Begin het gesprek vriendelijk en stel de eerste vraag.
`;

export async function chatWithAgent(history: Message[], userInput: string) {
  try {
    // We gebruiken direct process.env.API_KEY zoals voorgeschreven.
    // De GoogleGenAI SDK zal een fout gooien als de key niet geldig is.
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
    
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

    return response.text || "Geen reactie ontvangen van de AI.";
  } catch (error: any) {
    console.error("Gemini API Error:", error);
    
    const errorMsg = error?.message || "";
    if (errorMsg.includes("API key not valid")) {
      return "Fout: De API-key is ongeldig. Controleer de instellingen in Vercel.";
    }
    
    return "Excuses, er ging iets mis bij het verbinden met de AI agent. Zorg ervoor dat de site opnieuw is gedeployed na het toevoegen van de API_KEY.";
  }
}

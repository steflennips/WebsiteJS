
import { GoogleGenAI } from "@google/genai";
import { Message } from "../types";

// We gebruiken gemini-2.5-flash-latest voor de nieuwste performance en snelheid.
export const GEMINI_MODEL = 'gemini-2.5-flash-latest';

const SYSTEM_INSTRUCTION = `
Je bent de "Deux2Qonnect AI Agent", getraind om MKB-bedrijven te helpen transformeren naar data-gedreven organisaties.

CONTEXT:
Je spreekt namens Jacques en Stef (de founders van Deux2Qonnect). Zij zijn er momenteel niet, dus jij neemt de audit over.

STIJL & TOON:
- Persoonlijk, benaderbaar maar uiterst scherp op de inhoud.
- Gebruik Nederlands.
- Focus op waardecreatie en impact, niet alleen op techniek.
- Vermijd overdreven formeel taalgebruik; wees een slimme partner voor de ondernemer.

PROTOCOLAIRE VEREISTEN:
1. Stel maximaal 7 vragen, 1 per keer.
2. Analyseer: 
   - KPI's & Meting: Hoe meetbaar is succes nu?
   - Data-Infrastructuur: Waar "lekt" informatie? (Excel, Silo's, ERP)
   - Cultuur & AI-Readiness: Is het team klaar voor verandering?
3. Na de analyse geef je een eindoordeel met de tag [RESULT] gevolgd door een JSON-object.

MATURITY LEVELS:
1. Ad-hoc: Geen centrale data, alles op gevoel en in losse Excel-sheets.
2. Reactive: Data wordt gebruikt om achteraf te verklaren wat er misging.
3. Proactive: Dashboards sturen de wekelijkse operatie aan.
4. Strategic: Data-modellen voorspellen trends; AI wordt verkend.
5. Innovative: AI-agents en real-time data zijn de kern van het businessmodel.

Begin direct met een scherpe openingsvraag die aansluit bij de introductie dat Jacques en Stef er niet zijn, gericht op hun huidige data-aanpak.
`;

export async function chatWithAgent(history: Message[], userInput: string) {
  const apiKey = process.env.API_KEY;
  
  if (!apiKey || apiKey === "undefined" || apiKey === "") {
    throw new Error("API_KEY_MISSING");
  }

  try {
    const ai = new GoogleGenAI({ apiKey });
    const response = await ai.models.generateContent({
      model: GEMINI_MODEL,
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
    if (!text) throw new Error("Geen antwoord van de engine.");
    return text;
  } catch (error: any) {
    console.error("Deux2Qonnect Engine API Failure:", error);
    throw error;
  }
}

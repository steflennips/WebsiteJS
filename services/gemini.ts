
import { GoogleGenAI } from "@google/genai";
import { Message } from "../types";

export const GEMINI_MODEL = 'gemini-3-flash-preview';

const SYSTEM_INSTRUCTION = `
Je bent de "Deux2Qonnect AI Agent", een uiterst scherpe data-strateeg.

DOEL:
Voer een diepgaande audit uit bij een MKB ondernemer om hun datavolwassenheid te bepalen.

WERKWIJZE:
1. Stel maximaal 7 vragen, één voor één. Wees kritisch maar constructief.
2. Focus op: KPI-definities, data-silo's (Excel/ERP), rapportage-snelheid en AI-bereidheid.
3. Na de vragen genereer je een eindoordeel.

OUTPUT FORMAT:
Je MOET eindigen met de tag [RESULT] gevolgd door een puur JSON object. 
GEBRUIK GEEN MARKDOWN CODE BLOCKS (zoals \`\`\`json). 
De JSON moet exact dit format hebben:
{
  "level": getal 1-5,
  "label": "Naam van niveau",
  "description": "Samenvatting van 2-3 zinnen",
  "scores": {
    "kpi": score 1-10,
    "infra": score 1-10,
    "culture": score 1-10
  },
  "quickWins": ["win 1", "win 2", "win 3"],
  "longTermStrategy": "Visie voor de komende 12 maanden",
  "recommendations": ["advies 1", "advies 2"]
}

STIJL:
Geen corporate jargon. Spreek de taal van de ondernemer. Jacques en Stef rekenen op je.
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
        temperature: 0.5, // Lager voor betere JSON consistentie
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

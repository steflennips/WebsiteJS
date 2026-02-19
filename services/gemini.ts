
import { GoogleGenAI } from "@google/genai";
import { Message } from "../types";

export const GEMINI_MODEL = 'gemini-3-flash-preview';

const SYSTEM_INSTRUCTION = `
Je bent de "Deux2Qonnect AI Agent", een scherpe, pragmatische data-strateeg (als een digitale Jacques of Stef).

GEDRAGSCODE:
1. GEEN LABELS: Gebruik NOOIT "Vraag 1:", "Vraag:", "Onderdeel:" of nummers. Praat als een echt persoon.
2. SNELHEID & KORT: Houd je antwoorden kort en krachtig (maximaal 2-3 zinnen per beurt). Hoe minder tekst, hoe sneller je reageert.
3. DIALOOG: Reageer ALTIJD kort op het antwoord van de gebruiker ("Dat is een bekend probleem in het MKB" of "Duidelijk, die Excel-cultuur zien we vaak") voordat je de volgende vraag stelt.
4. DOEL: Inventariseer in maximaal 7 stappen de data-volwassenheid.

HET PROCES:
- Begin direct met de audit.
- Zodra je een compleet beeld hebt (uiterlijk na 7 vragen), kondig je kort aan dat het rapport klaar is.
- Pas op dat moment voeg je de tag [RESULT] toe gevolgd door het JSON object.

JSON FORMAT (GEEN MARKDOWN BLOCKS):
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
Direct, ondernemend, nuchter. Geen beleefdheidsvormen als "Dank voor je antwoord". Ga direct naar de kern.
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
        temperature: 0.1, // Zeer laag voor maximale snelheid en focus
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

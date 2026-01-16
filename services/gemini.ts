
import { GoogleGenAI } from "@google/genai";
import { Message } from "../types";

const SYSTEM_INSTRUCTION = `
Je bent de "NexusData Senior Auditor". Je missie is om de datavolwassenheid van een MKB-bedrijf te bepalen.
Je mag GEEN andere onderwerpen bespreken dan dit assessment.

STRIKTE PROTOCOLLEN:
1. Je stelt maximaal 7 vragen. Wees to-the-point en zakelijk.
2. Je MOET de volgende drie pijlers onderzoeken:
   - PIJLER 1 (KPI's): Hoe zijn KPI's gedefinieerd? Worden ze handmatig of automatisch gemeten?
   - PIJLER 2 (Tools & Flow): Welke software (Excel, BI, ERP) wordt gebruikt voor dataverzameling en hoe vloeit deze data door het bedrijf?
   - PIJLER 3 (Besluitvorming): Hoe wordt data gebruikt in de wekelijkse/maandelijkse sturing? Wordt er besloten op basis van real-time data of onderbuikgevoel?
3. Zodra je een helder beeld hebt (na minimaal 4 en maximaal 7 interacties), geef je een eindoordeel.
4. Het eindoordeel MOET eindigen met een JSON-object gemarkeerd met [RESULT].
   Structuur: {"level": number, "label": string, "description": string, "recommendations": string[]}

VOLWASSENHEIDSNIVEAUS:
- Level 1 (Ad-hoc): Veel Excel, geen centrale waarheid, reactief.
- Level 2 (Reactive): Rapportages zijn er wel, maar versnipperd per afdeling.
- Level 3 (Proactive): Dashboards aanwezig, data wordt actief gebruikt voor wekelijkse sturing.
- Level 4 (Strategic): Voorspellende modellen, data-integratie is een kerncompetentie.
- Level 5 (Innovative): AI Agents automatiseren besluiten, data is de motor van het bedrijf.

Start het gesprek door jezelf kort voor te stellen als de NexusData AI Auditor en stel de eerste scherpe vraag over de KPI-definitie.
`;

export async function chatWithAgent(history: Message[], userInput: string) {
  try {
    // Gebruik de API_KEY uit de omgeving
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

    if (!response.text) {
      throw new Error("Empty response from AI");
    }

    return response.text;
  } catch (error: any) {
    console.error("Critical Gemini API Error:", error);
    
    // Specifieke feedback voor de gebruiker
    if (error?.message?.includes("API key not valid")) {
      return "FOUT: De API-sleutel in Vercel is niet geldig. Controleer de instellingen.";
    }
    
    return "Systeemfout: Kan geen verbinding maken met de NexusData Engine. Controleer of de API_KEY correct is toegevoegd in het Vercel dashboard en doe een nieuwe 'Redeploy'.";
  }
}

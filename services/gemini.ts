
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
  // Check of de API key überhaupt aanwezig is in de omgeving
  const apiKey = process.env.API_KEY;
  
  if (!apiKey) {
    return "Configuratie-fout: De API_KEY ontbreekt in de Vercel Environment Variables. Voeg deze toe in je Vercel dashboard.";
  }

  try {
    const ai = new GoogleGenAI({ apiKey });
    
    // Gebruik de volledige modelnaam voor de 2.5 Flash preview
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-preview-09-2025', 
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

    if (!response || !response.text) {
      return "De AI gaf een leeg antwoord terug. Probeer een andere vraag.";
    }

    return response.text;
  } catch (error: any) {
    console.error("Gemini API Detail Error:", error);
    
    // Specifieke foutmeldingen op basis van de error van Google
    const msg = error?.message || "";
    
    if (msg.includes("404") || msg.includes("not found")) {
      return "Fout: Het model 'gemini-2.5-flash-preview' is niet beschikbaar of de naam is onjuist.";
    }
    if (msg.includes("403") || msg.includes("permission")) {
      return "Toegang geweigerd: Je API-key heeft geen rechten voor dit model of je regio is beperkt.";
    }
    if (msg.includes("401") || msg.includes("API key not valid")) {
      return "Ongeldige API-key: Controleer de key in je Vercel instellingen.";
    }

    return `Er ging iets mis bij de verbinding: ${msg.substring(0, 100)}...`;
  }
}

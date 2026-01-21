import { GoogleGenAI } from "@google/genai";

let aiClient: GoogleGenAI | null = null;

const getClient = () => {
  if (!aiClient && process.env.API_KEY) {
    aiClient = new GoogleGenAI({ apiKey: process.env.API_KEY });
  }
  return aiClient;
};

export const getMarketPrediction = async (context: string) => {
  const ai = getClient();
  if (!ai) return "AI Offline: API Key Missing";

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `You are a futuristic crypto market oracle in the year 2045. 
      Analyze this context: "${context}". 
      Give a short, cryptic but hype-filled prediction (max 20 words) about the $PACKS market. 
      Use terms like "Signal detected", "Alpha leak", "Volume surge".`,
    });
    return response.text.trim();
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Oracle Interrupted. Retrying signal...";
  }
};

export const analyzeSentiment = async (tweets: string[]) => {
    const ai = getClient();
    if (!ai) return "Neutral";

    try {
        const response = await ai.models.generateContent({
            model: "gemini-3-flash-preview",
            contents: `Analyze the sentiment of these tweets: ${tweets.join(' ')}. Return one word: Bullish, Bearish, or Neutral.`
        });
        return response.text.trim();
    } catch (e) {
        return "Unknown";
    }
}

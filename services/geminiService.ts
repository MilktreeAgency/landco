import { GoogleGenAI, Chat, GenerateContentResponse } from "@google/genai";
import { SYSTEM_INSTRUCTION_CONCIERGE } from "../constants";

let chatSession: Chat | null = null;

const getAiClient = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    console.warn("API_KEY not found in environment variables. AI features will run in mock mode.");
    return null;
  }
  return new GoogleGenAI({ apiKey });
};

export const initChat = () => {
  const ai = getAiClient();
  if (!ai) return null;

  chatSession = ai.chats.create({
    model: 'gemini-3-flash-preview',
    config: {
      systemInstruction: SYSTEM_INSTRUCTION_CONCIERGE,
    },
  });
  return chatSession;
};

export const sendMessageToGemini = async (message: string): Promise<string> => {
  try {
    if (!chatSession) {
      initChat();
    }
    
    if (!chatSession) {
      // Fallback for demo without API key
      await new Promise(resolve => setTimeout(resolve, 1000));
      return "I can certainly help with that. Our sites in Southampton operate on a flexible monthly license structure, meaning you avoid the legal fees associated with traditional 5-year commercial leases. Security includes 24/7 AI-monitored CCTV towers.";
    }

    const result: GenerateContentResponse = await chatSession.sendMessage({ message });
    return result.text || "I apologize, I could not retrieve that information at the moment.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "System status: Offline. Please contact the site manager directly.";
  }
};
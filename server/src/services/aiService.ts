import { GoogleGenAI } from "@google/genai";
import 'dotenv/config'

// The client gets the API key from the environment variable `GEMINI_API_KEY`.
const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
});

async function main() {
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: "Did i just connected my project to the Gemini API ? ",
  });
  console.log(response.text);
}

main();

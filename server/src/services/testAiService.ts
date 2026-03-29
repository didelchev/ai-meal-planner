import { GoogleGenAI } from "@google/genai";
import { z } from 'zod';
import 'dotenv/config'


const MealPlanSchema = z.object({
  day: z.string(),
  meals: z.array(z.object({
    type: z.string(),
    name: z.string(),
    description: z.string(),
    calories: z.number(),
    proteinG: z.number(),
    carbsG: z.number(),
    fatsG: z.number(),
    ingredients: z.array(z.string())
  }))
})

const sampleUserData = {
  goal: "muscle gain",
  allergies: ["peanuts"],
  dailyCalories: 2500,
  preferences: "high protein, low carb"
};

const client = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
});

const prompt = `Create a 1-day meal plan for a user: 
    Goal: ${sampleUserData.goal}, 
    Allergies: ${sampleUserData.allergies.join(", ")}, 
    Calories: ${sampleUserData.dailyCalories},
    Notes: ${sampleUserData.preferences}`;


async function main() {
  const response = await client.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseJsonSchema:  MealPlanSchema.toJSONSchema()
    }
  });
  console.log(response.text);
}




main();

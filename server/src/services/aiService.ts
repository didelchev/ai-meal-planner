import { GoogleGenAI } from "@google/genai";
import { z } from 'zod';
import { buildMealPlanPrompt } from "./promptBuilderService.js";
import { MarcoTargets, ProfileBody } from "../types/user.types.js";
import 'dotenv/config'

const profileExample: ProfileBody = {
    age: 23,
    weightKg: 85,
    heightCm: 174,
    sex: 'male',
    activityLevel: 'light',
    goal: 'maintain',
    dietaryRestrictions: [],
    foodDislikes: 'mushrooms',
    mealsPerDay: 3
}
const client = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
})

const macrosExample: MarcoTargets = {
    calories: 2513,
    proteinG: 153,
    carbsG: 318,
    fatG:  70
}

const MealSchema = z.object({
  type: z.string(),
  name: z.string(),
  description: z.string(),
  calories: z.number(),
  proteinG: z.number(),
  carbsG: z.number(),
  fatG: z.number(),
  ingredients: z.array(z.object({
    name: z.string(),
    amount: z.string()
  })),
  instructions: z.array(z.string())
});

const DaySchema = z.object({
  day: z.string(),
  meals: z.array(MealSchema)
});

const FullMealPlanSchema = z.object({
  days: z.array(DaySchema)
});

export type FullMealPlan = z.infer<typeof FullMealPlanSchema>;

export const generateFullMealPlan = async (
  profile: ProfileBody,
  macros: MarcoTargets
): Promise<FullMealPlan> => {
  const prompt = buildMealPlanPrompt(profile, macros);


  const response = await client.models.generateContent({
    model: "gemini-2.0-flash",
    contents: [{ role: 'user', parts: [{ text: prompt }] }],
    config: {
      maxOutputTokens: 8192,
      temperature: 0.5,
      responseMimeType: "application/json",
    }
  });

  if (!response.text) {
    throw new Error("Empty response from AI");
  }

  console.log("Response length:", response.text.length);

  let parsed;
  try {
    parsed = JSON.parse(response.text);
  } catch {
    console.error("Raw response:", response.text.slice(0, 500));
    throw new Error("Invalid JSON from AI");
  }

  const validated = FullMealPlanSchema.safeParse(parsed);

  if (!validated.success) {
    console.error("Schema validation failed:", validated.error);
    throw new Error("AI response does not match expected structure");
  }

  return validated.data;
};


console.log(await generateFullMealPlan(profileExample, macrosExample))
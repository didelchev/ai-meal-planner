import { ProfileBody } from "../types/user.types.js";
import { MarcoTargets } from "../types/user.types.js";

export const buildMealPlanPrompt = (
  profile: ProfileBody,
  macros: MarcoTargets,
): string => {
  return `You are a professional nutritionist.
Generate a 7-day meal plan for Monday through Sunday.

PROFILE:
- Age: ${profile.age}
- Weight: ${profile.weightKg}kg
- Height: ${profile.heightCm}cm
- Sex: ${profile.sex}
- Goal: ${profile.goal}
- Activity level: ${profile.activityLevel}
- Dietary restrictions: ${profile.dietaryRestrictions.length > 0 ? profile.dietaryRestrictions.join(", ") : "None"}
- Food dislikes: ${profile.foodDislikes || "None"}
- Meals per day: ${profile.mealsPerDay}

DAILY TARGETS:
- Calories: ${macros.calories}
- Protein: ${macros.proteinG}g
- Carbohydrates: ${macros.carbsG}g
- Fat: ${macros.fatG}g

RULES:
- EXACTLY ${profile.mealsPerDay} meals per day (no more, no less)
- No repeated meals across the 7 days
- Max 4 ingredients per meal
- Max 2 instruction steps per meal
- Each instruction must be under 12 words
- Description must be under 10 words
- Use short ingredient names
- Be concise

RESPONSE FORMAT:
Return ONLY valid JSON with no text before or after:

{
  "days": [
    {
      "day": "Monday",
      "meals": [
        {
          "type": "breakfast",
          "name": "Example",
          "description": "Short description",
          "calories": 400,
          "proteinG": 30,
          "carbsG": 40,
          "fatG": 10,
          "ingredients": [
            { "name": "Food", "amount": "100g" }
          ],
          "instructions": ["Step 1", "Step 2"]
        }
      ]
    }
  ]
}`;
};
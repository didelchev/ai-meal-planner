import { MarcoTargets } from "../types/user.types.js";


export interface UserStats { 
    age: number;
    weightKg: number;
    heightCm: number;
    sex: 'male' | 'female';
    activityLevel: 'sedentary' | 'light' | 'moderate' | 'active' | 'very_active';
    goal: 'lose' | 'maintain' | 'gain';
}


const activityMultipliers: Record<string, number> = { 
    sedentary: 1.2,
    light: 1.375,
    moderate: 1.55,
    active: 1.725,
    very_active: 1.9
}


export const calculateMacros = (stats: UserStats): MarcoTargets => {
    let bmr: number;

    if(stats.sex === 'male'){
        bmr = 10 * stats.weightKg + 6.25 * stats.heightCm - 5 * stats.age + 5;
    }else { 
        bmr = 10 * stats.weightKg + 6.25 * stats.heightCm - 5 * stats.age - 161;
    }

    const tdee = bmr * activityMultipliers[stats.activityLevel];

    let calories: number;

    if( stats.goal === 'lose'){
        calories = Math.round(tdee - 400);
    }else if( stats.goal === 'gain'){
        calories = Math.round(tdee + 250);
    }else{
        calories = Math.round(tdee);
    }

    const proteinG = Math.round(stats.weightKg * 2);
    const fatG = Math.round((calories * 0.25) / 9);
    const proteinCalories = proteinG * 4;
    const fatCalories = fatG * 9;

    const carbsG = Math.round((calories - proteinCalories - fatCalories) / 4) ;

    return { 
        calories,
        proteinG,
        carbsG,
        fatG    
    }
}
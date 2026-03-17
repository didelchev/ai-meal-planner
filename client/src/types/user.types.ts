export interface User {
  _id?: string;
  email: string;
  username: string;
  accessToken?: string;
}

export interface UserResponse {
  status: string;
  data: User;
}

export interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  saveSession: (user: User) => void;
  clearSession: () => void;
}

export interface LoginBody {
  email: string;
  password: string;
}

export interface RegisterBody {
  email: string;
  username: string;
  password: string;
}

export interface ProfileBody {
  age: number;
  weightKg: number;
  heightCm: number;
  sex: 'male' | 'female';
  activityLevel: 'sedentary' | 'light' | 'moderate' | 'active' | 'very_active';
  goal: 'lose' | 'maintain' | 'gain';
  dietaryRestrictions: string[];
  foodDislikes: string;
  mealsPerDay: number;
}


export interface MacroTargets {
  calories: number;
  proteinG: number;
  carbsG: number;
  fatG: number;
}

export interface ProfileResponse { 
  profile: ProfileBody,
  macros: MacroTargets
}
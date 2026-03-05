import { JwtPayload } from "jsonwebtoken"
import { Request } from "express"

export interface User { 
    id: string,
    username: string,
    email: string,
    created_at: Date
}
export interface UserWithPassword { 
    id: string,
    username: string,
    password_hash: string,
    email: string,
    created_at: Date
}

export interface AuthResponse { 
    _id: string,
    email: string,
    username: string,
    accessToken: string
}

export interface RegisterBody { 
    email: string,
    username: string,
    password: string
}

export interface LoginBody { 
    email: string,
    password: string
}


export interface TokenPayload extends JwtPayload {
  _id: string;
  email: string;
}

export interface AuthRequest extends Request {
  user?: {
    _id: string;
    email: string;
  }
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
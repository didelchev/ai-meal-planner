import pool from "../pool";
import { ProfileBody } from "../../types/user.types";

export const createProfile = async (userId: string, profile: ProfileBody) => {
  const result = await pool.query(
    `INSERT INTO profiles 
      (user_id, age, weight_kg, height_cm, sex, activity_level, goal, dietary_restrictions, food_dislikes, meals_per_day)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *`,
    [
      userId,
      profile.age,
      profile.weightKg,
      profile.heightCm,
      profile.sex,
      profile.activityLevel,
      profile.goal,
      profile.dietaryRestrictions,
      profile.foodDislikes,
      profile.mealsPerDay,
    ],
  );
  return result.rows[0];
};

export const getProfile = async (userId: string) => {
  const result = await pool.query(
    `SELECT * FROM profiles  where user_id = $1`,
    [userId],
  );
  return result.rows[0];
};

export const updateProfile = async (userId: string, profile: ProfileBody) => {
  const result = await pool.query(
    `UPDATE profiles SET
      age = $2,
      weight_kg = $3,
      height_cm = $4,
      sex = $5,
      activity_level = $6,
      goal = $7,
      dietary_restrictions = $8,
      food_dislikes = $9,
      meals_per_day = $10,
      updated_at = NOW()
     WHERE user_id = $1
     RETURNING *`,
    [
      userId,
      profile.age,
      profile.weightKg,
      profile.heightCm,
      profile.sex,
      profile.activityLevel,
      profile.goal,
      profile.dietaryRestrictions,
      profile.foodDislikes,
      profile.mealsPerDay,
    ],
  );
  return result.rows[0];
};

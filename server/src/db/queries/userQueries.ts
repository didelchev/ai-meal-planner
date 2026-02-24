import pool from "../pool";
import { User } from "../../types/user.types";

export const createUser = async (email: string, username: string, hashedPassword: string):Promise<User> => { 

    const result = await pool.query(`
        INSERT INTO users (email, username, password_hash)
        VALUES ($1, $2, $3) 
        RETURNING id, email, created_at`, 
        [email, username, hashedPassword]);

    return result.rows[0]
}


export const findUserByEmail = async (email: string): Promise<User> => { 
    const result = await pool.query(
        `SELECT * FROM users WHERE email = $1`,
        [email]
    )

    return result.rows[0];
}
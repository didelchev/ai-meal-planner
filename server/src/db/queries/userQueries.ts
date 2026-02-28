import pool from "../pool";
import { User, UserWithPassword } from "../../types/user.types";

export const createUser = async (email: string, username: string, hashedPassword: string):Promise<User> => { 

    const result = await pool.query(`
        INSERT INTO users (email, username, password_hash)
        VALUES ($1, $2, $3) 
        RETURNING id, email, username, created_at`, 
        [email, username, hashedPassword]);

        
    return result.rows[0]
}


export const findUserByEmail = async (email: string): Promise<UserWithPassword> => { 
    const result = await pool.query(
        `SELECT * FROM users WHERE email = $1`,
        [email]
    )

    return result.rows[0];
}
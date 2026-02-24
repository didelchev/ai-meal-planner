import { createUser, findUserByEmail } from "../db/queries/userQueries";
import { User } from "../types/user.types";
import bcrypt from 'bcrypt';


export const authService = { 
   async register(email: string, username: string, password: string):Promise<User> { 

        const existingUser = await findUserByEmail(email);

        if(existingUser){ 
            throw new Error("User with that email already exists !")
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const user = await createUser(email, username, hashedPassword)

        return user
    },

    async login(email: string): Promise<void> {

    }
}
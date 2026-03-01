import { createUser, findUserByEmail } from "../db/queries/userQueries";
import { AuthResponse, User } from "../types/user.types";
import bcrypt from 'bcrypt';
import { generateToken } from "../utils/generateToken";
import { isValidEmail, isValidPassword } from "../utils/validators";




export const authService = { 
   async register(email: string, username: string, password: string): Promise<AuthResponse> { 

        const SALT_ROUNDS = 10;

        //TODO: Remove validations from authService
        isValidEmail(email);

        isValidPassword(password);

        const existingUser = await findUserByEmail(email);

        if(existingUser){ 
            throw new Error("User with that email already exists !")
        }

        const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

        const user = await createUser(email, username, hashedPassword);

        const token = generateToken(user.id, user.email)

         return { 
            _id: user.id,
            email: user.email,
            username: user.username,
            accessToken: token
        }
    },

    async login(email: string, password: string): Promise<AuthResponse> {

        //TODO: Remove validations from authService

        isValidEmail(email);

        isValidPassword(password);

        const user = await findUserByEmail(email);

        if(!user) { 
            throw new Error("User with this email doesn't exist !");
        }

        const isPasswordMatching = await bcrypt.compare(password, user.password_hash);

        if(!isPasswordMatching){
            throw new Error("Wrong email address or password !");
        }

        const token = generateToken(user.id, user.email);

        return { 
            _id: user.id,
            email: user.email,
            username: user.username,
            accessToken: token
        }




    },
    
    logout():void { }
}
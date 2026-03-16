import { authAPI } from "../api/authApi";
import { useAuthContext } from "../contexts/AuthContext"
import type { User } from "../types/user.types";


export const useLogin = () => {
    const { saveSession } = useAuthContext();
    
    const loginHandler = async (email: string, password: string ): Promise<User> => {
        try {
            const user = await authAPI.login(email, password)
            saveSession(user);
            return user
        } catch (error) {
            if(error instanceof Error){
                throw new Error(error.message)
            }
            throw new Error('Login Failed !')
        }
    }

    return loginHandler

}

export const useRegister = () => {
    const { saveSession } = useAuthContext();

    const registerHandler = async (email: string, username: string, password: string): Promise<User> => {

        try {
            const user = await authAPI.register(email, username, password);
            saveSession(user)
            return user
            
        } catch (error) {
            if (error instanceof Error){
                throw new Error(error.message)
            }
            throw new Error('Register Failed !')
        }



    }

    return registerHandler
}


export const useLogout = ( ) => {
    const { clearSession } = useAuthContext();

    const logoutHandler = ( ) =>{
        clearSession();
    }

    return logoutHandler
}
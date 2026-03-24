import { useState } from "react";
import { authAPI } from "../api/authApi";
import { useAuthContext } from "../contexts/AuthContext"
import type { User } from "../types/user.types";


export const useLogin = () => {
    const { saveSession } = useAuthContext();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    
    const login = async (email: string, password: string ): Promise<User> => {
        setIsLoading(true);
        setError(null);
        try {
            const user = await authAPI.login(email, password)
            saveSession(user);
            return user
        } catch (err) {
            const message = err instanceof Error ? err.message : 'Login failed !'
            setError(message);
            throw error
        } finally {
            setIsLoading(false)
        }
    }

    return { login, isLoading, error}

}

export const useRegister = () => {
    const { saveSession } = useAuthContext();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const register = async (email: string, username: string, password: string): Promise<User> => {
        setIsLoading(true);
        setError(null);
        try {
            const user = await authAPI.register(email, username, password);
            saveSession(user)
            return user
        } catch (err) {
            const message = err instanceof Error ? err.message : 'Register failed'
            console.log(message)
            setError(message)
            throw error
        } finally{
            setIsLoading(false)
        }



    }

    return { register, isLoading, error}
}


export const useLogout = ( ) => {
    const { clearSession } = useAuthContext();

    const logoutHandler = ( ) =>{
        clearSession();
    }

    return logoutHandler
}
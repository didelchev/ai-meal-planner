import { createContext, useContext, useEffect, useState, type ReactNode } from "react"
import  {type User, type AuthContextType } from "../types/user.types"


export const AuthContext =  createContext<AuthContextType | null>(null);


export const AuthProvider= ({children}: { children: ReactNode}) => {
    const [ user, setUser] = useState<User | null>(null);
    const [ token, setToken ] = useState<string | null>(null);

    useEffect(() => {
        const savedToken = localStorage.getItem('jwt');
        const savedUser = localStorage.getItem('user');

        if(savedToken && savedUser) {
            setToken(savedToken);
            setUser(JSON.parse(savedUser))
        }
    }, [])

    const saveSession = (token: string, user: User): void => {}
        localStorage.setItem('jwt', token)
        localStorage.setItem('user', user)
        setToken(token);
        setUser(user)

    const clearSession = () => {
        localStorage.removeItem('jwt');
        localStorage.removeItem('user');
        setToken(null);
        setUser(null);
    }

    const isAuthenticated = !!token

   return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );

}


export const useAuthContext = () => {
    return useContext(AuthContext)
}
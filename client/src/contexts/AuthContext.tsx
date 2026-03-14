import { createContext, useContext, useEffect, useState, type ReactNode } from "react"
import  {type User, type AuthContextType } from "../types/user.types"


export const AuthContext =  createContext<AuthContextType | null>(null);


export const AuthProvider= ({children}: { children: ReactNode}) => {
    const [ user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const savedToken = localStorage.getItem('jwt');
        const savedUser = localStorage.getItem('user');

        if(savedToken && savedUser) {
            setUser(JSON.parse(savedUser))
        }
    }, [])

    const saveSession = (user: User): void => {

        if(user.accessToken){
            localStorage.setItem('jwt', user.accessToken)
        }

        localStorage.setItem('user', JSON.stringify({
            _id: user._id,
            email: user.email,
            username: user.username
        }))
        setUser(user)

    }
        
    const clearSession = () => {
        localStorage.removeItem('jwt');
        localStorage.removeItem('user')
        setUser(null);
    }

    const isAuthenticated = !!user

           

    return (
      <AuthContext.Provider
        value={{ user, isAuthenticated, saveSession, clearSession }}
      >
        {children}
      </AuthContext.Provider>
    );


}


export const useAuthContext = () => {
    const context = useContext(AuthContext);

    if(!context){
        throw new Error("useAuth must be used inside AuthProvider")

    }

    return context
}
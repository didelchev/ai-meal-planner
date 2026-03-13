export interface User { 
    email: string,
    username?: string,
    password: string
}


export interface AuthContextType { 
    user: User | null;
    token: string | null;
    isAuthenticated: boolean;
    saveSession: (token: string, user: User) => void
    clearSession: () => void

}
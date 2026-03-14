import type { User, UserResponse } from "../types/user.types"
import { API } from "../utils/fetcher"

const AUTH_API_ENDPOINT = 'http://localhost:5000/auth'

export const authAPI = { 
    async login(email: string, password: string): Promise<User>{
        const response = await API.post<UserResponse>(`${AUTH_API_ENDPOINT}/login`,{email, password} )

        return response.data

    },
    async register(email: string, username: string, password: string): Promise<User>{
        const response =  await API.post<UserResponse>(`${AUTH_API_ENDPOINT}/register`,{email, username, password} )

        return response.data    
    }
}
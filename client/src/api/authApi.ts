import { API } from "../utils/fetcher"

const AUTH_API_ENDPOINT = 'http://localhost:5000/auth'

export const authAPI = { 
    async login(email: string, password: string): Promise<any>{
        return await API.post(`${AUTH_API_ENDPOINT}/login`,{email, password} )

    },
    async register(email: string, username: string, password: string): Promise<any>{
        return await API.post(`${AUTH_API_ENDPOINT}/register`,{email, username, password} )
    }
}
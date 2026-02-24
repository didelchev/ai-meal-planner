export interface User { 
    id: string,
    username: string,
    email: string,
    created_at: Date
}

export interface RegisterBody { 
    email: string,
    username: string,
    password: string
}

export interface LoginBody { 
    email: string,
    password: string
}
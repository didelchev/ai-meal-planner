export interface User { 
    id: string,
    username: string,
    email: string,
    created_at: Date
}
export interface UserWithPassword { 
    id: string,
    username: string,
    password_hash: string,
    email: string,
    created_at: Date
}

export interface AuthResponse { 
    _id: string,
    email: string,
    username: string,
    accessToken: string
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
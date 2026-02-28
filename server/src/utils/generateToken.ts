import jwt from 'jsonwebtoken';


export const generateToken = (userId: string, userEmail:string): string => { 
    const JWT_SECRET = process.env.JWT_SECRET;

    if(!JWT_SECRET) { 
        throw new Error("JWT_SECRET is not defined")
    }

    const payload = { 
        _id: userId,
        userEmail
    }

    const token = jwt.sign(payload, JWT_SECRET);

    return token
}
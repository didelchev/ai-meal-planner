import React from 'react'
import { useAuthContext } from '../contexts/AuthContext'
import { Navigate } from 'react-router-dom';


interface ProtectedRouteProps {
    children: React.ReactNode
}


const ProtectedRoutes = ({ children }: ProtectedRouteProps) => {

    const { isAuthenticated } = useAuthContext();

    if(!isAuthenticated) {
        return <Navigate to='/login' replace />
    }

    return children
}

export default ProtectedRoutes
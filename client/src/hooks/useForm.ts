import React, { useState } from "react"

export const useForm = (initialValues: any) => {
    const [ formData, setFormData ] = useState(initialValues);

    const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({...formData, [e.target.name]: e.target.value})
    }

    return { 
        formData,
        changeHandler
    }
}
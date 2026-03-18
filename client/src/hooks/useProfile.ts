import { useNavigate } from "react-router-dom"
import { profileAPI } from "../api/profileApi"
import type { ProfileBody  } from "../types/user.types"

export const useProfile = () => {
    const navigate = useNavigate();

    const createUserProfile = async (profileData: ProfileBody) => {
        try {
            const response = await profileAPI.createUserProfile(profileData);
            navigate('/dashboard');
            return response
        } catch (error) {
            if(error instanceof Error){
                console.log(error.message)
            }else{
                console.log('Something went wrong !')
            }
        }
    }

    return createUserProfile
}
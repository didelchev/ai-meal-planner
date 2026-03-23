import { useNavigate } from "react-router-dom"
import { profileAPI } from "../api/profileApi"
import type { ProfileBody, ProfileResponse  } from "../types/user.types"
import { useEffect, useState } from "react";

export const useCreateProfile = () => {
    const navigate = useNavigate();

    const createUserProfile = async (profileData: ProfileBody) => {
        try {
            const user = await profileAPI.createUserProfile(profileData);
            navigate('/dashboard');
            return user
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


export const useGetProfile = () => { 
    const [userProfile, setUserProfile] = useState<ProfileResponse | null>(null);
    const [ isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        (async () => {
            try {
                const userProfileData = await profileAPI.getUserProfile();
                setUserProfile(userProfileData)
                setIsLoading(false)
            } catch (error) {
                if(error instanceof Error){
                    console.log(error.message)
                }else{
                    console.log('Something went wrong !')
                }
            }
        })()
    },[])

    return { userProfile, setUserProfile, isLoading}
}


export const useUpdateUserProfile = () => { 

    const updateUserProfile = async (profileData: ProfileBody) => {
        try {
            const updatedUser = await profileAPI.updateUserProfile(profileData);

            return updatedUser
        } catch (error) {
            if(error instanceof Error){
                console.log(error.message)
            }else{
                console.log('Something went wrong !')
            }
        }
    }
return updateUserProfile
        
}
import { useNavigate } from "react-router-dom"
import { profileAPI } from "../api/profileApi"
import type { ProfileBody, ProfileResponse  } from "../types/user.types"
import { useEffect, useState } from "react";

export const useCreateProfile = () => {
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


export const useGetProfile = () => { 
    const [userProfile, setUserProfile] = useState<ProfileResponse | null>(null);
    //TODO: add loading state
    useEffect(() => {
        (async () => {
            try {
                const userProfileData = await profileAPI.getUserProfile();
                
                setUserProfile(userProfileData)
            } catch (error) {
                if(error instanceof Error){
                    console.log(error.message)
                }else{
                    console.log('Something went wrong !')
                }
            }
        })()
    },[])

    return { userProfile, setUserProfile}
}

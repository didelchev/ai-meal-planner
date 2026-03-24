import type { ProfileBody, ProfileResponse } from "../types/user.types";
import { API } from "../utils/fetcher";

const PROFILE_API_ENDPOINT = 'http://localhost:5000/profile'


export const profileAPI = {
    async getUserProfile(): Promise<ProfileResponse>{
        return API.get(PROFILE_API_ENDPOINT)
    },


    async createUserProfile(profileData: ProfileBody): Promise<ProfileResponse>{
       return API.post(PROFILE_API_ENDPOINT, profileData) 
    },

    async updateUserProfile(profileData: ProfileBody): Promise<ProfileResponse>{
        return API.post(PROFILE_API_ENDPOINT, profileData)
    }

};
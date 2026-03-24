import { Request, Response, Router } from "express";
import { AuthRequest, ProfileBody } from "../types/user.types";
import { createProfile, getProfile, updateProfile } from "../db/queries/profileQueries";
import { calculateMacros } from "../services/tdeeService";
import { json } from "node:stream/consumers";

const profileController = Router();

profileController.get('/', async (req: AuthRequest, res: Response) => { 
    const userId = req.user?._id as string;

    try {
        const profile = await getProfile(userId);

        if(!profile){
            return res.status(404).json({ message: 'Profile not found !'})
        }

        const macros = calculateMacros({
            age: profile.age,
            weightKg: profile.weightKg,
            heightCm: profile.heightCm,
            sex: profile.sex,
            activityLevel: profile.activityLevel,
            goal: profile.goal
        })
        
        res.json({ profile, macros})
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: "Server error"})
    }
})


profileController.post('/', async (req: AuthRequest, res: Response) => { 
    const userId = req.user?._id as string;
    const profileData: ProfileBody = req.body;

    try {
        const existingProfile = await getProfile(userId);

        let userProfile;

        if( existingProfile ) { 
            userProfile = await updateProfile(userId, profileData)
        }else{ 
            userProfile = await createProfile(userId, profileData)
        }

         const macros = calculateMacros({
           age: profileData.age,
           weightKg: profileData.weightKg,
           heightCm: profileData.heightCm,
           sex: profileData.sex,
           activityLevel: profileData.activityLevel,
           goal: profileData.goal,
         });

         res.json({ userProfile, macros})
       
    } catch (error) {
        if(error instanceof Error){
            res.status(400).json({message: error.message})

        }
        res.status(500).json({ message: 'Server error' });
    }
})


export default profileController
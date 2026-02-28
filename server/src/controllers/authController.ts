import { Request, Response, Router } from "express";
import { authService } from "../services/authService";

const authController = Router();

authController.post('/register', async (req: Request, res: Response) => { 
    const { email, username, password } = req.body;

    try {
        const user = await authService.register(email, username, password)

        res.status(201).json(user)
    } catch (error) {
        if(error instanceof Error) {
            res.status(400).json({message: error.message})
        }else{
            res.status(400).json({message: "An unknown error occured !"})
        }
    }

})

authController.post('/login', async (req: Request, res: Response) => { 
    const { email, password } = req.body;

    try {
        const user = await authService.login(email, password)
        
        res.status(201).json({status: "success", data: user})

    } catch (error) {
        if(error instanceof Error) {
            res.status(400).json({message: error.message})
        }else{
            res.status(400).json({message: "An unknown error occured !"})
        }
    }



})

export default authController
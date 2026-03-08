import { Request, Response, Router } from "express";
import { authService } from "../services/authService";

const authController = Router();

authController.post('/register', async (req: Request, res: Response): Promise<void> => { 
    const { email, username, password } = req.body;

    try {
        const user = await authService.register(email, username, password)

        res.status(201).json({status: "success", data: user})
        
    } catch (error) {
        if(error instanceof Error) {
            res.status(400).json({message: error.message})
        }else{
            res.status(400).json({message: "An unknown error occured !"})
        }
    }

})

authController.post('/login', async (req: Request, res: Response): Promise<void> => { 
    const { email, password } = req.body;

    try {
        const user = await authService.login(email, password)

        res.cookie('jwt', user.accessToken, { 
            httpOnly: true,
            sameSite: "strict",
            maxAge: (1000 * 60 * 60 * 24) * 7
        })
        
        res.status(201).json({status: "success", data: user})

    } catch (error) {
        if(error instanceof Error) {
            res.status(400).json({message: error.message})
        }else{
            res.status(400).json({message: "An unknown error occured !"})
        }
    }

})


authController.post('/logout', (req: Request, res: Response):void => {
    res.clearCookie('jwt');

    res.status(200).json({status: "success", message: "Loged out successfully !"})
})

export default authController
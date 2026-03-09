import { Request, Response, Router } from "express";


const testController = Router();

testController.get("/", (req: Request, res: Response) => { 
    res.json({message: "success"})
})

export default testController
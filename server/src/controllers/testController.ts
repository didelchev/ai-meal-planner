import { Request, Response, Router } from "express";

const testController = Router();

testController.get('/', (req: Request, res: Response) => { 
    res.send('Test controller is working !')

})


export default testController

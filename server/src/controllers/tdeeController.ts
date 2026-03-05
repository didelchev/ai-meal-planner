import { Request, Response, Router } from "express";
import { calculateMacros } from "../services/tdeeService";


const tdeeController = Router();

tdeeController.get('/', (req: Request, res: Response) => { 
    const macros = calculateMacros({
    age: 27,
    weightKg: 89,
    heightCm: 173,
    sex: 'male',
    activityLevel: 'sedentary',
    goal: 'lose'
  });

  res.json(macros);

})


export default tdeeController
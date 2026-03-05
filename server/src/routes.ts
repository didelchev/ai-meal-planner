import express, { Router } from 'express';
import authController from './controllers/authController';
import tdeeController from './controllers/tdeeController';


const routes = Router();


routes.use('/auth', authController)

routes.use('/test-tdee', tdeeController)



export default routes
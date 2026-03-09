import express, { Router } from 'express';
import authController from './controllers/authController';
import tdeeController from './controllers/tdeeController';
import profileController from './controllers/profileController';
import { authMiddleware } from './middlewares/authMiddleware';
import testController from './controllers/testController';


const routes = Router();


routes.use("/", testController)

routes.use('/auth', authController)

routes.use('/test-tdee', tdeeController)

routes.use('/profile', authMiddleware, profileController)



export default routes
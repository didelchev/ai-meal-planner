import express, { Router } from 'express';
import testController from './controllers/testController';


const routes = Router();

routes.use('/', testController)


export default routes
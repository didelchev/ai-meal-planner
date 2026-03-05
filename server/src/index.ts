import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import routes from './routes';
import { authMiddleware } from './middlewares/authMiddleware';

dotenv.config()

const app = express();

const PORT = process.env.PORT || 5000;

app.use(cors())

app.use(express.json());

app.use(routes);

app.listen(PORT, () => {
    console.log(`Server is listening on http://localhost:${PORT} ...`)
})


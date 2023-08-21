import  express  from 'express';
import cityRouter from './city.router.js';
import userRouter from './user.router.js';

const router = express.Router();

router.use('/cities', cityRouter)

router.use('/users', userRouter)

export default router;
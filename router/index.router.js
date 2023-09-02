import  express  from 'express';
import cityRouter from './city.router.js';
import userRouter from './user.router.js';
import itineraryRouter from './itinerary.router.js'
import ActivityRouter from './activity.router.js'

const router = express.Router();

router.use('/cities', cityRouter)

router.use('/itineraries', itineraryRouter)

router.use('/activities', ActivityRouter)

router.use('/users', userRouter)

export default router;
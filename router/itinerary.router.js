import  express  from 'express';
import ItineraryController from '../controllers/itinerary.controller.js';

const router = express.Router();

const {getItineraries, createItineraries, updateItineraries, deleteItineraries} = ItineraryController;

router.get('/', getItineraries);

router.post('/', createItineraries);

router.put('/:id', updateItineraries);

router.delete('/:id', deleteItineraries);

export default router;
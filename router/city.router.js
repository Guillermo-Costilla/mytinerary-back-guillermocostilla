import  express  from 'express';
import cityController from '../controllers/city.controller.js';

const router = express.Router();

const {getCities, createCities, updateCities, deleteCities, getCityById} = cityController;

router.get('/', getCities);

router.get('/:id', getCityById);

router.post('/', createCities);

router.put('/:id', updateCities);

router.delete('/:id', deleteCities);

export default router;
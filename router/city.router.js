import express from 'express';
import cityController from '../controllers/city.controller.js';
import { isAdmin } from '../middlewares/IsAdmin.middleware.js';
import passport from '../middlewares/passport.js';

const router = express.Router();

const { getCities, createCities, updateCities, deleteCities, getCityById } = cityController;

router.get('/', getCities);
router.get('/:id', getCityById);
router.post('/', createCities);
router.put('/:id', passport.authenticate('jwt', { session: false }), isAdmin, updateCities);
router.delete('/:id', passport.authenticate('jwt', { session: false }), deleteCities);

export default router;
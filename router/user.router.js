import express from 'express';
import userController from '../controllers/user.controller.js';
import validator from '../middlewares/validator.js';
import { createUserSchema } from '../schema/user.schema.js';
import passport from '../middlewares/passport.js';
import City from '../models/City.js';
import verifyToken from '../middlewares/auth.js';

const { getUsers, createUsers, updateUser, deleteUser, getUserById, login } = userController;

const router = express.Router();

router.get('/', getUsers);

router.get('/:id', getUserById);

router.post('/', validator(createUserSchema), createUsers);

router.put('/:id', passport.authenticate('jwt', { session: false }), updateUser);

router.delete('/:id', passport.authenticate('jwt', { session: false }), deleteUser);

// Ruta para obtener las ciudades creadas por el usuario autenticado
router.get('/me/cities', verifyToken, async (req, res) => {
    try {
        const cities = await City.find({ creator: req.user._id });
        return res.status(200).json({
            success: true,
            cities
        });
    } catch (error) {
        console.error(error); // Log de error
        return res.status(500).json({
            success: false,
            message: 'Error al obtener las ciudades',
            error: error.message
        });
    }
});

// Crear una ciudad y asignarla al usuario autenticado
router.post('/cities', verifyToken, async (req, res) => {
    try {
        const { city, country, currency, language, description, image } = req.body;

        if (!city || !country || !currency || !language) {
            return res.status(400).json({ success: false, message: "City, country, currency, and language are required" });
        }

        // Verifica que req.user.id esté definido
        if (!req.user || !req.user._id) {
            return res.status(401).json({ success: false, message: "User not authenticated" });
        }

        const newCity = new City({
            city,
            country,
            currency,
            language,
            description,
            image,
            creator: req.user._id // Asigna la ciudad al usuario autenticado
        });

        await newCity.save();

        return res.status(201).json({ 
            success: true, 
            message: "City created successfully",
            city: newCity
        });
    } catch (error) {
        console.error(error); // Log de error
        return res.status(500).json({ 
            success: false, 
            message: "Error creating the city", 
            error: error.message 
        });
    }
});



export default router;
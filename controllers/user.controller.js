import User from "../models/User.js";
import City from '../models/City.js';
import mongoose from 'mongoose';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';

const controller = {
  getUsers: async (req, res) => {
    try {
      const users = await User.find();
      return res.status(200).json({
        success: true,
        users: users,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        message: "Error when obtaining users",
      });
    }
  },

  getUserById: async (req, res) => {
    try {
      if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(400).json({
          success: false,
          message: "Invalid user ID",
        });
      }

      console.log("User ID:", req.params.id); // Verifica el ID que se está pasando

      const user = await User.findById(req.params.id);
      if (user) {
        return res.status(200).json({
          success: true,
          user: user,
        });
      }
      return res.status(404).json({
        success: false,
        message: "The user could not be found",
      });
    } catch (error) {
      console.error("Error obtaining user:", error);
      res.status(500).json({
        success: false,
        message: "Error when obtaining user",
      });
    }
  },

  createUsers: async (req, res) => {
    try {
      const newUser = await User.create(req.body);
      return res.status(201).json({
        success: true,
        message: "User created",
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        message: "Error when creating user",
      });
    }
  },

  updateUser: async (req, res) => {
    try {
      await User.updateOne({ _id: req.params.id }, req.body);
      return res.status(200).json({
        success: true,
        message: "User updated successfully",
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        message: "Error when updating user",
      });
    }
  },

  deleteUser: async (req, res) => {
    try {
      await User.deleteOne({ _id: req.params.id });
      return res.status(200).json({
        success: true,
        message: "The User was successfully deleted",
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        success: false,
        message: "Error when deleting User",
      });
    }
  },

  getUserCities: async (req, res) => {
    try {
      const cities = await City.find({ creator: req.user._id });
      return res.status(200).json({
        success: true,
        cities,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        success: false,
        message: 'Error al obtener las ciudades',
      });
    }
  },

  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });
      
      if (!user) {
        return res.status(404).json({
          success: false,
          message: "Usuario no encontrado"
        });
      }

      // Verificar contraseña usando bcryptjs
      if (!bcryptjs.compareSync(password, user.password)) {
        return res.status(401).json({
          success: false,
          message: "Contraseña incorrecta"
        });
      }

      // Crear token
      const token = jwt.sign(
        { id: user._id, email: user.email },
        process.env.SECRET,
        { expiresIn: '24h' }
      );

      return res.status(200).json({
        success: true,
        message: "Inicio de sesión exitoso",
        _id: user._id,        // ID del usuario explícitamente
        user: {
          _id: user._id,      // ID también en el objeto user
          email: user.email,
          name: user.name,
          image: user.image
        },
        token
      });

    } catch (error) {
      console.error(error);
      return res.status(500).json({
        success: false,
        message: "Error en el inicio de sesión"
      });
    }
  },
};

export default controller;
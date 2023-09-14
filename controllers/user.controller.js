import User from "../models/User.js";

const controller = {
  getUsers: async (req, res) => {
    
    try {
      const users = await User.find();
        return res.status(200).json({
          success: true,
          users: users,
        });
      } catch (error) {
      console.log(error);
      res.status(500).json({
        success: false,
        message: "Error when obtaining users",
      });
    }},


  getUserById: async (req, res) => {
    try {
      const user = await User.findById(req.params.id)

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
      console.log(error);
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
        Message: "User created",
      });
    } catch (error) {
      console.log(error);
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
        message: "updating user",
      });
    } catch (error) {
      console.log(error);
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
        message: "The User was successfully eliminated",
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        success: false,
        message: "Error when deleting User",
      });
    }
  },
};

export default controller;
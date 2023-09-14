import Itinerary from "../models/itineraries.js";
import Activity from "../models/Activity.js";

const controller = {
  getActivities: async (req, res) => {
    try {
      const activities = await Activity.find();

      return res.status(200).json({
        success: true,
        activities,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        success: false,
        message: "Error when obtaining Activities",
      });
    }
  },
  createActivities: async (req, res) => {
    try {
    
      const newActivity = await Activity.create(req.body);

      return res.status(201).json({
        success: true,
        message: "Activity created",
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        success: false,
        message: "Error when creating activity",
      });
    }
  },
  updateActivity: async (req, res) => {
    try {
      await Activity.updateOne({ _id: req.params.id }, req.body);

      return res.status(200).json({
        success: true,
        message: "Activity updated",
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        success: false,
        message: "Error when updating Activity",
      });
    }
  },
  deleteActivity: async (req, res) => {
    try {
      await Activity.deleteOne({ _id: req.params.id });

      return res.status(200).json({
        success: true,
        message: "The activity was successfully eliminated",
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        success: false,
        message: "Error when deleting the activity",
      });
    }
  },
};

export default controller;
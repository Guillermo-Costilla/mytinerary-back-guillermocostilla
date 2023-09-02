import Itinerary from "../models/itineraries.js";
import City from "../models/City.js";

const controller = {
  getItineraries: async (req, res) => {
    try {
      const itineraries = await Itinerary.find();

      return res.status(200).json({
        success: true,
        itineraries,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        success: false,
        message: "Error when obtaining itineraries",
      });
    }
  },
  createItineraries: async (req, res) => {
    try {
      const newItinerary = await Itinerary.create(req.body);

      return res.status(201).json({
        success: true,
        message: "itinerary created",
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        success: false,
        message: "Error when creating itinerary",
      });
    }
  },
  updateItineraries: async (req, res) => {
    try {
      await Itinerary.updateOne({ _id: req.params.id }, req.body);

      return res.status(200).json({
        success: true,
        message: "itinerary updated",
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        success: false,
        message: "Error when updating itinerary",
      });
    }
  },
  deleteItineraries: async (req, res) => {
    try {
      await Itinerary.deleteOne({ _id: req.params.id });

      return res.status(200).json({
        success: true,
        message: "The itinerary was successfully eliminated",
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        success: false,
        message: "Error when deleting the itinerary",
      });
    }
  },
};

export default controller;

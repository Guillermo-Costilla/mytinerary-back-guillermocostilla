import City from "../models/City.js";

const controller = {
  getCities: async (req, res) => {
    let queries = {};

    if (req.query.city) {
      queries.city = new RegExp(`^${req.query.city}`, "i");
    }

    try {
      const cities = await City.find(queries);

      if (cities.length > 0) {
        return res.status(200).json({
          success: true,
          cities: cities,
        });
      }

      return res.status(404).json({
        success: false,
        message: "No countries or cities found",
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        success: false,
        message: "Error when obtaining cities",
      });
    }
  },

  getCityById: async (req, res) => {
    try {
      const city = await City.findById(req.params.id).populate('itineraries').populate('activities');

      if (city) {
        return res.status(200).json({
          success: true,
          city: city,
        });
      }
      return res.status(404).json({
        success: false,
        message: "The city could not be found",
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        success: false,
        message: "Error when obtaining city",
      });
    }
  },

  createCities: async (req, res) => {
    try {
      const newCity = await City.create(req.body);

      return res.status(201).json({
        success: true,
        Message: "City created",
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        success: false,
        message: "Error when creating city",
      });
    }
  },

  updateCities: async (req, res) => {
    try {
      await City.updateOne({ _id: req.params.id }, req.body);

      return res.status(200).json({
        success: true,
        message: "la ciudad se actualizo",
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        success: false,
        message: "Error when updating city",
      });
    }
  },

  deleteCities: async (req, res) => {
    try {
      await Event.deleteOne({ _id: req.params.id });

      return res.status(200).json({
        success: true,
        message: "The city was successfully eliminated",
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        success: false,
        message: "Error when deleting the city",
      });
    }
  },
};

export default controller;

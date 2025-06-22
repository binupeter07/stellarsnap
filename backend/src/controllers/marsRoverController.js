// src/controllers/marsRoverController.js
const axios = require("axios");
const { NASA_API_BASE_URL, NASA_API_KEY } = require("../config/apiConfig");

/**
 * Controller for the Mars Rover Photos endpoints
 */
const marsRoverController = {
  /**
   * Get the latest photos from all operational Mars rovers
   */
  getLatestPhotos: async (req, res, next) => {
    try {
      const { page = 1, per_page = 25 } = req.query;
      // Get latest photos from all rovers (currently operating rovers: Curiosity, Perseverance)
      const rovers = ["curiosity", "perseverance"];

      const roverData = await Promise.all(
        rovers.map(async (rover) => {
          try {
            const response = await axios.get(
              `${NASA_API_BASE_URL}/mars-photos/api/v1/rovers/${rover}/latest_photos`,
              {
                params: {
                  api_key: NASA_API_KEY,
                  page,
                  per_page,
                },
              }
            );

            return {
              rover,
              status: "success",
              photos: response.data.latest_photos,
            };
          } catch (error) {
            return {
              rover,
              status: "error",
              message: error.message,
            };
          }
        })
      );
      return res.status(200).json({ rovers: roverData });
    } catch (error) {
      next(error);
    }
  },

  /**
   * Get photos from a specific Mars rover
   */
  getRoverPhotos: async (req, res, next) => {
    try {
      const { rover } = req.params;
      const { sol, earth_date, camera, page = 1, per_page = 25 } = req.query;
      // Validate rover name
      const validRovers = [
        "curiosity",
        "opportunity",
        "spirit",
        "perseverance",
      ];
      if (!validRovers.includes(rover.toLowerCase())) {
        return res.status(400).json({
          error: `Invalid rover. Must be one of: ${validRovers.join(", ")}`,
        });
      }

      // Validate that either sol or earth_date is provided, but not both
      if (sol && earth_date) {
        return res
          .status(400)
          .json({ error: "Provide either sol or earth_date, not both" });
      }

      const params = {
        api_key: NASA_API_KEY,
        page,
        per_page,
      };
      if (sol) params.sol = sol;
      if (earth_date) params.earth_date = earth_date;
      if (camera) params.camera = camera;
      const response = await axios.get(
        `${NASA_API_BASE_URL}/mars-photos/api/v1/rovers/${rover}/photos`,
        { params }
      );
      return res.status(200).json(response.data);
    } catch (error) {
      next(error);
    }
  },

  /**
   * Get available cameras for a specific Mars rover
   */
  getRoverCameras: async (req, res, next) => {
    try {
      const { rover } = req.params;

      // Validate rover name
      const validRovers = ["curiosity", "opportunity"];
      if (!validRovers.includes(rover.toLowerCase())) {
        return res.status(400).json({
          error: `Invalid rover. Must be one of: ${validRovers.join(", ")}`,
        });
      }

      const response = await axios.get(
        `${NASA_API_BASE_URL}/mars-photos/api/v1/rovers/${rover}`,
        { params: { api_key: NASA_API_KEY } }
      );

      const cameras = response.data.rover.cameras;

      return res.status(200).json({ rover, cameras });
    } catch (error) {
      next(error);
    }
  },

  /**
   * Get manifest data for a specific Mars rover
   */
  getRoverManifest: async (req, res, next) => {
    try {
      const { rover } = req.params;

      // Validate rover name
      const validRovers = [
        "curiosity",
        "opportunity",
        "spirit",
        "perseverance",
      ];
      if (!validRovers.includes(rover.toLowerCase())) {
        return res.status(400).json({
          error: `Invalid rover. Must be one of: ${validRovers.join(", ")}`,
        });
      }

      const response = await axios.get(
        `${NASA_API_BASE_URL}/mars-photos/api/v1/manifests/${rover}`,
        { params: { api_key: NASA_API_KEY } }
      );

      return res.status(200).json(response.data);
    } catch (error) {
      next(error);
    }
  },
};

module.exports = marsRoverController;

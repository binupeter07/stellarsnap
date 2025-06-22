const axios = require("axios");
const { NASA_API_BASE_URL, NASA_API_KEY } = require("../config/apiConfig");

const apodController = {
  getApod: async (req, res, next) => {
    try {
      const { date, hd, thumbs } = req.query;
      const response = await axios.get(`${NASA_API_BASE_URL}/planetary/apod`, {
        params: {
          api_key: NASA_API_KEY,
          date,
          hd: hd === "true",
          thumbs: thumbs === "true",
        },
      });
      return res.status(200).json(response.data);
    } catch (error) {
      next(error);
    }
  },

  /**
   * Get a random Astronomy Picture of the Day
   */
  getRandomApod: async (req, res, next) => {
    try {
      const { count = 1 } = req.query;
      // Ensure count is between 1 and 100
      const safeCount = Math.min(Math.max(parseInt(count) || 1, 1), 100);
      const response = await axios.get(`${NASA_API_BASE_URL}/planetary/apod`, {
        params: {
          api_key: NASA_API_KEY,
          count: safeCount,
        },
      });
      return res.status(200).json(response.data);
    } catch (error) {
      next(error);
    }
  },

  /**
   * Get the Astronomy Picture of the Day for a specific date
   */
  getApodByDate: async (req, res, next) => {
    try {
      const { date } = req.params;
      const { hd, thumbs } = req.query;
      // Validate date format (YYYY-MM-DD)
      const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
      if (!dateRegex.test(date)) {
        return res
          .status(400)
          .json({ error: "Invalid date format. Use YYYY-MM-DD" });
      }
      const response = await axios.get(`${NASA_API_BASE_URL}/planetary/apod`, {
        params: {
          api_key: NASA_API_KEY,
          date,
          hd: hd === "true",
          thumbs: thumbs === "true",
        },
      });
      return res.status(200).json(response.data);
    } catch (error) {
      next(error);
    }
  },

  /**
   * Get Astronomy Pictures of the Day for a date range
   */
  getApodDateRange: async (req, res, next) => {
    try {
      const { start_date, end_date, thumbs } = req.query;
      // Validate date parameters
      if (!start_date || !end_date) {
        return res
          .status(400)
          .json({ error: "Both start_date and end_date are required" });
      }

      // Validate date format (YYYY-MM-DD)
      const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
      if (!dateRegex.test(start_date) || !dateRegex.test(end_date)) {
        return res
          .status(400)
          .json({ error: "Invalid date format. Use YYYY-MM-DD" });
      }

      // Check if date range is valid
      const startDateObj = new Date(start_date);
      const endDateObj = new Date(end_date);
      if (startDateObj > endDateObj) {
        return res
          .status(400)
          .json({ error: "start_date cannot be after end_date" });
      }

      // Calculate date difference
      const diffTime = Math.abs(endDateObj - startDateObj);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      // Limit date range to prevent abuse
      if (diffDays > 100) {
        return res
          .status(400)
          .json({ error: "Date range cannot exceed 100 days" });
      }

      const response = await axios.get(`${NASA_API_BASE_URL}/planetary/apod`, {
        params: {
          api_key: NASA_API_KEY,
          start_date,
          end_date,
          thumbs: thumbs === "true",
        },
      });
      return res.status(200).json(response.data);
    } catch (error) {
      next(error);
    }
  },
};

module.exports = apodController;

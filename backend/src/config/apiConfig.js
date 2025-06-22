require("dotenv").config();

const NASA_API_KEY = process.env.NASA_API_KEY;
const NASA_API_BASE_URL = "https://api.nasa.gov";

module.exports = {
  NASA_API_KEY,
  NASA_API_BASE_URL,
};

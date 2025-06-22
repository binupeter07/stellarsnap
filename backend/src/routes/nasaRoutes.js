// src/routes/nasaRoutes.js
const express = require("express");
const router = express.Router();

// Import controllers
const apodController = require("../controllers/apodController");
const marsRoverController = require("../controllers/marsRoverController");

// APOD (Astronomy Picture of the Day) routes
router.get("/apod", apodController.getApod);
router.get("/apod/random", apodController.getRandomApod);
router.get("/apod/date/:date", apodController.getApodByDate);
router.get("/apod/range", apodController.getApodDateRange);

// Mars Rover photos routes
router.get("/mars-rover", marsRoverController.getLatestPhotos);
router.get("/mars-rover/:rover", marsRoverController.getRoverPhotos);
router.get("/mars-rover/:rover/cameras", marsRoverController.getRoverCameras);
router.get(
  "/mars-rover/:rover/manifests",
  marsRoverController.getRoverManifest
);

module.exports = router;

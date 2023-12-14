const express = require('express');
const router = express.Router();

// middleware
const middleware = require("../../middlewares/auth");

// controllers
const userController = require("../../controllers/userController");

router.get("/", middleware, userController.getWeekScore);

module.exports = router;

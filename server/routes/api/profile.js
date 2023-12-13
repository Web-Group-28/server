const express = require('express');
const router = express.Router();

// controllers
const userController = require("../../controllers/userController");

router.post("/profile", userController.getProfile);

module.exports = router;
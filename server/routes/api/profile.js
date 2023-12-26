const express = require('express');
const router = express.Router();

// middleware
const middleware = require("../../middlewares/auth");

// controllers
const userController = require("../../controllers/userController");

router.put("/:userId", userController.updateWeekScore);
router.get("/", userController.getWeekScore);
router.get("/userData", userController.userData);
router.post("/addScore", userController.addScore);

module.exports = router;

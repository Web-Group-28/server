const express = require('express');
const router = express.Router();

// middleware
const requireSignin = require("../../middlewares/auth");

// controllers
const authController = require("../../controllers/authController");

router.post("/register", authController.register);
router.post("/login", authController.login);
router.get("/logout", authController.logout);
router.get("/current-user", requireSignin, authController.currentUser);

module.exports = router;
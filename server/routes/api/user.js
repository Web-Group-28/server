const express = require('express');
const authController = require('../../controllers/authController');
const authMiddleware = require('../../middlewares/auth');
const router = express.Router();

router.post('/register', authController.register);//OK
router.post('/login', authController.login);//OK
router.post('/logout', authController.logout);//OK
router.get('/token', authMiddleware, authController.currentUser);//OK

module.exports = router;
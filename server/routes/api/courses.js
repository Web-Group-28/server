const express = require('express');
const courseController = require('../../controllers/courseController');
const router = express.Router();

router.get('/', courseController.courses);//OK

module.exports = router;
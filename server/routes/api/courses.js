const express = require('express');
const courseController = require('../../controllers/courseController');
const lessonsController = require('../../controllers/lessonsController');
const router = express.Router();

router.get('/', courseController.courses);//OK
router.get('/:courseId/lessons', lessonsController.lessons);//OK

module.exports = router;
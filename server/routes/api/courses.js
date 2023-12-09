const express = require('express');
const courseController = require('../../controllers/courseController');
const lessonsController = require('../../controllers/lessonsController');
const lessonController = require('../../controllers/lessonController');
const router = express.Router();

router.get('/', courseController.courses);//OK
router.get('/:courseId/lessons', lessonsController.lessons);//OK
router.get('/:courseId/lessons/:lessonId', lessonController.lesson);//OK

module.exports = router;
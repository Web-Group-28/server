const express = require('express');
const router = express.Router();
const adminController = require("../../controllers/adminController")

router.post("/courses", adminController.createCourse);
router.post("/parts", adminController.createPart);
router.post("/lessons", adminController.createLesson);
router.get("/courses", adminController.getAllCourses);
router.get("/parts", adminController.getAllParts);
router.get("/lessons", adminController.getAllLessons);

module.exports = router;
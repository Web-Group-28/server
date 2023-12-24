const Course = require("../models/course");
const Part = require("../models/part");
const Lesson = require("../models/lesson");
const BaseResponse = require("../utils/baseResponse");

class AdminController {
    async createCourse(req, res) {
        try {
            const { courseID, title, parts } = req.body;
            if (!courseID || !title || !parts) {
                return res.status(400).send(BaseResponse.ofError("Missed some required fields", 400));
            }
            const course = new Course({
                courseID, title, parts
            });

            await course.save();
            return res.status(200).send(BaseResponse.ofSucceed(course));
        }
        catch (err) {
            return res.status(400).send(BaseResponse.ofError(err, 400))
        }
    }

    async createPart(req, res) {
        try {
            const { title, description, lessons } = req.body;
            if (!title || !description || !lessons) {
                return res.status(400).send(BaseResponse.ofError("Missed some required fields", 400));
            }
            const part = new Part({
                title, description, lessons
            });

            await part.save();
            return res.status(200).send(BaseResponse.ofSucceed(part));
        }
        catch (err) {
            return res.status(400).send(BaseResponse.ofError(err, 400))
        }
    }

    async createLesson(req, res) {
        try {
            const { title, choice, match, sentence, fill, userScore } = req.body;
            if (!title) {
                return res.status(400).send(BaseResponse.ofError("Missed some required fields", 400));
            }
            const lesson = new Lesson({ title, choice, match, sentence, fill, userScore });

            await lesson.save();
            return res.status(200).send(BaseResponse.ofSucceed(lesson));
        }
        catch (err) {
            console.log("Error: " + err)
            return res.status(400).send(BaseResponse.ofError(err, 400))
        }
    }

    async getAllCourses(req, res){
        try{
            const size = req.query.size || 10;
            const page = req.query.page || 0;
            const courses = await Course.find({})
                .skip(page * size).limit(size).exec();
            const count = await Course.count();
            return res.status(200).send(BaseResponse.ofSucceed(courses, page, size, count));
        }
        catch(err){
            return res.status(400).send(BaseResponse.ofError(err, 400))
        }
    }

    async getAllParts(req, res){
        try{
            const size = req.query.size || 10;
            const page = req.query.page || 0;
            const parts = await Part.find({})
                .skip(page * size).limit(size).exec();
            const count = await Part.count();
            return res.status(200).send(BaseResponse.ofSucceed(parts, page, size, count));
        }
        catch(err){
            return res.status(400).send(BaseResponse.ofError(err, 400))
        }
    }

    async getAllLessons(req, res){
        try{
            const size = req.query.size || 10;
            const page = req.query.page || 0;
            const lessons = await Lesson.find({})
                .skip(page * size).limit(size).exec();
            const count = await Lesson.count();
            return res.status(200).send(BaseResponse.ofSucceed(lessons, page, size, count));
        }
        catch(err){
            return res.status(400).send(BaseResponse.ofError(err, 400))
        }
    }
}
module.exports = new AdminController();
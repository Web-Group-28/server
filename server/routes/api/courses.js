const Course = require("../../models/course");
const BaseResponse = require("../../utils/baseResponse");

/**
 * Courses
 * @param {Request} req 
 * @param {Request} res 
 */
const courses = async (_req, res) => {
   const courses = await Course.find({}).exec();
   res.send(BaseResponse.ofSucceed(courses));
}
module.exports = courses;
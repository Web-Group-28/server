const Course = require("../models/course");
const BaseResponse = require("../utils/baseResponse");

class CourseController {
   async courses(_req, res) {
      const courses = await Course.find({}).exec();
      res.send(BaseResponse.ofSucceed(courses));
   }
}
module.exports = new CourseController();
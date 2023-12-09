const Course = require("../models/course");
const Part = require("../models/part");
const BaseResponse = require("../utils/baseResponse");

module.exports = async (courseId) => {
   const course = await Course.findOne({
      courseID: courseId
   }).exec();
   var lessonsID = [];
   if (course == null) {
      return BaseResponse.ofError('Course not found', 404);
   } else {
      const partsID = course.parts;
      for (let i = 0; i < partsID.length; i++) {
         let part = await Part.findById(partsID[i]).exec();
         const partLessons = part.lessons;
         lessonsID = lessonsID.concat(partLessons);
      }
      return BaseResponse.ofSucceed(lessonsID);
   }
}
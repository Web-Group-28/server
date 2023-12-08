const Course = require('../../models/course');
const Part = require('../../models/part');
const BaseResponse = require('../../utils/baseResponse');

const search = async courseId => {
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
/**
 * Lessons
 * @param {Request} req 
 * @param {Request} res 
 */
const lessons = async function (req, res) {
   res.send(await search(req.params.courseId));
}
module.exports = { lessons, search };
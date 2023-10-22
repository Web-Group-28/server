const Course = require('../../models/course');
const Part = require('../../models/part');
/**
 * Lessons
 * @param {Request} req 
 * @param {Request} res 
 */
const lessons = async function (req, res) {
   const course = await Course.findOne({
      courseID: req.params.courseId
   }).exec();
   var lessonsID = [];
   if (course == null) {
      res.send({
         "meta": {
            'error': 404,
            'message': 'Course not found'
         }
      });
   } else {
      const partsID = course.parts;
      for (let i = 0; i < partsID.length; i++) {
         let part = await Part.findById(partsID[i]).exec();
         const partLessons = part.getLessonIDs();
         lessonsID = lessonsID.concat(partLessons);
      }
      res.send({
         "lessonsID": lessonsID
      });
   }
}
module.exports = lessons;
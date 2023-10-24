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
         "data": null,
         "meta": {
            'code': 404,
            'message': 'Course not found'
         }
      });
   } else {
      const partsID = course.parts;
      for (let i = 0; i < partsID.length; i++) {
         let part = await Part.findById(partsID[i]).exec();
         const partLessons = part.lessons;
         lessonsID = lessonsID.concat(partLessons);
      }
      res.send({
         "data": {
            "lessons": lessonsID
         },
         "meta": {
            'code': 200,
            'message': 'OK'
         }
      });
   }
}
module.exports = lessons;
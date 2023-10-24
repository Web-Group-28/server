const Course = require('../../models/course');
const Part = require('../../models/part');
/**
 * Lesson
 * @param {Request} req 
 * @param {Request} res 
 */
const lesson = async (req, res) => {
   const courseId = req.params.courseId;
   const lessonId = req.params.lessonId;
   const course = await Course.findOne({
      courseID: courseId
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
         console.log(part);
         const partLessons = part.lessons;
         lessonsID = lessonsID.concat(partLessons);
      };
      console.log(lessonId);
      console.log(lessonsID);
      if (lessonsID.includes(lessonId) == true) {
         res.send({
            "data": {
               "lesson": lessonId
            },
            "meta": {
               'code': 200,
               'message': 'OK'
            }
         });
      } else {
         res.send({
            "data": null,
            "meta": {
               'code': 404,
               'message': 'Course not found'
            }
         });
      }
   }
}
module.exports = lesson;
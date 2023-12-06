const Lesson = require('../../models/lesson');
const BaseResponse = require('../../utils/baseResponse');
const lessons = require('./lessons');
/**
 * Lesson
 * @param {Request} req 
 * @param {Request} res 
 */
const lessonAPI = async (req, res) => {
   const courseId = String(req.params.courseId);
   const lessonsData = await lessons.search(courseId);
   // console.log(lessonsData.meta.code);
   // console.log(lessonsData);
   if (parseInt(lessonsData.meta.code) != 200) {
      res.send(BaseResponse.ofError('Course not found', 404))
   } else {
      const lessonId = String(req.params.lessonId);
      var found = false;
      for (let i = 0; i < lessonsData.data.length; i++) {
         if (lessonsData.data[i].toString() === lessonId) {
            found = true;
            break;
         }
      }
      if (found) {
         const lesson = await Lesson.findById(lessonId).exec();
         res.send(BaseResponse.ofSucceed(lesson));
      } else {
         // console.log(lessonsID);
         // console.log(lessonId);
         res.send(BaseResponse.ofError('Lesson not found', 404));
      }
   }
}
module.exports = lessonAPI;
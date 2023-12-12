const Lesson = require('../models/lesson');
const BaseResponse = require('../utils/baseResponse');
const search = require('./lessons');
module.exports = async (courseId, lessonId) => {
   const lessonsData = await search(courseId);
   if (lessonsData.meta.code != 200) {
      return BaseResponse.ofError('Course not found', 404)
   } else {
      var found = false;
      for (let i = 0; i < lessonsData.data.length; i++) {
         if (lessonsData.data[i].toString() === lessonId) {
            found = true;
            break;
         }
      }
      if (found) {
         const lesson = await Lesson.findById(lessonId).exec();
         return BaseResponse.ofSucceed(lesson);
      } else {
         return BaseResponse.ofError('Lesson not found', 404);
      }
   }
}